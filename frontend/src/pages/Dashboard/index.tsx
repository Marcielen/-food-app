import { useEffect, useCallback, useState } from "react";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";

import { EnumWebServices } from "constants/webServices";
import { api } from "service/api";
import { DecimalMask, validateNumberMask } from "helpers/decimalMask";

import { Loading } from "components/Loading";

type ProductSoldProps = {
  product_name: string;
  amount: number;
};

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [valuePay, setValuePay] = useState<{ price: number }[]>([]);
  const [productSold, setProductSold] = useState<ProductSoldProps[]>([]);

  const price = valuePay.reduce((acc, curr) => {
    return acc + validateNumberMask(curr.price);
  }, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-secondary p-3 font-bold text-white rounded-lg">
          <p>
            Product:{" "}
            <span className="text-primary">{payload[0].payload.name}</span>
          </p>
          <p>
            Product quantity:{" "}
            <span className="text-primary">{payload[0].payload.uv}</span>
          </p>
        </div>
      );
    }

    return null;
  };

  const colors = ["#81007F", "#ff7426", "#6D5779", "#82ca9d", "#8884d8"];

  const data = productSold.map((productItem, index) => {
    const color = colors[index % colors.length];

    return {
      name: productItem.product_name,
      uv: productItem.amount,
      amt: productItem.amount,
      fill: color,
    };
  });

  const getDataBuy = useCallback(async () => {
    setIsLoading(true);
    const response = await api.get(EnumWebServices.PAY);
    setValuePay(response.data);
    setIsLoading(false);
  }, []);

  const getDataProductSold = useCallback(async () => {
    setIsLoading(true);
    const response = await api.get(EnumWebServices.PRODUCT_SOLD);
    setProductSold(response.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getDataBuy();
  }, [getDataBuy]);

  useEffect(() => {
    getDataProductSold();
  }, [getDataProductSold]);

  return (
    <div>
      {isLoading && <Loading />}
      <div
        style={{
          backgroundImage: "linear-gradient(to left, #81007F, #ff7426)",
        }}
        className="w-full text-white px-7 py-7 h-52 rounded-lg bg-black"
      >
        <p className="text-lg font-bold">Total sales in the month:</p>
        <p className="text-6xl pt-3 font-bold">{DecimalMask(price)}</p>
      </div>
      {productSold.length > 0 && (
        <div className="border-2 border-gray-300 w-[500px] mt-10 rounded-lg">
          <p className="pl-4 pt-4 text-lg font-bold">Top selling products</p>

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
            <XAxis dataKey="name" />
            <Tooltip content={<CustomTooltip />} />
            {data.map((entry, index) => (
              <Bar key={index} dataKey="uv" stackId="a" fill={entry.fill} />
            ))}
          </BarChart>
        </div>
      )}
    </div>
  );
};
