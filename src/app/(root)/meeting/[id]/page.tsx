"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";

const Meeting = ({ params }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  return (
    <main className="h-screen w-full ">
      <StreamCall>
        <StreamTheme>
          {!isSetupComplete ? "meeting setup" : "Meeting Room"}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
