/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineWarning } from "react-icons/ai";

import { Button } from "components/Button";
import { Loading } from "components/Loading";

export type DetailProductProps = {
  amount: number;
  product_id: string;
  id: string;
  nameProduct: string;
  isUpdate?: boolean;
  totalPrice: number;
};

export function ModalWarning() {
  const [isLoading, setIsLoading] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const onConfirm = useRef<() => Promise<void>>(async () => {});

  async function handleConfirm() {
    setIsLoading(true);
    await onConfirm.current();
    setIsOpenModal(false);
    setIsLoading(false);
  }

  useEffect(() => {
    document.addEventListener(
      "openModal",
      ({ detail: { onConfirm: newOnConfirm } }: any) => {
        setIsOpenModal(true);
        onConfirm.current = newOnConfirm;
      }
    );
  }, []);

  useEffect(() => {
    if (!isOpenModal) {
      onConfirm.current = async () => {};
    }
  }, [isOpenModal]);

  return (
    <Dialog.Root open={isOpenModal} onOpenChange={setIsOpenModal}>
      {isLoading && <Loading />}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-[rgba(0,_0,_0,_0.5)] data-[state=open] fixed inset-0" />
        <Dialog.Content
          className="data-[state=open] z-20 fixed top-[50%] left-[50%] h-screen w-full lg:h-[250px] 
        lg:max-w-[500px] max-w-[full] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gray-50
        shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        >
          <div className="relative h-full w-full">
            <div className="flex justify-center">
              <div className="bg-red-500 absolute top-[-60px] rounded-full text-white w-[110px] h-[110px] flex items-center justify-center">
                <AiOutlineWarning size={75} className="mb-3" />
              </div>
            </div>
            <div className="text-gray-600 h-[40%] relative text-[20px] font-bold  mt-20 flex w-full pl-7">
              Are you sure?
            </div>
            <div className="flex justify-end pr-7">
              <div className="w-[120px] mr-3">
                <Button
                  label="Cancel"
                  aria-label="Close"
                  onClick={() => setIsOpenModal(false)}
                  className="text-gray-600 border-gray-400 border-2 h-[32px] pb-8  rounded-[12px] font-bold bg-white"
                />
              </div>
              <div className="w-[120px] ">
                <Button
                  typeConfirm
                  className="text-white"
                  label="Yes, confirm"
                  onClick={handleConfirm}
                />
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
