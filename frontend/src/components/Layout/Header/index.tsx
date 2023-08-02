import { AiOutlineShoppingCart } from "react-icons/ai";

import { useLayoutContext } from "contexts/LayoutContext";
import Logo from "assets/logo.svg";
import { useMediaQuery } from "hooks/useMediaQuery";
import { Drawer } from "components/Drawer";
import { useEffect, useState } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { DecimalMask } from "helpers/decimalMask";
import { Checkbox } from "components/Checkbox";
import { FormProvider, useForm } from "react-hook-form";
import {
  ConstantRoutes,
  SubstituteRouteParameter,
} from "constants/constantsRoutes";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

type HeaderProps = {
  isVisiblePay?: boolean;
  isNotLayout?: boolean;
};

export const Header = ({
  isVisiblePay = true,
  isNotLayout = false,
}: HeaderProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { breadcrumbs, itemsPay, setItemsPay } = useLayoutContext();

  const formMethods = useForm();

  const navigate = useNavigate();

  const { setValue } = formMethods;

  const isMobile = useMediaQuery("(min-width: 640px)");

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const isPayChecked = itemsPay.some((item) => item.isChecked);
  console.log(itemsPay);
  const handleOrderIsChecked = (index: number) => {
    setItemsPay((prev) =>
      prev.map((item, indexItem) => {
        return {
          ...item,
          isChecked: indexItem === index ? !item.isChecked : false,
        };
      })
    );
  };

  const handlePay = () => {
    const listPaySelected = itemsPay.find((item) => item.isChecked);

    const route = SubstituteRouteParameter(
      ConstantRoutes.PAY,
      "id",
      listPaySelected?.order_pad_id || ""
    );

    setItemsPay((prev) =>
      prev.map((item) => ({
        ...item,
        isChecked: false,
      }))
    );

    setValue(`isOrderConfirmation-${listPaySelected?.order_pad_id}`, false);

    navigate(route, {
      state: {
        id: listPaySelected?.id,
      },
    });
  };

  useEffect(() => {
    itemsPay.forEach((item) => {
      setValue(`isOrderConfirmation-${item.order_pad_id}`, item.isChecked);
    });
  }, [itemsPay, setValue]);

  return (
    <div
      className={`${
        isNotLayout ? "flex" : "flex-col-reverse"
      }  sm:flex-row flex font-bold overflow-x-hidden overflow-y-hidden text-secondary h-[64px] px-[1%] ${
        isNotLayout ? "items-center" : "items-start"
      }  sm:items-center border-b-2 justify-between w-full`}
    >
      <div className="flex">
        {isNotLayout && (
          <FiChevronLeft
            onClick={() => navigate(ConstantRoutes.DASHBOARD)}
            size={30}
            className="text-black mt-1 cursor-pointer"
          />
        )}
        <p className="text-lg whitespace-nowrap ">
          {isMobile
            ? breadcrumbs
            : `${
                breadcrumbs.length <= 30
                  ? breadcrumbs
                  : `${breadcrumbs.slice(0, 30)}...`
              }`}
        </p>
      </div>
      <div className="flex justify-center">
        {isVisiblePay && (
          <div className="relative">
            {itemsPay.length > 0 && (
              <div
                onClick={handleOpenDrawer}
                className="absolute top-[17px] lg:top-[5px] text-primary font-bold cursor-pointer right-[17px] text-[9px]"
              >
                {itemsPay.length}
              </div>
            )}
            <AiOutlineShoppingCart size={28} className="mr-2 mt-3 lg:mt-0" />
          </div>
        )}
        <img className="w-[120px] pt-3 sm:pt-0" src={Logo} alt="Logo" />
      </div>
      <FormProvider {...formMethods}>
        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          disabled={!isPayChecked}
          handleSubmit={() => handlePay()}
          label="Order Confirmation"
        >
          {itemsPay.map(({ price, name, order_pad_id }, index) => (
            <div>
              <div className="flex align-baseline border-b-2 pb-3 pt-3">
                <div className="flex">
                  <Checkbox
                    onClick={() => handleOrderIsChecked(index)}
                    name={`isOrderConfirmation-${order_pad_id}`}
                  />
                  <div className="ml-3 w-[80px] h-full flex justify-center object-cover rounded-md">
                    <IoFastFoodOutline size={60} />
                  </div>
                  <div className="ml-3">
                    <div className="text-lg">{name}</div>
                    <div className="text-lg font-bold text-secondary">
                      {DecimalMask(price)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Drawer>
      </FormProvider>
    </div>
  );
};
