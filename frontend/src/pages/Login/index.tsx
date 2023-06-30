import { Button } from "components/Button";
import { InputFlushed } from "components/Input/InputFlushed";
import { Container } from "components/Layout/Container";

export const Login = () => {
  return (
    <Container>
      <div className="flex mt-4 justify-center items-center w-full">
        <InputFlushed />
      </div>
      <div className="flex mt-4 justify-center items-center w-full">
        <InputFlushed />
      </div>
      <div className="flex mt-4 justify-center items-center w-full">
        <Button />
      </div>
    </Container>
  );
};
