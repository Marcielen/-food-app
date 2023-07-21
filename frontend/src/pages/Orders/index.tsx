import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

import { EnumWebServices } from "constants/webServices";
import { ResponseApi, api } from "service/api";

import { Button } from "components/Button";
import { Drawer } from "components/Drawer";
import { Input } from "components/Input";
import { Switch } from "components/Swiper";

import { formDefaultValues, FormData, yupResolver } from "./validationForms";

type OrdersProps = {
  active: boolean;
  id: string;
  order: string;
};

export const Orders = () => {
  const [listOrders, setListOrders] = useState<OrdersProps[]>([]);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const formMethods = useForm<FormData>({
    defaultValues: formDefaultValues,
    resolver: yupResolver,
  });

  const { handleSubmit: onSubmit, reset } = formMethods;

  const getDataOrder = useCallback(async () => {
    const response = await api.get<OrdersProps[]>(
      EnumWebServices.ORDERS_REGISTER
    );

    setListOrders(response.data);
  }, []);

  const handleRemoveOrder = useCallback(
    async (id: string) => {
      const response = await api.delete<void, ResponseApi>(
        `${EnumWebServices.ORDERS_REGISTER_REMOVE}?item_id=${id}`
      );

      if (response.sucess) {
        getDataOrder();
        toast.success("Product delected");
      }
    },
    [getDataOrder]
  );

  const handleUpdateOrder = useCallback(
    (orders: OrdersProps) => {
      setIsUpdateData(true);
      reset({ ...orders, item_id: orders.id });
      setOpenDrawer(true);
    },
    [reset]
  );

  const handleConfirm = onSubmit(async (data) => {
    let response;

    if (isUpdateData) {
      response = await api.put<void, ResponseApi>(
        EnumWebServices.ORDERS_REGISTER_UPDATE,
        data
      );
    } else {
      response = await api.post<void, ResponseApi>(
        EnumWebServices.ORDERS_REGISTER_CREATE,
        data
      );
    }

    if (response.sucess) {
      getDataOrder();
      setOpenDrawer(false);
      reset(formDefaultValues);
    }
  });

  const handleOpenDrawe = () => {
    setIsUpdateData(false);
    setOpenDrawer(true);
  };

  useEffect(() => {
    getDataOrder();
  }, [getDataOrder]);

  return (
    <FormProvider {...formMethods}>
      <div className="flex flex-col lg:flex-row justify-between">
        <div>
          <Input
            name="search"
            leftElement
            className="w-full mb-2 lg:mb-0 lg:w-[300px]"
          />
        </div>
        <>
          <Drawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            handleSubmit={() => {
              handleConfirm();
            }}
            label="Create order"
          >
            <Input name="order" label="Name order" placeholder="01" />
            <div className="mt-5 ">
              <Switch name="active" label="Order active" />
            </div>
          </Drawer>
          <div className="w-full lg:w-[200px]">
            <Button
              label="Create order"
              onClick={() => handleOpenDrawe()}
              className="text-white h-9 pt-[6px] font-bold"
            />
          </div>
        </>
      </div>
      <div
        className="mt-7 grid gap-6 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 
      lg:grid-cols-6"
      >
        {listOrders.map((itemOrder) => (
          <div
            key={itemOrder.id}
            className="bg-gray-50 shadow-[0px_0px_6px_#00000034] hover:shadow-[#6D5779] 
            min-w-full lg:min-w-[70px] h-[110px] rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex w-full justify-center">
              <div className="font-sora  text-gray-600">
                <div className="text-md">Table</div>
                <div>
                  <p className="font-bold text-secondary text-center text-2xl">
                    {itemOrder.order}
                  </p>
                </div>
                <div className="flex mt-1 w-full justify-center">
                  <FiTrash2
                    size={15}
                    onClick={() => handleRemoveOrder(itemOrder.id)}
                    className=" mr-1 cursor-pointer hover:text-red-500"
                  />
                  <FiEdit
                    size={14}
                    onClick={() => handleUpdateOrder(itemOrder)}
                    className=" cursor-pointer hover:text-green-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </FormProvider>
  );
};
