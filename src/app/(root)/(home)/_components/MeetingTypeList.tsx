"use client";
import Image from "next/image";
import HomeCard from "@/app/(root)/(home)/_components/HomeCard";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting " | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  return (
    <section className="grid grid-col-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meting"
        description="Start and intant meeting"
        handleClick={() => {
          setMeetingState("isJoiningMeeting");
        }}
        className="bg-orange-1"
      />{" "}
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meting"
        description="Plan your meeting"
        handleClick={() => {
          setMeetingState("isScheduleMeeting ");
        }}
        className="bg-blue-1"
      />{" "}
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Checkout your recordings"
        handleClick={() => {
          setMeetingState("isJoiningMeeting");
        }}
        className="bg-purple-1"
      />{" "}
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meting"
        description="via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-yellow-1"
      />
    </section>
  );
};

export default MeetingTypeList;
