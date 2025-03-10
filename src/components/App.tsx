"use client";

import { Header } from "@/components/Header/Header";
import { LandingBanner } from "@/components/LandingBanner/LandingBanner";
import { TeamMembers } from "@/components/TeamMembers/TeamMembers";
import "../styles/App.css";
import { Form } from "@/components/Form/Form";

export default function App() {
  return (
    <div className="content">
      <Header />
      <div className="content_wrapper">
        <LandingBanner />
        <TeamMembers />
        <Form />
      </div>
    </div>
  );
}
