import React from "react";
import CallList from "@/app/components/CallList";

const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold"></h1>
      <CallList type=" upcoming" />
    </section>
  );
};

export default UpcomingPage;
