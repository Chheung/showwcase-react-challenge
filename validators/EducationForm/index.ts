import { getValidatorErrorMessages } from "@/commons";

export const EducationFormRegisterOptions = (): {
  [key: string]: any;
} => {
  return {
    ...getValidatorErrorMessages("name", "Name", ["required"]),
    ...getValidatorErrorMessages("startYear", "Start Year", ["required"]),
  };
};
