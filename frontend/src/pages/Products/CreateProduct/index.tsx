import { Button } from "components/Button";
import { Creatable } from "components/Creatable";
import { Drawer } from "components/Drawer";
import { ImagePicker } from "components/ImagePicker";
import { Input } from "components/Input";
import { EnumWebServices } from "constants/webServices";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ResponseApi, api } from "service/api";

type ListCategoryProps = {
  label: string;
  value: string;
};

type CategoryResponse = {
  id: string;
  name: string;
};

type CreateCategoryProps = {
  handleSubmit: () => void;
};

export const CreateProduct = ({ handleSubmit }: CreateCategoryProps) => {
  const [listCategory, setCategory] = useState<ListCategoryProps[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { handleSubmit: onSubmit, watch } = useFormContext();
  console.log(watch("file"));
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

  const createProduct = onSubmit(async (data) => {
    const valueData = new FormData();
    valueData.append("name", data.name);
    valueData.append("price", data.price);
    valueData.append("description", data.description);
    valueData.append("category_id", data.category_id);
    valueData.append("file", data.file);
    const response = await api.post(EnumWebServices.PRODUCT_CREATE, valueData);
    if (response) {
      handleSubmit();
      setOpenDrawer(false);
    }
  });

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  return (
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
          onClick={() => setOpenDrawer(true)}
          className="text-white h-9 pt-[6px] font-bold"
        />
      </div>
    </>
  );
};
