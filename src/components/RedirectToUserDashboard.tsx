"use client";
import config from "@/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RedirectToUserDashboard = ({ userId }: { userId: string }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(`${config.dashUrl}/${userId}`);
  }, [userId]);

  return <></>;
};

export const RedirectToUserApis = ({ userId }: { userId: string }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(`${config.dashUrl}/${userId}/apis`);
  }, [userId]);

  return <></>;
};

export const RedirectToUserPosts = ({ userId }: { userId: string }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(`${config.dashUrl}/${userId}/posts`);
  }, [userId]);

  return <></>;
};
