import { AppLanding } from "@/components/AppLanding";
import { DashboardHeader } from "@/components/DashboardHeader";

export default function DashboardHome() {
    return (
      <>
        <DashboardHeader
          contentType=""
          displayName=""
          className="white"
        ></DashboardHeader>

        <main className="sm:block flex flex-col mx-auto sm:w-3/4 px-4 pt-4">
          <AppLanding></AppLanding>
        </main>
      </>
    );
}
