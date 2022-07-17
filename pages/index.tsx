import type { NextPage } from "next";
import { Controller, useForm } from "react-hook-form";
import InputWithValidator from "@/components/FormValidators/InputWithValidator";
import { MainPageRegisterOptions } from "@/validators/MainPageForm";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const registerOptions: any = MainPageRegisterOptions();

  const onSubmit = (data: any) => {
    if (Object.keys(errors).length) return;

    router.push({ pathname: "/main", query: { name: getValues("name") } });
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-3xl">Hi there! Welcome to your education showcase</h1>
      <div className="mt-10">
        <p className="text-2xl mb-5">
          Type your name and click &quot;Enter&quot; below to begin
        </p>
        <form id="usernameForm" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={registerOptions.name}
            render={({ field }) => (
              <InputWithValidator {...field} error={errors.name} />
            )}
          />
        </form>
      </div>
      <button
        className="w-full mt-5 px-6 py-2 bg-green-400 text-white bg-rounded rounded-lg"
        style={{ maxWidth: "200px" }}
        type="submit"
        form="usernameForm"
      >
        Submit
      </button>
    </div>
  );
};

export default Home;
