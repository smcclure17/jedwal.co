import { NavBar } from "@/components/NavBar";

import { Patrick_Hand } from "next/font/google";
import { getUserData } from "@/data/fetching";
import config from "@/config";
import { OrganizationForm } from "@/components/OrganizationForm";
import { ErrorScreen } from "@/components/ErrorScreen";
import { NotLoggedInScreen } from "@/components/NotLoggedInScreen";
import { BetaDisclaimerBanner } from "@/components/BetaDisclaimerBanner";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export default async function CreateOrg() {
  const userResult = await getUserData();
  if (userResult.status === "logged_out") return <NotLoggedInScreen />;
  if (userResult.status === "error") return <ErrorScreen />;

  const Header = () => {
    return (
      <header className="bg-gray-100 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Organizations</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Create</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
    );
  };

  if (userResult.data.account_status === "free") {
    return (
      <>
        <Header></Header>
        <main className="flex justify-center">
          <div className={`flex flex-col sm:w-3/4 pt-4`}>
            <div className="max-w-2xl mt-8">
              <BetaDisclaimerBanner />
              <h1 className={`${patrick.className} text-4xl text-gray-500`}>
                Sorry, you must have premium to create an organization :(
              </h1>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header></Header>
      <main className="flex justify-center">
        <div className={`flex flex-col sm:w-3/4 pt-4`}>
          <div className="max-w-2xl mt-8">
            <BetaDisclaimerBanner />
            <h1 className={`${patrick.className} text-4xl text-[#005430]`}>
              Create a new organization
            </h1>
            <div className="mt-6">
              <OrganizationForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
