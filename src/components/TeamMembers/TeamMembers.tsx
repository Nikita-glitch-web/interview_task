import React, { FC, useState, useEffect } from "react";
import classNames from "classnames";
import style from "./TeamMembers.module.css";
import { Preloader } from "../Preloader/Preloader";
import { Button } from "../Button/Button";
import { API_BASE_URL } from "@/config/constans";

interface TeamMember {
  id: number;
  photo: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  registration_timestamp: number;
}

export const TeamMembers: FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMembers(page);
  }, []);

  const fetchMembers = async (currentPage: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/users?page=${currentPage}&count=6`
      );
      const data = await response.json();

      if (data.success) {
        const newMembers = data.users;

        if (newMembers.length > 0) {
          setMembers((prev) =>
            [...prev, ...newMembers].sort(
              (a, b) => b.registration_timestamp - a.registration_timestamp
            )
          );
        } else {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMembers(nextPage);
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = "https://placehold.co/80x80?text=Oopss...";
    event.currentTarget.className = style.member_photo;
  };

  return (
    <div id="teamMembers" className={style.team_members}>
      <h2 className={style.members_title}>Working with GET request</h2>
      <div className={style.members_grid}>
        <ul className={style.members_list}>
          {members.map((member) => (
            <li key={member.id} className={style.member_card}>
              <div className={style.member_text_wrapper}>
                <img
                  src={member.photo}
                  alt={member.name}
                  className={classNames(style.member_photo, {
                    [style.error_photo]: !member.photo,
                  })}
                  onError={handleImageError}
                />
                <p className={style.member_title}>{member.name}</p>
                <p className={style.member_text}>{member.position}</p>
                <p className={style.member_text}>{member.email}</p>
                <p className={style.member_text}>{member.phone}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {loading && <Preloader />}
      {error && <div>Error: {error.message}</div>}
      <div className={style.btn_wrapper}>
        {hasMore && !loading && (
          <Button onClick={handleShowMore}>Show more</Button>
        )}
      </div>
    </div>
  );
};
