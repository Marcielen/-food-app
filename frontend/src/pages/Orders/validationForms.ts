import { Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver as yupResolverInstance } from "@hookform/resolvers/yup";

import { MessageRequired } from "constants/messageRequired";

export type FormData = {
  order: string;
  active?: boolean;
  item_id?: string;
  search?: string;
};

export const formDefaultValues = {
  active: true,
  order: "",
};

const schema = yup.object().shape({
  order: yup.string().required(MessageRequired.REQUIRED_FIELD),
});

export const yupResolver = yupResolverInstance(schema) as Resolver<FormData>;
