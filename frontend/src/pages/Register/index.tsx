import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "components/Button";
import { ButtonLink } from "components/ButtonLink";
import { InputFlushed } from "components/Input/InputFlushed";
import { Container } from "components/Layout/Container";
import { ConstantRoutes } from "constants/constantsRoutes";

export const Register = () => {
  const formMethods = useForm();

  const navigation = useNavigate();

  const handleLogin = () => {
    navigation(ConstantRoutes.LOGIN);
  };

  return (
    <Container>
      <FormProvider {...formMethods}>
        <div className="flex mt-8 justify-center items-center w-full">
          <div>
            <InputFlushed name="name" label="Nome" className="mb-7 w-[260px]" />
            <InputFlushed
              name="email"
              label="E-mail"
              className="mb-7 w-[260px]"
            />
            <InputFlushed name="senha" className="mb-7" label="Senha" />
            <Button label="Acessar" />
            <ButtonLink
              onClick={handleLogin}
              className="mt-3 text-[12px]"
              label="Já possuo uma conta"
            />
          </div>
        </div>
      </FormProvider>
    </Container>
  );
};
