import React, { FC } from "react";
import Image from "next/image";
import styles from "./Preloader.module.css";
import img from "../../../public/images/Preloader.webp";

export const Preloader: FC = () => {
  return (
    <div className={styles.preloader}>
      <Image
        className={styles.loader}
        src={img}
        alt="Loading..."
        width={100}
        height={100}
        priority
      />
    </div>
  );
};
