"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const apiSecret = process.env.STREAM_SECRET_KEY as string;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User no logged in");
  if (!apiKey) throw new Error("no API key");
  if (!apiSecret) throw new Error("no API secret");

  const client = new StreamClient(apiKey, apiSecret);
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issued = Math.floor(Date.now() / 1000) - 60;

  return client.createToken(user.id, exp, issued);
};
