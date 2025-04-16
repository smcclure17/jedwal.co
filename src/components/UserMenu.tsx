"use client";
import config from "@/config";
import { UserData } from "@/data/fetching";
import { useParams } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

interface UserMenuProps {
  orgs: any[];
  user: UserData;
}

export const UserMenu = ({ orgs, user }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);
  const menuRef = useRef(null);

  const { accountId } = useParams();
  const activeOrg = orgs.find((o) => o.account_id === accountId);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: any) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      className="relative inline-flex items-center"
      style={{ position: "relative" }}
      ref={dropdownRef}
    >
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors focus:outline-none"
      >
        <span className="text-sm font-medium">
          {user.display_name} {activeOrg ? `/ ${activeOrg.display_name}` : ""}
        </span>
        <DropDownArrow isOpen={isOpen} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg overflow-hidden transform origin-top-right transition-all duration-200 ease-out z-50 border border-gray-100"
          style={{ marginTop: "0.5rem" }}
        >
          {/* User info header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {user.display_name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          {/* Organizations section */}
          <div className="py-2">
            <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Your Organizations
            </p>

            <OrganizationRow
              url={`${config.dashUrl}/${user.id}`}
              name="Personal"
              active={!activeOrg}
            />
            {orgs.map((org) => (
              <div key={org.account_id}>
                <OrganizationRow
                  name={org.display_name}
                  url={`${config.dashUrl}/${org.account_id}`}
                  active={activeOrg && org.id === activeOrg.id}
                />
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100">
            <a
              href={`${config.dashUrl}/create-org`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Create new organization
            </a>
            <a
              href={`${config.dashUrl}/my-orgs`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Manage my organizations
            </a>
          </div>

          {user.account_status === "premium" && (
            <div className="border-t border-gray-100">
              <a
                href={`https://billing.stripe.com/p/login/${config.stripeCustPortalId}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Manage my subscription
              </a>
            </div>
          )}

          <div className="border-t border-gray-100">
            <a
              href={`${config.apiUrl}/logout`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const OrganizationRow = ({
  name,
  url,
  active = false,
}: {
  name: string;
  url: string;
  active: boolean;
}) => {
  return (
    <div className="group">
      <a
        href={url}
        className="flex px-4 py-2 hover:bg-gray-50 transition-colors"
      >
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-sm font-medium text-gray-900">{name}</p>
          </div>
          {active && (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-[#005430]">
              Active
            </span>
          )}
        </div>
      </a>
    </div>
  );
};

const DropDownArrow = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${
        isOpen ? "transform rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  );
};
