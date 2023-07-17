import { useState } from "react";

export const Menu = () => {
  const [testeMenu, setTesteMenu] = useState(false);
  return (
    <div
      onClick={() => setTesteMenu(!testeMenu)}
      className={`h-full text-white mr-14 ${
        testeMenu ? "w-[220px]" : "w-[60px]"
      } bg-primary`}
    >
      <h1>oii</h1>
    </div>
  );
};
