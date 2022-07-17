import { useState } from "react";
import Modal from "react-modal";
import { Controller, useForm } from "react-hook-form";
import { customModalStyle } from "@/styles/js/modal";
import { EducationFormRegisterOptions } from "@/validators/EducationForm";
import InputWithValidator from "@/components/FormValidators/InputWithValidator";
import TextAreaWithValidator from "@/components/FormValidators/TextAreaWithValidator";

Modal.setAppElement("#__next");

const MainPage = () => {
  // Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      start: "",
      end: "",
      description: "",
    },
  });
  const registerOptions: any = EducationFormRegisterOptions();
  const onSubmit = (data: any) => {
    console.log(errors);
    if (Object.keys(errors).length) return;
  };

  // Modal
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="h-full">
      <div id="header" className="pt-40 text-center">
        <p className="text-3xl">Welcome to Chheungs education page</p>
        <button
          className="mt-5 px-5 py-2 bg-green-400 text-white bg-rounded rounded-lg"
          onClick={openModal}
        >
          Add new education
        </button>
      </div>

      <div id="content" className="mt-20 grid grid-cols-12">
        <div className="col-span-3 px-4">
          <div className="bg-gray-500">ff</div>
        </div>
        <div className="col-span-6 px-4">
          <div className="bg-gray-500">ff</div>
        </div>
        <div className="col-span-3 px-4">
          <div className="bg-gray-500">ff</div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyle}
      >
        <p className="mt-2 text-2xl text-center">New Education Modal</p>

        <form
          id="educationForm"
          className="mt-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-2">
            <label>Start year</label>
            <Controller
              name="start"
              control={control}
              defaultValue=""
              rules={registerOptions.start}
              render={({ field }) => (
                <InputWithValidator {...field} error={errors.start} />
              )}
            />
          </div>
          <div className="mt-2">
            <div className="flex justify-between">
              <label>End year</label>
              <label className="text-gray-400">Optional</label>
            </div>

            <Controller
              name="end"
              control={control}
              defaultValue=""
              rules={registerOptions.end}
              render={({ field }) => (
                <InputWithValidator {...field} error={errors.end} />
              )}
            />
          </div>
          <div className="mt-2">
            <label>Description</label>

            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={registerOptions.description}
              render={({ field }) => <TextAreaWithValidator {...field} />}
            />
          </div>
          <div className="my-2 flex justify-end">
            <button
              className="mt-5 w-full px-6 py-2 bg-green-400 text-white bg-rounded rounded-lg"
              type="submit"
              form="educationForm"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MainPage;
