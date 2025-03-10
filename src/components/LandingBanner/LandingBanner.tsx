import React, { FC } from "react";
import classNames from "classnames";
import style from "./LandingBanner.module.css";
import { Link } from "../Button/ButtonLink";

export const LandingBanner: FC = () => {
  return (
    <div className={style.banner_content_box}>
      <div className={style.banner_content}>
        <div className={style.banner_text_box}>
          <h1 className={style.banner_title}>
            Test assignment for front-end developer
          </h1>
          <p className={style.bannner_text}>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as theyll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <Link href={"#signUpForm"} className={classNames(style.banner_btn)}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
