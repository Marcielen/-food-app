import { IoFastFoodOutline } from "react-icons/io5";
import { FormProvider, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

import { EnumWebServices } from "constants/webServices";
import { ResponseApi, api } from "service/api";
import { DecimalMask } from "helpers/monelMask";

import { Button } from "components/Button";
import { Drawer } from "components/Drawer";
import { Input } from "components/Input";
import { ImagePicker } from "components/ImagePicker";
import { Creatable } from "components/Creatable";

import { FormDefaultValues, yupResolver, FormDataProps } from "./validateForms";

export type ProductsProps = {
  banner?: string;
  description?: string;
  category_id: string;
  id: string;
  name: string;
  price: string;
};

type ListCategoryProps = {
  label: string;
  value: string;
};

type CategoryResponse = {
  id: string;
  name: string;
};

export const Products = () => {
  const [listProducts, setListProducts] = useState<ProductsProps[]>([]);
  const [listCategory, setCategory] = useState<ListCategoryProps[]>([]);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const formMethods = useForm<FormDataProps>({
    resolver: yupResolver,
  });

  const { handleSubmit: onSubmit, reset } = formMethods;

  const getDataProducts = useCallback(async () => {
    const response = await api.get<ProductsProps[]>(EnumWebServices.PRODUCT);

    setListProducts(
      response.data.map((item) => ({
        ...item,
        banner:
          item.banner && !item.banner?.includes(import.meta.env.VITE_APP_API)
            ? `${import.meta.env.VITE_APP_API}files/${item.banner}`
            : item.banner,
      }))
    );
  }, []);

  const handleRemoveProduct = useCallback(
    async (id: string) => {
      const response = await api.delete<void, ResponseApi>(
        `${EnumWebServices.PRODUCT_REMOVE}?product_id=${id}`
      );

      if (response.sucess) {
        getDataProducts();
        toast.success("Product delected");
      }
    },
    [getDataProducts]
  );

  const getCategory = useCallback(async () => {
    const response = await api.get<void, ResponseApi<CategoryResponse[]>>(
      EnumWebServices.CATEGORY
    );

    setCategory(
      response.data.map((itemCategory) => ({
        label: itemCategory.name,
        value: itemCategory.id,
      }))
    );
  }, []);

  const createCategory = useCallback(
    async (name: string) => {
      await api.post(EnumWebServices.CATEGORY_CREATE, {
        name,
      });
      getCategory();
    },
    [getCategory]
  );

  const handleUpdateProduct = useCallback(
    (product: ProductsProps) => {
      setIsUpdateData(true);
      reset({
        name: product.name,
        price: product.price,
        category_id: product.category_id,
        description: product.description,
        file: product.banner,
        id: product.id,
      });
      setOpenDrawer(true);
    },
    [reset]
  );

  const createProduct = onSubmit(async (data) => {
    const valueData = new FormData();

    valueData.append("name", data.name);
    valueData.append("price", data.price);
    valueData.append("description", data.description);
    valueData.append("category_id", data?.category_id || "");
    valueData.append("file", data?.file || "");

    if (data.id) {
      valueData.append("id", data?.id);
    }

    let response;

    if (isUpdateData) {
      response = await api.put<void, ResponseApi>(
        EnumWebServices.PRODUCT_UPDATE,
        valueData
      );
    } else {
      response = await api.post<void, ResponseApi>(
        EnumWebServices.PRODUCT_CREATE,
        valueData
      );
    }

    if (response.sucess) {
      getDataProducts();
      setOpenDrawer(false);
      setIsUpdateData(false);
      reset(FormDefaultValues);
    }
  });

  const handleOpenDrawer = () => {
    reset(FormDefaultValues);
    setIsUpdateData(false);
    setOpenDrawer(true);
  };

  useEffect(() => {
    getCategory();
  }, [getCategory]);

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
        <>
          <Drawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            handleSubmit={createProduct}
            label="Create product"
          >
            <ImagePicker name="file" />
            <Input name="name" label="Name product" placeholder="Pizza" />
            <div className="mt-5">
              <Input
                name="price"
                type="number"
                label="Price product"
                placeholder="R$"
              />
            </div>
            <div className="mt-5">
              <Input name="description" label="Description product" />
            </div>
            <div className="mt-5">
              <Creatable
                name="category_id"
                options={listCategory}
                onCreateOption={(value) => {
                  createCategory(value);
                }}
                label="Category"
              />
            </div>
          </Drawer>
          <div className="w-full lg:w-[200px]">
            <Button
              label="Create product"
              onClick={() => handleOpenDrawer()}
              className="text-white h-9 pt-[6px] font-bold"
            />
          </div>
        </>
      </div>
      <div className="mt-7 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        {listProducts.map((itemProduct) => (
          <div
            key={itemProduct.id}
            className="bg-gray-50 shadow-[0px_0px_6px_#00000034] hover:shadow-[#6D5779] min-w-full lg:min-w-[400px] h-[100px] rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex">
              <div className="mr-2">
                {itemProduct?.banner ? (
                  <img
                    src={itemProduct?.banner}
                    className="w-[80px] h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="w-[80px] h-full flex justify-center object-cover rounded-md">
                    <IoFastFoodOutline size={60} />
                  </div>
                )}
              </div>
              <div>
                <p className="text-gray-700 font-bold text-[16px]">
                  {itemProduct.name}
                </p>
                <p className="text-green-500 font-bold text-[16px]">
                  {DecimalMask(itemProduct.price)}
                </p>
                <p className="text-gray-500  text-[12px]">
                  {itemProduct?.description}
                </p>
              </div>
            </div>
            <div>
              <FiTrash2
                size={18}
                onClick={() => handleRemoveProduct(itemProduct.id)}
                className="mb-1 cursor-pointer hover:text-red-500"
              />
              <FiEdit
                size={16}
                onClick={() => handleUpdateProduct(itemProduct)}
                className="mb-1 cursor-pointer hover:text-green-500"
              />
            </div>
          </div>
        ))}
      </div>
    </FormProvider>
  );
};
