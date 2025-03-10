"use client";

import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FC,
  useCallback,
} from "react";
import classNames from "classnames";
import style from "./Form.module.css";
import { Button } from "../Button/Button";
import { Input } from "./Inputs/Input";
import { InputMasked } from "./Inputs/InputMasked";
import { Preloader } from "../Preloader/Preloader";
import { RadioButton } from "./RadioButton/Radio";

import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import useImageValidation from "../../hooks/useImageValidation";
import useApiRequest from "../../hooks/useRequest";
import { API_BASE_URL } from "@/config/constans";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  position: string;
  photo: File | null;
}

interface Position {
  id: string;
  name: string;
}

export const Form: FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isPositionsLoaded, setIsPositionsLoaded] = useState<boolean>(false);
  const { imageError, fileName, handleFileChange } = useImageValidation({});

  const {
    makeRequest: makePostRequest,
    loading: postLoading,
    error: postError,
  } = useApiRequest<FormData>(`${API_BASE_URL}/users`, "POST");

  const {
    makeRequest: makeGetRequest,
    loading: getLoading,
    error: getError,
  } = useApiRequest<void>(`${API_BASE_URL}/positions`, "GET");

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const data = await makeGetRequest();
        setPositions(data.positions);
        setIsPositionsLoaded(true);

        if (data.positions.length > 0) {
          const defaultPosition = data.positions[0].id;
          setSelectedPosition(String(defaultPosition));
          setFieldValue("position", defaultPosition);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.error("Error with getting postion:", getError);
      }
    };
    fetchPositions();
  }, []);

  const initialValues: FormValues = {
    name: "",
    email: "",
    phone: "",
    position: selectedPosition,
    photo: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must have at least 3 symbols")
      .required("Name is required."),
    email: Yup.string()
      .matches(
        /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/,
        "must to be '@', and domain name"
      )
      .required("Email is required."),
    phone: Yup.string()
      .min(3, "Phone must have at least 3 numbers")
      .required("Phone is required."),
    position: Yup.string().required("Position is required."),
    photo: Yup.mixed().required("Photo is required."),
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isValid,
    dirty,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (
      values: FormValues,
      { setFieldError }: FormikHelpers<FormValues>
    ) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("position_id", selectedPosition);
      formData.append("photo", values.photo as Blob);

      try {
        await makePostRequest(formData);
        setIsSuccess(true);
      } catch {
        setFieldError("photo", "Failed to send data");
      }
    },
  });

  const handleUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileChange(file, setFieldValue);
      }
    },
    [handleFileChange, setFieldValue]
  );

  const getShortFileName = useCallback((name: string) => {
    const maxLength = 20;
    if (name.length <= maxLength) {
      return name;
    }
    return `${name.substring(0, 7)}...${name.substring(name.length - 10)}`;
  }, []);

  if (!isPositionsLoaded || postLoading || getLoading) {
    return <Preloader />;
  }

  return (
    <>
      {isSuccess ? (
        <div className={style.success_screen}>
          <h4 className={style.success_title}>User successfully registered</h4>
          <img
            src={"./images/Success.png"}
            alt="Success"
            className={style.success_img}
          />
        </div>
      ) : (
        <form className={style.form} id="signUpForm" onSubmit={handleSubmit}>
          <h3 className={style.form_title}>Working with POST request</h3>
          <div className={style.form_content_wrapper}>
            <Input
              id="name"
              value={values.name}
              type="text"
              placeholder="Your name"
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              errorMessage={touched.name && errors.name}
            />
            <Input
              id="email"
              value={values.email}
              type="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              errorMessage={touched.email && errors.email}
            />
            <InputMasked
              id="phone"
              value={values.phone}
              type="tel"
              placeholder="Phone"
              onChange={handleChange}
              onBlur={handleBlur}
              name="phone"
              errorMessage={touched.phone && errors.phone}
            />
            <div className={style.radio_wrapper}>
              <h2 className={style.radio_buttons__title}>
                Select your position
              </h2>
              {positions.map((position) => (
                <RadioButton
                  key={position.id}
                  position={position}
                  selectedPosition={selectedPosition}
                  onChange={(value) => {
                    setSelectedPosition(value);
                    setFieldValue("position", value);
                  }}
                />
              ))}
            </div>
            <div
              className={classNames(style.upload_container, {
                [style.error_border]: imageError,
              })}
            >
              <button
                type="button"
                onClick={handleUpload}
                className={classNames(style.upload_button, {
                  [style.error_btn_input]: imageError,
                })}
              >
                Upload
              </button>
              <input
                ref={fileInputRef}
                className={style.img_input}
                type="file"
                name="photo"
                onChange={handleFileInputChange}
                onBlur={handleBlur}
                style={{ display: "none" }}
              />
              <div className={style.image_preview_container}>
                {fileName ? getShortFileName(fileName) : "Upload your photo"}
              </div>
              {imageError && (
                <div className={style.error_message}>{imageError}</div>
              )}
            </div>
            {(postError || getError) && (
              <div className={style.error_message}>{postError || getError}</div>
            )}
            <div className={style.form_btn_wrapper}>
              <Button
                type="submit"
                disabled={!isValid || !dirty || postLoading}
                className={style.btn_submit}
              >
                Sign up
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
