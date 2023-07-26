import { Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver as yupResolverInstance } from "@hookform/resolvers/yup";

import { MessageRequired } from "constants/messageRequired";

export interface FormData extends Record<string, string> {
  order_id: string;
}

export const formDefaultValues = {
  order_id: "",
};

export type OrdersProps = {
  active: boolean;
  id: string;
  order: string;
};

export type UpdateDataProps = {
  id: string;
  order_pad_id: string;
};

export type OrdersPadProps = {
  order_id: string;
  id: string;
};

export type ListProductsProps = {
  product_id: string | null;
  amount: number;
  order_pad_id?: string;
  id?: string;
};

export const formDefaultProduct = [
  {
    product_id: "0",
    amount: 0,
  },
];

const schema = yup.object().shape({
  order_id: yup.string().required(MessageRequired.REQUIRED_FIELD),
});

export const yupResolver = yupResolverInstance(schema) as Resolver<FormData>;
