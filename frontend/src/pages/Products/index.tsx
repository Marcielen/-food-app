import { Button } from "components/Button";
import { Drawer } from "components/Drawer";
import { Input } from "components/Input";
import { EnumWebServices } from "constants/webServices";
import { useCallback, useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FormProvider, useForm } from "react-hook-form";
import { api } from "service/api";
import { CreateProduct } from "./CreateProduct";
import { yupResolver } from "./validateForms";

type FormData = {
  name: string;
  price: string;
  category_id: string;
  description: string;
  file?: string;
};

type ProductsProps = {
  banner?: string;
  description?: string;
  category_id: string;
  id: string;
  name: string;
  price: string;
};

export const Products = () => {
  const [listProducts, setListProducts] = useState<ProductsProps[]>([]);

  const formMethods = useForm<FormData>({
    resolver: yupResolver,
  });

  const getDataProducts = useCallback(async () => {
    const response = await api.get<ProductsProps[]>(EnumWebServices.PRODUCT);

    setListProducts(response.data);
  }, []);

  const handleSubmit = useCallback(() => {
    getDataProducts();
  }, [getDataProducts]);

  useEffect(() => {
    getDataProducts();
  }, [getDataProducts]);
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
        <CreateProduct handleSubmit={handleSubmit} />
      </div>
      <div className="mt-7 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        {listProducts.map((itemProduct) => (
          <div
            key={itemProduct.id}
            className="bg-gray-50 shadow-[0px_0px_6px_#00000034] hover:shadow-[#6D5779] min-w-full lg:min-w-[400px] h-[100px] rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex">
              <div>
                <img src={itemProduct.banner} className="w-[50px]" />
              </div>
              <div>
                <p className="text-gray-700 font-bold text-[16px]">
                  {itemProduct.name}
                </p>
                <p className="text-green-500 font-bold text-[16px]">
                  ${itemProduct.price}
                </p>
                <p className="text-gray-500  text-[12px]">
                  {itemProduct?.description}
                </p>
              </div>
            </div>
            <div>
              <FiTrash2
                size={18}
                className="mb-1 cursor-pointer hover:text-red-500"
              />
              <FiEdit
                size={16}
                className="mb-1 cursor-pointer hover:text-green-500"
              />
              <AiOutlineFileSearch
                size={18}
                className="cursor-pointer hover:text-green-500"
              />
            </div>
          </div>
        ))}
      </div>
    </FormProvider>
  );
};
