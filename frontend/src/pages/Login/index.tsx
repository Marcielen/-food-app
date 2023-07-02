import { Button } from "components/Button";
import { ButtonLink } from "components/ButtonLink";
import { InputFlushed } from "components/Input/InputFlushed";
import { Container } from "components/Layout/Container";
import { FormProvider, useForm } from "react-hook-form";

export const Login = () => {
  const formMethods = useForm();

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
            <InputFlushed name="senha" className="mb-7" label="Senha" />
            <Button label="Acessar" />
            <ButtonLink
              className="mt-3 text-[12px]"
              label="Registrar nova conta"
            />
          </div>
        </div>
      </FormProvider>
    </Container>
  );
};
