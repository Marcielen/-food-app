import { useEffect, useCallback, useState } from "react";

import { EnumWebServices } from "constants/webServices";
import { api } from "service/api";
import { DecimalMask, validateNumberMask } from "helpers/decimalMask";

export const Dashboard = () => {
  const [valuePay, setValuePay] = useState<{ price: number }[]>([]);

  const getDataBuy = useCallback(async () => {
    const response = await api.get(EnumWebServices.PAY);
    setValuePay(response.data);
  }, []);

  const price = valuePay.reduce((acc, curr) => {
    return acc + validateNumberMask(curr.price);
  }, 0);

  useEffect(() => {
    getDataBuy();
  }, [getDataBuy]);

  return (
    <div>
      <div
        style={{
          backgroundImage: "linear-gradient(to left, #81007F, #ff7426)",
        }}
        className="w-full text-white px-7 py-7 h-52 rounded-lg bg-black"
      >
        <p className="text-lg font-bold">Total sales in the month:</p>
        <p className="text-6xl pt-3 font-bold">{DecimalMask(price)}</p>
      </div>
    </div>
  );
};
