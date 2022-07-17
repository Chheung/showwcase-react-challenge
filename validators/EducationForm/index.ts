import { getValidatorErrorMessages } from "@/commons";

export const EducationFormRegisterOptions = () => {
  return {
    ...getValidatorErrorMessages("name", "Name", ["required"]),
    ...getValidatorErrorMessages("start", "Start Year", ["required"]),
  };
};
