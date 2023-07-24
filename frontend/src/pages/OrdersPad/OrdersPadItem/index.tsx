import { useCallback, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { MdContentPasteSearch } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { toast } from "react-toastify";

import { ResponseApi, api } from "service/api";
import { EnumWebServices } from "constants/webServices";

import { ModalDetailProducts } from "components/Modal/ModalDetailProducts";
import { ProductsProps } from "pages/Products";
import { HiMiniPlusCircle } from "react-icons/hi2";

type OrdersProps = {
  active?: boolean;
  id: string;
  order?: string;
  order_id: string;
};

type UpdateDataProps = {
  id: string;
  order_pad_id: string;
};

type OrdersPadItem = {
  itemOrder: OrdersProps;
  getDataOrdersPad: () => Promise<void>;
  selectProducts: ProductsProps[];
  handleCreateProduct: (data: UpdateDataProps) => void;
};

export const OrdersPadItem = ({
  itemOrder,
  getDataOrdersPad,
  selectProducts,
  handleCreateProduct,
}: OrdersPadItem) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleRemoveOrder = useCallback(
    async (id: string) => {
      const response = await api.delete<void, ResponseApi>(
        `${EnumWebServices.ORDERS_PAD_REMOVE}?order_id=${id}`
      );

      if (response.sucess) {
        await getDataOrdersPad();
        toast.success("Product delected");
      }
    },
    [getDataOrdersPad]
  );

  const handleDetailOrderPad = () => {
    setIsOpenModal(true);
    setIsOptionsVisible(false);
  };

  return (
    <div
      key={itemOrder.id}
      onMouseOverCapture={() => setIsOptionsVisible(isOpenModal ? false : true)}
      onMouseLeave={() => setIsOptionsVisible(false)}
      className="bg-gray-50 relative shadow-[0px_0px_6px_#00000034] hover:shadow-[#6D5779] 
            min-w-full lg:min-w-[70px] h-[110px] rounded-lg p-4 flex items-center justify-between"
    >
      {isOptionsVisible && (
        <>
          <div className="absolute top-0 left-0  bg-slate-100 w-full h-full rounded-md" />
          <div className="text-black absolute top-0 left-0 w-full h-full items-center flex justify-center">
            <div className="flex hover:underline text-gray-600 cursor-pointer items-center">
              <div className="mr-[6px]">
                <FiTrash2
                  size={25}
                  onClick={() => handleRemoveOrder(itemOrder.id)}
                  className=" mr-1 cursor-pointer hover:text-red-500"
                />
              </div>
            </div>
            <div className="flex hover:underline text-gray-600 cursor-pointer items-center">
              <div className="mr-[6px]">
                <HiMiniPlusCircle
                  size={25}
                  onClick={() =>
                    handleCreateProduct({
                      id: itemOrder.order_id,
                      order_pad_id: itemOrder.id,
                    })
                  }
                  className=" mr-1 cursor-pointer hover:text-green-500"
                />
              </div>
            </div>

            <div className="flex hover:underline text-gray-600 cursor-pointer items-center">
              <div className="mr-[6px]" onClick={() => handleDetailOrderPad()}>
                <MdContentPasteSearch
                  className=" cursor-pointer hover:opacity-[0.7]"
                  size={25}
                />
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex w-full justify-center">
        <div className="font-sora  text-yellow-500">
          <div className="w-[80px] mt-2 flex justify-center object-cover rounded-md">
            <IoFastFoodOutline size={55} />
          </div>
          <div>
            <p className="font-bold text-gray-500 text-center text-2xl">
              {itemOrder.order}
            </p>
          </div>
        </div>
      </div>
      <ModalDetailProducts
        selectProducts={selectProducts}
        order_pad_id={itemOrder.id}
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </div>
  );
};
