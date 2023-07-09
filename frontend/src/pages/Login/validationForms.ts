import * as yup from "yup";
import { yupResolver as yupResolverInstance } from "@hookform/resolvers/yup";
import { MessageRequired } from "constants/messageRequired";

const schema = yup.object().shape({
  email: yup.string().required(MessageRequired.REQUIRED_FIELD),
  password: yup.string().required(MessageRequired.REQUIRED_FIELD),
});

export const yupResolver = yupResolverInstance(schema);
