"use client";
import Image from "next/image";
import HomeCard from "@/app/(root)/(home)/_components/HomeCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "@/app/(root)/(home)/_components/MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting " | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [details, setDetails] = useState<Call>();

  const { toast } = useToast();
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and a time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to Create new call ");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting ";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created!!",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to create meeting",
      });
    }
  };
  return (
    <section className="grid grid-col-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meting"
        description="Start and intant meeting"
        handleClick={() => {
          setMeetingState("isInstantMeeting");
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
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
