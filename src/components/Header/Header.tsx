/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { FC } from "react";
import style from "./Header.module.css";
import { Link } from "../Button/ButtonLink";
import Image from "next/image";

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <header className={style.header_wrapper}>
      <div className={style.header_content}>
        <div className={style.header_logo_box}>
          <div className={style.header_logo_wrapper}>
            <Image
              src="/images/header_logo.webp"
              alt="Logo"
              width="39"
              height="26"
            />
          </div>
          <h1 className={style.header_logo_text}>TESTTASK</h1>
        </div>
        <div className={style.header_nav_wrapper}>
          <div className={style.header_btn_wrapper}>
            <Link href="#teamMembers" className={style.test}>
              Users
            </Link>
          </div>
          <div className={style.header_btn_wrapper}>
            <Link href="#signUpForm" className={style.test}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
