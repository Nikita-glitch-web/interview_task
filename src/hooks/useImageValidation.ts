import { useState, useCallback } from "react";
import { FormikHelpers } from "formik";

interface ImageValidationProps {
  validTypes?: string[];
  maxSize?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

const useImageValidation = ({
  validTypes = ["image/jpeg", "image/jpg", "image/png"],
  maxSize = 5 * 1024 * 1024,
  minWidth = 200,
  minHeight = 200,
  maxWidth = 5000,
  maxHeight = 5000,
}: ImageValidationProps) => {
  const [imageError, setImageError] = useState<string>("");

  const [fileName, setFileName] = useState<string>("");

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(new Error("Invalid image"));
      img.src = URL.createObjectURL(file);
    });
  };

  const validateImageSize = (file: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        if (img.width < minWidth || img.height < minHeight) {
          reject(
            new Error(
              `Image size should be at least ${minWidth}x${minHeight}px`
            )
          );
        } else if (img.width > maxWidth || img.height > maxHeight) {
          reject(
            new Error(`Image size should not exceed ${maxWidth}x${maxHeight}px`)
          );
        } else {
          resolve(true);
        }
      };
      img.onerror = () => reject(new Error("Invalid image."));
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = useCallback(
    async (file: File, setFieldValue: FormikHelpers<any>["setFieldValue"]) => {
      if (file) {
        if (!validTypes.includes(file.type)) {
          setImageError("Only JPG and PNG images are allowed.");
          setFieldValue("photo", null);
          return;
        }

        if (file.size > maxSize) {
          setImageError("Image size shouldn't exceed 5MB.");
          setFieldValue("photo", null);
          return;
        }

        try {
          await validateImage(file);
          await validateImageSize(file);
          setFieldValue("photo", file);
          setFileName(file.name);
          setImageError("");
        } catch (error: any) {
          setImageError(error.message);
          setFieldValue("photo", null);
        }
      }
    },
    [validTypes, maxSize, minWidth, minHeight, maxWidth, maxHeight]
  );

  return { imageError, fileName, handleFileChange };
};

export default useImageValidation;
