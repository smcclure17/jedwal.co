import { LogoLink } from "./NavBar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

interface DashboardHeaderProps {
  displayName: string;
  contentType: string;
  className?: string;
}

export const DashboardHeader = ({
  displayName,
  contentType,
  className = "bg-gray-100",
}: DashboardHeaderProps) => {
  return (
    <header
      className={`${className} flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <span>{displayName}</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <span>{contentType}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="opacity-65 pr-8">
          <LogoLink size="small"></LogoLink>
        </div>
      </div>
    </header>
  );
};
