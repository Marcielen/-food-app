import { useEffect, useCallback } from "react";

import { EnumWebServices } from "constants/webServices";
import { api } from "service/api";

export const Dashboard = () => {
  const getDataBuy = useCallback(async () => {
    const response = await api.get(EnumWebServices.BUY);
    //console.log(response);
  }, []);

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
        <p className="text-6xl pt-3 font-bold">$40.50</p>
      </div>
    </div>
  );
};
function useCallbacks(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
