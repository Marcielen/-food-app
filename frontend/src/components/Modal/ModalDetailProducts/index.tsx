import React, { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import { HiMiniCheckCircle, HiMiniXCircle } from "react-icons/hi2";
import { toast } from "react-toastify";
import * as Dialog from "@radix-ui/react-dialog";

import { ResponseApi, api } from "service/api";
import { EnumWebServices } from "constants/webServices";

import { ProductsProps } from "pages/Products";
import { Input } from "components/Input";
import { Button } from "components/Button";

type ModalDetailProductsProps = {
  open: boolean;
  onClose: () => void;
  order_pad_id: string;
  selectProducts: ProductsProps[];
};

type UpdateProductProps = { id: string; index: number };

type DetailProductProps = {
  amount: number;
  product_id: string;
  id: string;
  nameProduct: string;
  isUpdate?: boolean;
};

export const ModalDetailProducts = ({
  open,
  onClose,
  order_pad_id,
  selectProducts,
}: ModalDetailProductsProps) => {
  const [listDetailProduct, setListDetailProduct] = useState<
    DetailProductProps[]
  >([]);

  const { setValue, watch } = useFormContext();

  const amountWatch = watch("amount");

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

  const handleUpdateProduct = useCallback(
    async ({ id, index }: UpdateProductProps) => {
      const amount = amountWatch[index];

      const response = await api.put<void, ResponseApi>(
        EnumWebServices.ORDERS_PAD_UPDATE_PRODUCT,
        { product_id: id, amount: Number(amount) }
      );

      if (response.sucess) {
        toast.success("Product ");
        handleUpdateValueAmount(index);
      }
    },
    [amountWatch]
  );

  const handleUpdateValueAmount = (index: number) => {
    setListDetailProduct((prev) =>
      prev.map((itemProduct, indexProduct) => ({
        ...itemProduct,
        isUpdate:
          indexProduct === index ? !itemProduct.isUpdate : itemProduct.isUpdate,
      }))
    );
  };

  useEffect(() => {
    if (open && order_pad_id) {
      getDataProducts();
    }
  }, [getDataProducts, open, order_pad_id]);

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-[rgba(0,_0,_0,_0.5)] data-[state=open] fixed inset-0" />
        <Dialog.Content className="data-[state=open] fixed top-[50%] left-[50%] h-screen w-full lg:h-[450px] max-w-[670px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium mb-6">
            <span className="flex w-full text-2xl text-secondary font-bold border-b-2 pb-[10px] justify-start">
              Modal detail product
            </span>
          </Dialog.Title>

          <div className=" h-full max-h-[300px] overflow-auto">
            {listDetailProduct.map(({ isUpdate, id }, index) => (
              <div className="w-full flex mb-2 ">
                <div className="w-[66%] mr-6">
                  <Input name={`product.${index}`} isDisabled label="Product" />
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
                            onClick={() => handleUpdateProduct({ id, index })}
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
              </div>
            ))}
          </div>

          <div className=" flex justify-end">
            <Dialog.Close asChild>
              <div className="w-[120px] mr-4">
                <Button
                  typeConfirm
                  label="Confirm"
                  className=" rounded-[12px] font-bold h-[32px] ml-4 text-white pb-8 bg-green-500"
                />
              </div>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
