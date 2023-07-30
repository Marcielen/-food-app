import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { parseCookies } from "nookies";

import { Button } from "components/Button";
import { ButtonLink } from "components/ButtonLink";
import { InputFlushed } from "components/Input/InputFlushed";
import { Container } from "components/Layout/Container";
import { ConstantRoutes } from "constants/constantsRoutes";
import { useAuthContext } from "contexts/AuthContext";

import { yupResolver } from "./validationForms";

type FormData = {
  password: string;
  email: string;
};

export const Login = () => {
  const { signIn, userExpiration } = useAuthContext();

  const formMethods = useForm<FormData>({
    resolver: yupResolver,
  });

  const cookies = parseCookies(undefined);

  const isAuthenticated = cookies["@auth.token"];

  const navigation = useNavigate();

  const { handleSubmit: onSubmit } = formMethods;

  const handleRegister = () => {
    navigation(ConstantRoutes.REGISTER);
  };

  const handleSubmit = onSubmit((data) => {
    signIn(data);
  });

  useEffect(() => {
    if (isAuthenticated && !userExpiration) {
      navigation(ConstantRoutes.DASHBOARD);
    }
  }, [isAuthenticated, navigation, userExpiration]);

  return (
    <Container>
      <FormProvider {...formMethods}>
        <div className="flex mt-8 justify-center items-center w-full">
          <div>
            <InputFlushed
              name="email"
              label="E-mail"
              className="mb-7 w-[260px]"
            />
            <InputFlushed
              name="password"
              type="password"
              className="mb-7"
              label="Password"
            />
            <Button label="Sing in" onClick={handleSubmit} />
            <ButtonLink
              onClick={handleRegister}
              className="mt-3 text-[12px]"
              label="New account registrar"
            />
          </div>
        </div>
      </FormProvider>
    </Container>
  );
};
