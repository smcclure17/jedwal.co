import { NavBar } from "@/components/NavBar";
import Link from "next/link";
import Image from "next/image";

export default function PrivacyPage() {
  return (
    <main className="space-y-14">
      <div className="flex flex-col px-48 pt-4 pb-24">
        <NavBar />

        <div className="max-w-2xl mt-24">
          <Image
            src="/logo-cropped.svg"
            alt="Jedwal Logo"
            width={100}
            height={100}
          />
          <h1 className="text-4xl font-bold mt-8">Privacy Policy</h1>
          <h2 className="text-2xl font-bold mt-8">Introduction</h2>
          <p className="mt-1">
            We respect your privacy and are committed to protecting it. This
            Privacy Policy explains how Jedwal handles your information.
          </p>

          <h2 className="text-2xl font-bold mt-8">Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>
              <span className="font-bold">Google Sheets Access: </span>
              For ease of integration, we require view access to all your Google
              Sheets. However, we will only ever access the content of sheets
              you have explicitly requested us to.
            </li>
            <li>
              <span className="font-bold">Credentials: </span>
              We use your Google OAuth access and refresh tokens to fetch the
              content of the specified sheets. These credentials are encrypted
              at rest, finely scoped, and follow the principle of least
              privilege.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>
              <span className="font-bold">Fetching Data: </span>
              We use your credentials solely to access and convert your
              specified Google Sheets into JSON data.
            </li>
            <li>
              <span className="font-bold">Storing Data: </span>
              The data from your Google Sheets is processed and provided to you
              as JSON. We do not persist any of this data in long-term storage,
              however, we may cache it temporarily to improve performance.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Data Security</h2>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>
              <span className="font-bold">Credential Storage: </span>
              Your credentials are stored securely and are used only for
              accessing your specified Google Sheets. The credentials are
              encrypted, and only allow view access to Google Sheets.
            </li>
            <li>
              <span className="font-bold">Data Protection: </span>
              We implement industry-standard measures to protect your data from
              unauthorized access, alteration, or disclosure. Including but not
              limited to, encryption, access control, regular security audits,
              and open-sourcing.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">User Rights</h2>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>
              <span className="font-bold">Access and Control: </span>
              You can revoke our access to your Google Sheets at any time
              through your Google account settings. See Google&apos;s{" "}
              <Link
                href="https://support.google.com/accounts/answer/13533235?hl=en"
                className="text-blue-500"
              >
                help article on managing third-party apps
              </Link>
              .
            </li>
            <li>
              <span className="font-bold">Deletion: </span>
              You can request the deletion of your credentials and data from our
              system at any time. Please contact us at{" "}
              <a
                href="mailto:sean.mcclure17@gmail.com"
                className="text-blue-500"
              >
                sean.mcclure17@gmail.com
              </a>
              .
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Third-Party Services</h2>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>
              We do not share your data with third parties except as necessary
              to comply with legal obligations.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Contact Us</h2>
          <p className="mt-1">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at{" "}
            <a href="mailto:sean.mcclure17@gmail.com" className="text-blue-500">
              sean.mcclure17@gmail.com
            </a>
            .
          </p>
          <p className="mt-1">Effective Date: 2024-08-01</p>
        </div>
      </div>
    </main>
  );
}
