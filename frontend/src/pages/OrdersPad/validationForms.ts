import { Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver as yupResolverInstance } from "@hookform/resolvers/yup";

import { MessageRequired } from "constants/messageRequired";

export interface FormData extends Record<string, string> {
  order_id: string;
}

export const formDefaultValues = {
  active: true,
  order: "",
};

const schema = yup.object().shape({
  order_id: yup.string().required(MessageRequired.REQUIRED_FIELD),
});

export const yupResolver = yupResolverInstance(schema) as Resolver<FormData>;
