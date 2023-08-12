import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ResponseApi, api } from "service/api";
import { EnumWebServices } from "constants/webServices";

import { Button } from "components/Button";
import { ButtonLink } from "components/ButtonLink";
import { InputFlushed } from "components/Input/InputFlushed";
import { Container } from "components/Layout/Container";
import { ConstantRoutes } from "constants/constantsRoutes";

import { yupResolver } from "./validationForms";

type FormData = {
  name: string;
  password: string;
  email: string;
};

export const Register = () => {
  const formMethods = useForm<FormData>({
    resolver: yupResolver,
  });

  const { handleSubmit } = formMethods;

  const navigation = useNavigate();

  const handleLogin = () => {
    navigation(ConstantRoutes.LOGIN);
  };

  const handleCreateUser = handleSubmit(async (data) => {
    const response = await api.post<void, ResponseApi>(
      EnumWebServices.USERS,
      data
    );

    if (response.sucess) {
      toast.success("Successfully registered user");
      navigation(ConstantRoutes.LOGIN);
    }
  });

  return (
    <Container>
      <FormProvider {...formMethods}>
        <div className="flex mt-8 justify-center items-center w-full">
          <div>
            <InputFlushed name="name" label="Name" className="mb-7 w-[260px]" />
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
            <Button label="Register" onClick={handleCreateUser} />
            <ButtonLink
              onClick={handleLogin}
              className="mt-3 text-[12px]"
              label="I already have an account"
            />
          </div>
        </div>
      </FormProvider>
    </Container>
  );
};
