// @ts-nocheck
"use client";
import React, { useState } from "react";
import { useGetCalls } from "@/hooks/useGetCalls";
import { useRouter } from "next/navigation";
import { CallRecording } from "@stream-io/video-client";
import { Call } from "@stream-io/video-react-sdk";
import MeetingCard from "@/components/MeetingCard";
import Loader from "@/app/components/Loader";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recording" }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recording":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };
  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "recording":
        return "No Recorded Calls";
      case "upcoming":
        return "No Upcoming Calls";
      default:
        return " ";
    }
  };
  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();
  if (isLoading) return <Loader />;
  return (
    <div className="grid gird-cols-1 gap-5 xl:gird-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            title={
              (meeting as Call).state.custom.description.substring(0, 35) ||
              "No Description"
            }
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                  ? "/icons/upcoming.svg"
                  : "/icons/recordings.svg"
            }
            date={
              meeting.state.startsAt.toLocaleString() ||
              meeting.start_time.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recording" ? "/icons/play.sfg" : undefined}
            buttonText={type === "recording" ? "Play Now" : "Start"}
            link={
              type === "recording "
                ? meeting.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
            }
            handleClick={
              type === "recording"
                ? () => router.push(`${meeting.url}`)
                : () => router.push(`/meeting/${meeting.id}}`)
            }
            key={(meeting as Call)?.id}
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
