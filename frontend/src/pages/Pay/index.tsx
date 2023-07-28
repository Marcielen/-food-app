import { Header } from "components/Layout/Header";
import { DetailProductProps } from "components/Modal/ModalDetailProducts";
import { EnumWebServices } from "constants/webServices";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ResponseApi, api } from "service/api";

export const Pay = () => {
  const params = useParams<{ id: string }>();

  const getDataProducts = useCallback(async () => {
    const response = await api.get<void, ResponseApi<DetailProductProps[]>>(
      EnumWebServices.ORDERS_PAD_PRODUCT,
      { params: { order_pad_id: params.id } }
    );
    console.log(response);
  }, [params]);

  useEffect(() => {
    getDataProducts();
  }, [getDataProducts]);

  return (
    <div className="h-screen">
      <Header isVisiblePay={false} />
      <div className="flex h-[calc(100vh-64px)] w-full justify-center items-center">
        <div>
          <p>Products:</p>
        </div>
        <div>
          <p>Purchase summary:</p>
        </div>
      </div>
    </div>
  );
};
