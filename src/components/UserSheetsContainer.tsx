"use client";

import { useState, useMemo } from "react";
import { PremiumApiCard } from "@/components/PremiumApiCard";
import { DocApiCard, ApiCard } from "@/components/ApiCard";
import { Patrick_Hand_SC } from "next/font/google";
import { Input } from "./ui/input";
import { Search, ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "@/components/ui/separator";

interface FilterableUserSheetsProps {
  apis: any[];
  accountId: string;
  disableCreate: boolean;
}

export const FilterableUserSheets = ({
  apis,
  accountId,
  disableCreate,
}: FilterableUserSheetsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("modified-desc");

  const filteredAndSortedApis = useMemo(() => {
    // First filter
    let filtered = apis;
    if (searchQuery.trim()) {
      filtered = apis.filter((sheet: any) => {
        const searchableFields = [sheet.doc_api_name, sheet.title].filter(
          Boolean
        );

        return searchableFields.some((field) =>
          field.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // Then sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "created-asc":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "created-desc":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "modified-asc":
          return (
            new Date(a.last_modified).getTime() -
            new Date(b.last_modified).getTime()
          );
        case "modified-desc":
          return (
            new Date(b.last_modified).getTime() -
            new Date(a.last_modified).getTime()
          );
        default:
          return 0;
      }
    });

    return sorted;
  }, [apis, searchQuery, sortBy]);

  return (
    <UserSheetsContainer
      apiType="docs"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      sortBy={sortBy}
      onSortChange={setSortBy}
    >
      {filteredAndSortedApis.map((sheet: any) => (
        <DocApiCard
          key={sheet.doc_api_name}
          docApiData={sheet}
          accountId={accountId}
        />
      ))}
      {disableCreate && <PremiumApiCard />}
    </UserSheetsContainer>
  );
};

type SortOption =
  | "title-asc"
  | "title-desc"
  | "created-asc"
  | "created-desc"
  | "modified-asc"
  | "modified-desc";

const patrick = Patrick_Hand_SC({
  subsets: ["latin"],
  weight: "400",
});

export interface UserSheetsListProps {
  apiType?: string;
  children?: React.ReactNode;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  sortBy?: SortOption;
  onSortChange?: (sort: SortOption) => void;
}

export const UserSheetsContainer = ({
  children,
  apiType = "sheets",
  searchQuery = "",
  onSearchChange,
  sortBy = "modified-desc",
  onSortChange,
}: UserSheetsListProps) => {
  const sortOptions =
    apiType === "sheets"
      ? [
          { value: "title-asc", label: "Title A-Z" },
          { value: "title-desc", label: "Title Z-A" },
        ]
      : [
          { value: "modified-desc", label: "Recently Modified" },
          { value: "modified-asc", label: "Oldest Modified" },
          { value: "created-desc", label: "Recently Created" },
          { value: "created-asc", label: "Oldest Created" },
          { value: "title-asc", label: "Title A-Z" },
          { value: "title-desc", label: "Title Z-A" },
        ];

  return (
    <div className="flex flex-col w-96">
      <div
        className={`font-light text-2xl ${patrick.className} space-y-1 min-w-72`}
      >
        Your {apiType === "sheets" ? "APIs" : "Posts"}
      </div>

      {/* Search and Sort Controls */}
      <div className="space-y-1 py-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={`Search ${apiType === "sheets" ? "APIs" : "Posts"}...`}
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>

        <div className="relative text-gray-500">
          <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none z-10" />
          <Select
            value={sortBy}
            onValueChange={(value) => onSortChange?.(value as SortOption)}
          >
            <SelectTrigger className="w-full pl-10 bg-white">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="my-2" />

      <div className="flex flex-col overflow-y-auto border-gray-300 py-2 max-h-96 max-w-sm space-y-2">
        {children}
      </div>
    </div>
  );
};

interface FilterableUserApisProps {
  apis: any[];
  accountId: string;
  disableCreate: boolean;
}

export const FilterableUserApis = ({
  apis,
  accountId,
  disableCreate,
}: FilterableUserApisProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("title-asc");

  const filteredAndSortedApis = useMemo(() => {
    let filtered = apis;
    if (searchQuery.trim()) {
      filtered = apis.filter((sheet: any) => {
        const searchableFields = [
          sheet.sheet_api_name,
          sheet.spreadsheet_title,
        ].filter(Boolean);

        return searchableFields.some((field) =>
          field.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // Then sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "title-asc":
          return (a.title || a.sheet_api_name).localeCompare(
            b.title || b.sheet_api_name
          );
        case "title-desc":
          return (b.title || b.sheet_api_name).localeCompare(
            a.title || a.sheet_api_name
          );
        default:
          return 0;
      }
    });

    return sorted;
  }, [apis, searchQuery, sortBy]);

  return (
    <UserSheetsContainer
      apiType="sheets"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      sortBy={sortBy}
      onSortChange={setSortBy}
    >
      {filteredAndSortedApis.map((sheet: any) => (
        <ApiCard
          key={sheet.sheet_api_name}
          apiData={sheet}
          accountId={accountId}
        />
      ))}
      {disableCreate && <PremiumApiCard />}
    </UserSheetsContainer>
  );
};
