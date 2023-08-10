import { useEffect, useCallback, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import { EnumWebServices } from "constants/webServices";
import { api } from "service/api";
import { DecimalMask, validateNumberMask } from "helpers/decimalMask";

export const Dashboard = () => {
  const [valuePay, setValuePay] = useState<{ price: number }[]>([]);

  const getDataBuy = useCallback(async () => {
    const response = await api.get(EnumWebServices.PAY);
    setValuePay(response.data);
  }, []);

  const getDataProductSold = useCallback(async () => {
    const response = await api.get(EnumWebServices.PRODUCT_SOLD);
    console.log(response.data);
  }, []);

  const price = valuePay.reduce((acc, curr) => {
    return acc + validateNumberMask(curr.price);
  }, 0);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      amt: 2400,
      fill: "#8884d8", // Cor para a primeira barra
    },
    {
      name: "Page B",
      uv: 3000,
      amt: 2210,
      fill: "#82ca9d", // Cor para a segunda barra
    },
    {
      name: "Page c",
      uv: 3000,
      amt: 2210,
      fill: "#00BFFF", // Cor para a segunda barra
    },
    // ... adicione cores para outras entradas de dados
  ];

  useEffect(() => {
    getDataBuy();
    getDataProductSold();
  }, [getDataBuy, getDataProductSold]);

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
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" />{" "}
        {/* Remove esta linha */}
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" />{" "}
        {/* Remove esta linha */}
        {/* Adicione um loop para renderizar barras dinamicamente com cores diferentes */}
        {data.map((entry, index) => (
          <Bar key={index} dataKey="uv" stackId="a" fill={entry.fill} />
        ))}
      </BarChart>
    </div>
  );
};
