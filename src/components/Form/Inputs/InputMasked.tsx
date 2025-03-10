import React, { ChangeEvent, FC, useEffect, useRef } from "react";
import IMask from "imask";
import { Input } from "./Input";
import styles from "./Input.module.css";
import { InputProps } from "../types/types";

export const InputMasked: FC<InputProps> = ({
  value,
  onFocus,
  onBlur,
  onChange,
  name,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      const maskOptions = {
        mask: "+380 (00) 000-00-00",
      };

      const mask = IMask(inputRef.current, maskOptions);

      mask.on("accept", () => {
        if (onChange && inputRef.current) {
          const event = new Event("input", {
            bubbles: true,
          }) as unknown as ChangeEvent<HTMLInputElement>;
          Object.defineProperty(event, "target", {
            value: { value: mask.value },
            writable: true,
          });
          onChange(event);
        }
      });

      return () => mask.destroy();
    }
  }, [onChange]);

  return (
    <div>
      <Input
        ref={inputRef}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        name={name}
        placeholder="Phone"
        {...rest}
      />
      <label className={styles.label_phone} htmlFor="phone">
        +38 (XX) XXX - XX - XX
      </label>
    </div>
  );
};
