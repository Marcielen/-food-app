import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";

import { Button } from "components/Button";
import { ButtonLink } from "components/ButtonLink";
import { InputFlushed } from "components/Input/InputFlushed";
import { Container } from "components/Layout/Container";
import { ConstantRoutes } from "constants/constantsRoutes";
import { useAuthContext } from "contexts/AuthContext";
import { Loading } from "components/Loading";

import { yupResolver } from "./validationForms";

type FormData = {
  password: string;
  email: string;
};

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = onSubmit(async (data) => {
    setIsLoading(true);
    await signIn(data);
    setIsLoading(false);
  });

  useEffect(() => {
    if (isAuthenticated && !userExpiration) {
      navigation(ConstantRoutes.DASHBOARD);
    }
  }, [isAuthenticated, navigation, userExpiration]);

  return (
    <Container>
      <FormProvider {...formMethods}>
        {isLoading && <Loading />}
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
            <Button
              label="Sing in"
              disabled={isLoading}
              onClick={handleSubmit}
            />
            <ButtonLink
              disabled={isLoading}
              onClick={handleRegister}
              className="mt-3 text-[12px]"
              label="New account register"
            />
          </div>
        </div>
      </FormProvider>
    </Container>
  );
};
