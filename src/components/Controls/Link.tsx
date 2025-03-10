// eslint-disable-next-line no-unused-vars
import React, { FC, ReactNode } from "react";
import style from "./Button.module.css";

interface LinkProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "reset";
  className: string;
  href: string;
}

export const Link: FC<LinkProps> = ({
  children,
  onClick,
  disabled,
  type,
  className,
  href
}) => {
  const classNames = [style.button, className].join(' ');

  return (
    <a 
      className={classNames}
      href={href}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {children}
    </a>
  );
};

export default Link;
