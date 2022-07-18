import { useEffect, useState } from "react";
import { debounce } from "lodash";
import Modal from "react-modal";
import { NextResponse, NextRequest } from "next/server";
import { Controller, useForm } from "react-hook-form";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { customModalStyle } from "@/styles/ts/modal.style";
import { Education } from "@/commons";
import { EducationFormRegisterOptions } from "@/validators/EducationForm";
import InputWithValidator from "@/components/FormValidators/InputWithValidator";
import TextAreaWithValidator from "@/components/FormValidators/TextAreaWithValidator";
import { useRouter } from "next/router";

Modal.setAppElement("#__next");

export async function getServerSideProps(context: any) {
  const { name } = context.query;
  if (!name)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return {
    props: {},
  };
}
const MainPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const { name } = router.query;
    if (typeof name === "string") setUsername(name);
  }, []);

  // Educations
  const [educations, setEducations] = useState([] as Education[]);

  // Form

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
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

    setEducations([data, ...educations]);
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

  // Auto complete
  let isLoading = false;
  const fetchUniversities = async () => {
    isLoading = true;
    try {
      const res = await fetch(
        "http://universities.hipolabs.com/search?name=" + getValues("name")
      );

      let data = await res.json();
      if (data.length > 10) {
        data = data.slice(0, 10);
      }

      setUniversities(data);
      return data;
    } catch (e) {
    } finally {
      isLoading = false;
    }
  };

  const [universities, setUniversities] = useState([]);
  const handleOnSearch = debounce(async function (string: any, results: any) {
    setUniversities([]);
    setValue("name", string);
    await fetchUniversities();
  }, 700);

  const handleOnSelect = (item: any) => {
    setValue("name", item.name);
  };

  const formatResult = (item: any) => {
    if (!isLoading) {
      return (
        <>
          <span style={{ display: "block", textAlign: "left" }}>
            {item.name}
          </span>
        </>
      );
    } else {
      return (
        <>
          <span>Is Loading...</span>
        </>
      );
    }
  };

  return (
    <div className="h-full">
      <div id="header" className="pt-20 text-center">
        <p className="text-3xl">Welcome to {username} education page</p>
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
            <label>Name</label>
            <ReactSearchAutocomplete
              items={universities}
              onSearch={handleOnSearch}
              onSelect={handleOnSelect}
              autoFocus
              showIcon={false}
              formatResult={formatResult}
              styling={{
                fontSize: "16px",
                border: "2px solid rgb(229, 231, 235)",
                borderRadius: "0.5em",
                backgroundColor: "white",
                boxShadow: "none",
                hoverBackgroundColor: "white",
                color: "black",
                lineColor: "lightgreen",
                placeholderColor: "white",
                clearIconMargin: "3px 8px 0 0",
                searchIconMargin: "8px 0 0 0",
                zIndex: 2,
              }}
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
function useDebounce(searchTerm: any, arg1: number) {
  throw new Error("Function not implemented.");
}
