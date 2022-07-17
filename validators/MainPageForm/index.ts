import { getValidatorErrorMessages } from "@/commons/index";

export const MainPageRegisterOptions = () => {
  return {
    ...getValidatorErrorMessages("name", "Name", ["required"]),
  };
};
