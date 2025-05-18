"use client";

import * as React from "react";
import { GalleryVerticalEnd, BookMarked, Terminal } from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUserData } from "@/data/hooks";
import { useParams } from "next/navigation";

interface AppSideBarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSideBarProps) {
  const params = useParams();
  const { accountId } = params; // this might cause mismatch somehow

  const { data: userData, error } = useUserData();
  if (error || userData === undefined) {
    return <></>;
  }

  const personalOrg = [
    {
      name: userData.display_name,
      logo: GalleryVerticalEnd,
      url: userData.id,
    },
  ];

  const userOrgs = userData.orgs.map((org) => ({
    name: org.display_name,
    logo: GalleryVerticalEnd,
    url: org.account_id,
  }));
  const orgs = [...personalOrg, ...userOrgs];

  const data = {
    projects: [
      {
        name: "APIs",
        url: `/${accountId ?? userData.id}/apis`,
        icon: Terminal,
      },
      {
        name: "Posts",
        url: `/${accountId ?? userData.id}/posts`,
        icon: BookMarked,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={orgs} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: userData.display_name,
            email: userData.email,
            avatar: "/avatars/shadcn.jpg",
            account_status: userData.account_status,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
