import { useState } from "react";
import Modal from "react-modal";
import { Controller, useForm } from "react-hook-form";
import { customModalStyle } from "@/styles/js/modal";
import { Education } from "@/commons";
import { EducationFormRegisterOptions } from "@/validators/EducationForm";
import InputWithValidator from "@/components/FormValidators/InputWithValidator";
import TextAreaWithValidator from "@/components/FormValidators/TextAreaWithValidator";

Modal.setAppElement("#__next");

const MainPage = () => {
  // Educations
  const [educations, setEducations] = useState([
    {
      name: "Showwcase university 1",
      startYear: "August 2018",
      endYear: "September 2022",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed praesentium officiis eos eveniet aliquam pariatur, delectus, omnis veniam optio veritatis temporibus nisi reiciendis tempore vero quisquam explicabo. Debitis corrupti veniam, expedita quibusdam fugit explicabo doloremque. Doloribus molestias officiis tempora quidem enim, labore sequi. Eveniet facere cumque impedit veritatis molestias non itaque fugiat, perferendis adipisci quibusdam.",
    },
    {
      name: "Showwcase university 2",
      startYear: "August 2018",
      endYear: "September 2022",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed praesentium officiis eos eveniet aliquam pariatur, delectus, omnis veniam optio veritatis temporibus nisi reiciendis tempore vero quisquam explicabo. Debitis corrupti veniam, expedita quibusdam fugit explicabo doloremque. Doloribus molestias officiis tempora quidem enim, labore sequi. Eveniet facere cumque impedit veritatis molestias non itaque fugiat, perferendis adipisci quibusdam.",
    },
  ] as Education[]);

  // Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      startYear: "",
      endYear: "",
      description: "",
    },
  });
  const registerOptions: any = EducationFormRegisterOptions();
  const onEducationFormSubmit = (data: Education) => {
    if (Object.keys(errors).length) return;

    setEducations([...educations, data]);
    closeModal();
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
      <div id="header" className="pt-20 text-center">
        <p className="text-3xl">Welcome to Chheungs education page</p>
        <button
          className="mt-5 px-5 py-2 bg-green-400 text-white bg-rounded rounded-lg"
          onClick={openModal}
        >
          Add new education
        </button>
      </div>

      <div id="content" className="mt-10 grid grid-cols-12">
        <div className="col-span-3 px-4">
          <div className="bg-gray-500"></div>
        </div>
        <div className="col-span-6 px-4">
          <div className=" text-white">
            {educations.map((e) => {
              return (
                <div
                  key={e.name}
                  className="bg-gray-500 px-5 border-rounded rounded-xl my-10"
                >
                  <div className="pt-5 text-2xl">{e.name}</div>
                  <div className="text-xl">
                    {e.startYear} - {e.endYear}
                  </div>
                  <div className="py-5">
                    <span className="text-md break-words">{e.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-3 px-4">
          <div className="bg-gray-500"></div>
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
          onSubmit={handleSubmit(onEducationFormSubmit)}
        >
          <div className="mt-2">
            <label>Start year</label>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={registerOptions.name}
              render={({ field }) => (
                <InputWithValidator {...field} error={errors.name} />
              )}
            />
          </div>
          <div className="mt-2">
            <label>Start year</label>
            <Controller
              name="startYear"
              control={control}
              defaultValue=""
              rules={registerOptions.startYear}
              render={({ field }) => (
                <InputWithValidator {...field} error={errors.startYear} />
              )}
            />
          </div>
          <div className="mt-2">
            <div className="flex justify-between">
              <label>End year</label>
              <label className="text-gray-400">Optional</label>
            </div>

            <Controller
              name="endYear"
              control={control}
              defaultValue=""
              rules={registerOptions.endYear}
              render={({ field }) => <InputWithValidator {...field} />}
            />
          </div>
          <div className="mt-2">
            <label>Description</label>

            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={registerOptions.description}
              render={({ field }) => (
                <TextAreaWithValidator {...field} error={errors.description} />
              )}
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
