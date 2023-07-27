import { useCallback, useEffect, useRef, useState } from "react";
import { FieldName, FormProvider, useForm } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";

import { EnumWebServices } from "constants/webServices";
import { ResponseApi, api } from "service/api";

import { Button } from "components/Button";
import { Drawer } from "components/Drawer";
import { Input } from "components/Input";
import { SelectDefault } from "components/Select";
import { ProductsProps } from "pages/Products";

import {
  formDefaultValues,
  FormData,
  OrdersProps,
  OrdersPadProps,
  ListProductsProps,
  formDefaultProduct,
  UpdateDataProps,
} from "./validationForms";
import { OrdersPadItem } from "./OrdersPadItem";
import {
  Pagination,
  PaginationData,
  RefPaginationProps,
} from "components/Pagination";

interface OrdersPadResponse extends PaginationData {
  search?: string;
}

export const OrdersPad = () => {
  const [listOrders, setListOrders] = useState<OrdersProps[]>([]);
  const [listOrdersPad, setListOrdersPad] = useState<OrdersPadProps[]>([]);
  const [selectProducts, setSelectProducts] = useState<ProductsProps[]>([]);
  const [listProducts, setListProducts] =
    useState<ListProductsProps[]>(formDefaultProduct);
  const [orderPadId, setOrderPadId] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const refPagination = useRef<RefPaginationProps>({} as RefPaginationProps);

  const formMethods = useForm<FormData>({
    defaultValues: formDefaultValues,
  });

  const {
    handleSubmit: onSubmit,
    reset,
    watch,
    setValue,
    getValues,
  } = formMethods;

  const orderIdWatch = watch("order_id");

  const handleOpenDrawe = () => {
    setListProducts(formDefaultProduct);
    setIsUpdateData(false);
    setOpenDrawer(true);
    reset(formDefaultProduct);
  };

  const handleRemoveProduct = async (index: number) => {
    const newListProduct = [...listProducts];

    newListProduct.splice(index, 1);

    const product = newListProduct.map((itemProduct) => {
      const amount = watch(`amount-${itemProduct.product_id}`);
      const product_id = watch(`product_id-${itemProduct.product_id}`);

      return {
        product_id: itemProduct.product_id,
        amount: Number(amount),
        id: product_id,
      } as ListProductsProps;
    });

    setListProducts(product);
  };

  const handleGetOrdersPad = () => {
    refPagination.current.reload();
  };

  const handleCreateNewProduct = useCallback(() => {
    const id = Math.floor(Date.now() * Math.random()).toString(36);

    const newProduct = {
      product_id: id,
      amount: 0,
    };

    setListProducts((prev) => [...prev, newProduct]);
  }, []);

  const getDataOrder = useCallback(async () => {
    const response = await api.get<OrdersProps[]>(
      EnumWebServices.ORDERS_REGISTER
    );

    setListOrders(response.data);
  }, []);

  const getDataProducts = useCallback(async () => {
    const response = await api.get<ProductsProps[]>(EnumWebServices.PRODUCT);

    setSelectProducts(response.data);
  }, []);

  const getDataOrdersPad = useCallback(async (data?: OrdersPadResponse) => {
    const response = await api.get<{
      registry: OrdersPadProps[];
      totalCount: number;
    }>(EnumWebServices.ORDERS_PAD, {
      params: { ...data },
    });

    setListOrdersPad(response.data.registry);
    setTotalCount(response.data.totalCount);
  }, []);

  const handleCreateProduct = useCallback(
    (data: UpdateDataProps) => {
      setIsUpdateData(true);
      setOpenDrawer(true);
      setValue("order_id", { label: data.label, value: data.id });
      setOrderPadId(data.order_pad_id);
    },
    [setValue]
  );

  const updateOrdersPad = useCallback(() => {
    refPagination.current.reload();
    setOpenDrawer(false);
    reset(formDefaultValues);
  }, [reset]);

  const updateProduct = useCallback(
    async (order_pad_id: string) => {
      let newProduct: ListProductsProps[] = [];

      await setListProducts((prev) => {
        const product = prev.map((itemProduct) => {
          const product_id = watch(`product_id-${itemProduct.product_id}`);
          const amount = watch(`amount-${itemProduct.product_id}`);

          return {
            product_id,
            amount: Number(amount),
            order_pad_id,
          } as ListProductsProps;
        });

        newProduct = product;

        return product;
      });

      const response = await api.post<void, ResponseApi>(
        EnumWebServices.ORDERS_PAD_CREATE_PRODUCT,
        newProduct
      );

      if (response.sucess) {
        updateOrdersPad();
        return true;
      }
      return false;
    },
    [updateOrdersPad, watch]
  );

  const handleCreateOrderPad = useCallback(
    async (data: FormData) => {
      const valueData = data.order_id as {
        value: string;
        label: string;
      };

      const responseDataOrderPad = await api.post<void, ResponseApi<string>>(
        EnumWebServices.ORDERS_PAD_CREATE,
        { order_id: valueData.value, label: valueData.label }
      );

      if (responseDataOrderPad.sucess) {
        await updateProduct(responseDataOrderPad.data);
      }
      return false;
    },
    [updateProduct]
  );

  const loadColumnsData = useCallback(
    (itensPaginate: PaginationData) => {
      getDataOrdersPad({ ...itensPaginate, search: getValues()?.search || "" });
    },
    [getDataOrdersPad, getValues]
  );

  const handleConfirm = onSubmit(async (data) => {
    let sucess;

    if (isUpdateData) {
      const createProduct = await updateProduct(orderPadId);
      sucess = createProduct;
    } else {
      const isCreateOrderPadSucess = await handleCreateOrderPad(data);
      sucess = isCreateOrderPadSucess;
    }

    if (sucess) {
      getDataOrder();
      setOpenDrawer(false);
      setListProducts(formDefaultProduct);
      reset(formDefaultValues);
    }
  });

  useEffect(() => {
    getDataOrder();
  }, [getDataOrder]);

  useEffect(() => {
    getDataProducts();
  }, [getDataProducts]);

  return (
    <FormProvider {...formMethods}>
      <div className="flex flex-col lg:flex-row justify-between">
        <div>
          <Input
            name="search"
            leftElement
            className="w-full mb-2 lg:mb-0 lg:w-[300px]"
          />
        </div>
        <>
          <Drawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            disabled={orderIdWatch === undefined && !isUpdateData}
            handleSubmit={() => {
              handleConfirm();
            }}
            label="Create order pad"
          >
            <div className="mt-5 ">
              <SelectDefault
                name="order_id"
                label="Orders"
                valueIsObject={true}
                isDisabled={isUpdateData}
                options={listOrders.map((ordersItem) => ({
                  label: ordersItem.order,
                  value: ordersItem.id,
                }))}
              />
            </div>
            <div className="mt-10 flex items-center">
              <p className="whitespace-nowrap font-bold text-gray-500 mr-3">
                Add products
              </p>
              <div className="h-[2px] mt-1 w-full border-b-2 " />
            </div>
            <div className="w-full mt-2 lg:w-[105px]">
              <Button
                typeConfirm
                label="Create"
                onClick={() => handleCreateNewProduct()}
                className="text-white h-9 pt-[6px] font-bold"
              />
            </div>
            <div className="scroll-style mt-3 pl-[2px] w-full overflow-y-auto h-full max-h-[400px]">
              {listProducts.map((productItem, index) => (
                <div className="flex items-center ml-2 justify-center mb-5 w-full">
                  <div className="w-full mr-5">
                    <SelectDefault
                      name={`product_id-${productItem.product_id}`}
                      label="Product"
                      defaultValue={productItem.id}
                      options={selectProducts.map((productItem) => ({
                        label: productItem.name,
                        value: productItem.id,
                      }))}
                    />
                  </div>
                  <div className="w-[40%]">
                    <Input
                      name={`amount-${productItem.product_id}`}
                      label="Amount"
                      type="number"
                      defaultValue={productItem.amount}
                    />
                  </div>
                  <div className="h-[40px] flex items-center ml-2 mt-4 justify-center">
                    <FiTrash2
                      size={20}
                      onClick={() => {
                        handleRemoveProduct(index);
                      }}
                      className=" mr-1 cursor-pointer text-gray-600 hover:text-red-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Drawer>
          <div className="w-full lg:w-[200px]">
            <Button
              label="Create order pad"
              onClick={() => handleOpenDrawe()}
              className="text-white h-9 pt-[6px] font-bold"
            />
          </div>
        </>
      </div>
      <Pagination
        ref={refPagination}
        loadColumnsData={loadColumnsData}
        nPages={totalCount}
        renderTableRows={
          <div
            className="mt-7 grid gap-6 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 
      lg:grid-cols-6"
          >
            {listOrdersPad.map((itemOrder) => {
              const newListOrders = {
                ...listOrders.find((order) => order.id === itemOrder.order_id),
                id: itemOrder.id,
                order_id: itemOrder.order_id,
                label: itemOrder.label,
              };

              return (
                <OrdersPadItem
                  handleCreateProduct={handleCreateProduct}
                  selectProducts={selectProducts}
                  getDataOrdersPad={handleGetOrdersPad}
                  itemOrder={newListOrders || ({} as OrdersProps)}
                />
              );
            })}
          </div>
        }
      />
    </FormProvider>
  );
};
