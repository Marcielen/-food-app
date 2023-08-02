import React, { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import { HiMiniCheckCircle, HiMiniXCircle } from "react-icons/hi2";
import { toast } from "react-toastify";
import * as Dialog from "@radix-ui/react-dialog";

import { ResponseApi, api } from "service/api";
import { EnumWebServices } from "constants/webServices";
import {
  DecimalMask,
  MoneyMask,
  validateNumberMask,
} from "helpers/decimalMask";
import {
  ConstantRoutes,
  SubstituteRouteParameter,
} from "constants/constantsRoutes";

import { ProductsProps } from "pages/Products";
import { Input } from "components/Input";
import { Button } from "components/Button";
import { useNavigate } from "react-router-dom";
import { useLayoutContext } from "contexts/LayoutContext";
import { Loading } from "components/Loading";

type ModalDetailProductsProps = {
  open: boolean;
  onClose: () => void;
  order_pad_id: string;
  selectProducts: ProductsProps[];
  labelOrderPad: string;
};

type UpdateProductProps = { id: string; index: number };

export type DetailProductProps = {
  amount: number;
  product_id: string;
  id: string;
  nameProduct: string;
  isUpdate?: boolean;
  totalPrice: number;
};

export const ModalDetailProducts = ({
  open,
  onClose,
  order_pad_id,
  selectProducts,
  labelOrderPad,
}: ModalDetailProductsProps) => {
  const [listDetailProduct, setListDetailProduct] = useState<
    DetailProductProps[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const { setValue, watch } = useFormContext();

  const navigate = useNavigate();

  const { getDataBuy } = useLayoutContext();

  const amountWatch = watch("amount");

  const price = listDetailProduct.reduce((acc, curr) => {
    return acc + validateNumberMask(curr.totalPrice) * curr.amount;
  }, 0);

  const getDataProducts = useCallback(async () => {
    const response = await api.get<void, ResponseApi<DetailProductProps[]>>(
      EnumWebServices.ORDERS_PAD_PRODUCT,
      { params: { order_pad_id } }
    );

    setListDetailProduct(
      response.data.map((product, index) => {
        const nameProduct =
          selectProducts.find((item) => item.id === product.product_id)?.name ||
          "";

        setValue(`product.${index}`, nameProduct);
        setValue(`amount.${index}`, product.amount);

        return {
          ...product,
          nameProduct,
          isUpdate: false,
        };
      })
    );
  }, [order_pad_id, selectProducts, setValue]);

  const handleUpdateValueAmount = useCallback(
    (index: number) => {
      setListDetailProduct((prev) =>
        prev.map((itemProduct, indexProduct) => {
          if (itemProduct.isUpdate) {
            setValue(`amount.${indexProduct}`, itemProduct.amount);
          }
          return {
            ...itemProduct,
            isUpdate:
              indexProduct === index
                ? !itemProduct.isUpdate
                : itemProduct.isUpdate,
          };
        })
      );
    },
    [setValue]
  );

  const handleUpdateProduct = useCallback(
    async ({ id, index }: UpdateProductProps) => {
      const amount = amountWatch[index];

      setListDetailProduct((prev) =>
        prev.map((product, indexProduct) => ({
          ...product,
          amount: index === indexProduct ? amount : product.amount,
        }))
      );

      const response = await api.put<void, ResponseApi>(
        EnumWebServices.ORDERS_PAD_UPDATE_PRODUCT,
        { product_id: id, amount: Number(amount) }
      );

      if (response.sucess) {
        toast.success("Product has been updated successfully");
        handleUpdateValueAmount(index);
      }
    },
    [amountWatch, handleUpdateValueAmount]
  );

  const handlePayOrderPad = useCallback(async () => {
    setIsLoading(true);
    const response = await api.post<void, ResponseApi<{ id: string }>>(
      EnumWebServices.BUY_CREATE,
      { order_pad_id, price: String(price), name: labelOrderPad }
    );

    if (response.sucess) {
      const responseOrderPad = await api.put<void, ResponseApi>(
        EnumWebServices.ORDERS_PAD_UPDATE,
        { id: order_pad_id, active: false }
      );

      if (responseOrderPad.sucess) {
        onClose();
        getDataBuy();
        setIsLoading(false);
        navigate(
          SubstituteRouteParameter(ConstantRoutes.PAY, "id", order_pad_id),
          {
            state: {
              id: response?.data.id,
            },
          }
        );
      }
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [getDataBuy, labelOrderPad, navigate, onClose, order_pad_id, price]);

  useEffect(() => {
    if (open && order_pad_id) {
      getDataProducts();
    }
  }, [getDataProducts, open, order_pad_id]);

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      {isLoading && <Loading />}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-[rgba(0,_0,_0,_0.5)] data-[state=open] fixed inset-0" />
        <Dialog.Content className="data-[state=open] z-20 fixed top-[50%] left-[50%] h-screen w-full lg:h-[450px] lg:max-w-[670px] max-w-[full] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium mb-6">
            <span className="flex w-full text-2xl text-secondary font-bold border-b-2 pb-[10px] justify-start">
              Detail order pad: {labelOrderPad}
            </span>
          </Dialog.Title>

          <div className=" h-full max-h-[60%]   overflow-auto">
            {listDetailProduct.map(
              ({ isUpdate, id, totalPrice, amount }, index) => {
                const valueAmount =
                  amountWatch && amountWatch[index] ? amountWatch[index] : 0;
                return (
                  <div className="w-full flex mb-2 ">
                    <div className="w-[50%] mr-6">
                      <Input
                        name={`product.${index}`}
                        isDisabled
                        label="Product"
                      />
                    </div>
                    <div className="w-[35%] flex">
                      <div className="w-[70%]">
                        <Input
                          name={`amount.${index}`}
                          isDisabled={!isUpdate}
                          label="Amount"
                          type="number"
                        />
                      </div>
                      <div className="flex h-[50px] w-[20%] hover:underline text-gray-600 cursor-pointer items-end">
                        <div className="ml-[8px]">
                          {isUpdate ? (
                            <div className="flex">
                              <HiMiniCheckCircle
                                onClick={() =>
                                  handleUpdateProduct({ id, index })
                                }
                                size={26}
                                className="mt-4 cursor-pointer text-green-500"
                              />
                              <HiMiniXCircle
                                onClick={() => handleUpdateValueAmount(index)}
                                size={26}
                                className="mt-4 cursor-pointer text-red-500"
                              />
                            </div>
                          ) : (
                            <FiEdit
                              onClick={() => handleUpdateValueAmount(index)}
                              size={20}
                              className=" cursor-pointer hover:text-green-500"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-[16%] pl-1 h-[50px]">
                      <p className="mt-7 font-bold text-md">
                        {DecimalMask(
                          validateNumberMask(totalPrice) *
                            (valueAmount || amount)
                        )}
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          <div className="flex justify-end mb-4 text-base items-baseline align-baseline pr-1">
            Total payable:{" "}
            <span className="flex ml-1 font-bold text-secondary justify-end  text-lg">
              {DecimalMask(price)}
            </span>
          </div>

          <div className=" flex justify-end">
            <div className="flex">
              <div className="w-[120px]">
                <Button
                  label="Cancel"
                  aria-label="Close"
                  onClick={onClose}
                  className="text-gray-600 border-gray-400 border-2 h-[32px] pb-8  rounded-[12px] font-bold bg-white"
                />
              </div>
              <div className="w-[120px] mr-4">
                <Button
                  typeConfirm
                  disabled={isLoading}
                  onClick={handlePayOrderPad}
                  label="Pay"
                  className=" rounded-[12px] font-bold h-[32px] ml-4 text-white pb-8 bg-green-500"
                />
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
