import { Button } from "components/Button";
import { Header } from "components/Layout/Header";
import { ModalFormOfPayment } from "components/Modal/ModalFormOfPayment";
import { EnumWebServices } from "constants/webServices";
import { DecimalMask, validateNumberMask } from "helpers/decimalMask";
import { useCallback, useEffect, useState } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { ResponseApi, api } from "service/api";

type ProductProps = {
  amount: number;
  banner: string;
  id: string;
  name: string;
  order_pad_id: string;
  product_id: string;
  totalPrice: number;
};

export const Pay = () => {
  const [listProducts, setListProducts] = useState<ProductProps[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const params = useParams<{ id: string }>();

  const getDataProducts = useCallback(async () => {
    const response = await api.get<void, ResponseApi<ProductProps[]>>(
      EnumWebServices.ORDERS_PAD_PRODUCT,
      { params: { order_pad_id: params.id } }
    );
    setListProducts(
      response.data.map((item) => ({
        ...item,
        banner:
          item.banner && !item.banner?.includes(import.meta.env.VITE_APP_API)
            ? `${import.meta.env.VITE_APP_API}files/${item.banner}`
            : item.banner,
      }))
    );
  }, [params]);

  const price = listProducts.reduce((acc, curr) => {
    return acc + validateNumberMask(curr.totalPrice) * curr.amount;
  }, 0);

  const handleOpenModalFormOfPayment = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    getDataProducts();
  }, [getDataProducts]);

  return (
    <div className="h-screen bg-gray-100">
      <Header isNotLayout={true} isVisiblePay={false} />
      <div className="flex h-[calc(100vh-64px)] w-full justify-center items-center">
        <div className="w-full px-[2%] md:w-[80%]  lg:w-[60%]">
          <p className="mb-3 text-lg ">Products:</p>
          <div className="max-h-[400px] overflow-auto">
            {listProducts.map((product) => (
              <div className="flex mb-3 border-b-2 pb-2 border-gray-300">
                {product.banner ? (
                  <img
                    src={product.banner}
                    className="w-[100px] h-[100px] rounded-md"
                  />
                ) : (
                  <IoFastFoodOutline className="text-secondary p-1 border-gray-300 rounded-md border-2 w-[100px] h-[100px]" />
                )}

                <div className="text-black ml-3 mt-3">
                  <p>{product.name}</p>
                  <p className="text-lg font-bold text-green-500">
                    {DecimalMask(validateNumberMask(product.totalPrice))}
                  </p>
                  <p className="text-gray-500">{product.amount}x</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex text-xl font-bold text-green-500 justify-between">
            <div className="w-[200px] mr-4">
              <Button
                typeConfirm
                onClick={handleOpenModalFormOfPayment}
                className="text-white font-normal"
                label="Form of payment"
              />
            </div>
            <div>{DecimalMask(price)}</div>
          </div>
          <ModalFormOfPayment
            open={openModal}
            price={String(price)}
            onClose={() => {
              setOpenModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};
