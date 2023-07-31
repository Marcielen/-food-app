import { Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver as yupResolverInstance } from "@hookform/resolvers/yup";

import { MessageRequired } from "constants/messageRequired";

export const FormDefaultValues = {
  name: "",
  price: "",
  category_id: null,
  description: "",
  id: "",
  file: undefined,
};

export type FormDataProps = {
  name: string;
  price: string;
  category_id: string | null;
  description: string;
  file?: string | File;
  id?: string;
  search?: string;
};

const schema = yup.object().shape({
  name: yup.string().required(MessageRequired.REQUIRED_FIELD),
  price: yup.string().required(MessageRequired.REQUIRED_FIELD),
  category_id: yup.string().nullable().required(MessageRequired.REQUIRED_FIELD),
  description: yup.string().required(MessageRequired.REQUIRED_FIELD),
});

export const yupResolver = yupResolverInstance(
  schema
) as Resolver<FormDataProps>;
