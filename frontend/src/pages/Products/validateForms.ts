import * as yup from "yup";
import { yupResolver as yupResolverInstance } from "@hookform/resolvers/yup";
import { MessageRequired } from "constants/messageRequired";

const schema = yup.object().shape({
  name: yup.string().required(MessageRequired.REQUIRED_FIELD),
  price: yup.string().required(MessageRequired.REQUIRED_FIELD),
  category_id: yup.string().required(MessageRequired.REQUIRED_FIELD),
  description: yup.string().required(MessageRequired.REQUIRED_FIELD),
});

export const yupResolver = yupResolverInstance(schema);
