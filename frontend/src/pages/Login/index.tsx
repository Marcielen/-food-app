import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "components/Button";
import { ButtonLink } from "components/ButtonLink";
import { InputFlushed } from "components/Input/InputFlushed";
import { Container } from "components/Layout/Container";
import { ConstantRoutes } from "constants/constantsRoutes";
import { useAuthContext } from "contexts/AuthContext";
import { yupResolver } from "./validationForms";
import { useEffect } from "react";
import { parseCookies } from "nookies";

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
      navigation(ConstantRoutes.HOME);
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
              label="Senha"
            />
            <Button label="Acessar" onClick={handleSubmit} />
            <ButtonLink
              onClick={handleRegister}
              className="mt-3 text-[12px]"
              label="Registrar nova conta"
            />
          </div>
        </div>
      </FormProvider>
    </Container>
  );
};
