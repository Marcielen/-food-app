import React, { useCallback, useState } from "react";
import { HiOutlineBanknotes, HiOutlineCreditCard } from "react-icons/hi2";
import { toast } from "react-toastify";
import * as Dialog from "@radix-ui/react-dialog";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ResponseApi, api } from "service/api";
import { EnumWebServices } from "constants/webServices";
import { useLayoutContext } from "contexts/LayoutContext";
import { ConstantRoutes } from "constants/constantsRoutes";

import { Button } from "components/Button";
import { Loading } from "components/Loading";

type ModalFormOfPaymentProps = {
  open: boolean;
  onClose: () => void;
  price: string;
  listProductId: {
    product_id: string;
    product_name: string;
    amount: number;
  }[];
};

export type DetailProductProps = {
  amount: number;
  product_id: string;
  id: string;
  nameProduct: string;
  isUpdate?: boolean;
  totalPrice: number;
};

const formOfPayment = [
  {
    name: "Credit card",
    icon: <HiOutlineCreditCard size={80} className="text-secondary" />,
    value: 1,
    isChecked: false,
  },
  {
    name: "Debit card",
    icon: <HiOutlineCreditCard size={80} className="text-secondary" />,
    value: 2,
    isChecked: false,
  },
  {
    name: "Money",
    icon: <HiOutlineBanknotes size={80} className="text-secondary" />,
    value: 3,
    isChecked: false,
  },
];

export const ModalFormOfPayment = ({
  open,
  onClose,
  price,
  listProductId,
}: ModalFormOfPaymentProps) => {
  const [listPayment, setListPayment] = useState(formOfPayment);
  const [isLoading, setIsLoading] = useState(false);

  const { getDataBuy } = useLayoutContext();

  const { state } = useLocation();
  const { id } = useParams<{ id: string }>();
  const navidate = useNavigate();

  const handleSelectedPayment = (value: number) => {
    setListPayment((prev) =>
      prev.map((payment) => ({
        ...payment,
        isChecked: payment.value === value,
      }))
    );
  };

  const isPaymentChecked = listPayment.some((payment) => payment.isChecked);

  const handlePay = useCallback(async () => {
    setIsLoading(true);
    const response = await api.post<void, ResponseApi>(
      EnumWebServices.PAY_CREATE,
      { order_pad_id: id, price }
    );

    if (response.sucess) {
      await api.delete<void, ResponseApi>(
        `${EnumWebServices.BUY_REMOVE}?id=${state.id}`
      );
      await api.delete<void, ResponseApi>(
        `${EnumWebServices.ORDERS_PAD_REMOVE}?order_id=${id}`
      );

      await api.post<void, ResponseApi>(EnumWebServices.PRODUCT_SOLD_CREATE, {
        listProductId,
      });

      toast.success("Payment made successfully");
      getDataBuy();
      setIsLoading(false);
      navidate(ConstantRoutes.DASHBOARD);
    }
    setIsLoading(false);
  }, [navidate, id, price, getDataBuy, listProductId, state]);

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      {isLoading && <Loading />}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-[rgba(0,_0,_0,_0.5)] data-[state=open] fixed inset-0" />
        <Dialog.Content className="data-[state=open] z-20 fixed top-[50%] left-[50%] h-screen w-full lg:h-[350px] lg:max-w-[670px] max-w-[full] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium mb-6">
            <span className="flex w-full text-2xl text-secondary font-bold border-b-2 pb-[10px] justify-start">
              Form of payment
            </span>
          </Dialog.Title>

          <div className="flex justify-center">
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
              {listPayment.map((payment) => (
                <div
                  onClick={() => handleSelectedPayment(payment.value)}
                  className=" h-full max-h-[full]"
                >
                  <div
                    className={`h-[150px] mr-3 ${
                      payment.isChecked ? "border-[#6D5779]" : "border-gray-300"
                    } hover:border-[#6D5779] cursor-pointer border-2  rounded-md flex justify-center items-center w-[150px]`}
                  >
                    <div>
                      {payment.icon}
                      <p className="font-bold text-gray-500 text-center">
                        {payment.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex mt-12 justify-end">
            <div className="flex">
              <div className="w-[120px] mr-3">
                <Button
                  label="Cancel"
                  aria-label="Close"
                  onClick={onClose}
                  className="text-gray-600 border-gray-400 border-2 h-[32px] pb-8  rounded-[12px] font-bold bg-white"
                />
              </div>
              <div className="w-[120px]">
                <Button
                  typeConfirm
                  disabled={!isPaymentChecked || isLoading}
                  onClick={handlePay}
                  className="text-white font-normal"
                  label="Pay"
                />
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
