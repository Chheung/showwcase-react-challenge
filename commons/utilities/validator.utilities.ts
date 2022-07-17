const getValidatorErrorMessage = (fieldName: string, validator: string) => {
  let msg = "";
  switch (validator) {
    case "required": {
      msg = `${fieldName} is required`;
      break;
    }
    default:
      break;
  }

  return msg;
};

export const getValidatorErrorMessages = (
  fieldKey: string,
  fieldName: string,
  validators: string[]
) => {
  let obj: any = { [`${fieldKey}`]: {} };
  for (const validator of validators) {
    obj[`${fieldKey}`][`${validator}`] = getValidatorErrorMessage(
      fieldName,
      validator
    );
  }

  return obj;
};
