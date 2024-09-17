import { NavBar } from "@/components/NavBar";
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
          <h1 className="text-4xl font-bold mt-8">Terms of Service</h1>
          <h2 className="text-2xl font-bold mt-8">Introduction</h2>
          <p className="mt-1">
            Welcome to Jedwal! We convert Google Sheets into JSON REST APIs to
            make building easy. By using our service, you agree to the following
            terms and conditions.
          </p>

          <h2 className="text-2xl font-bold mt-8">Acceptance of Terms</h2>
          <span className="mt-1">
            By accessing or using our app, you agree to be bound by these Terms
            of Service. If you do not agree to these terms, do not use our app.
          </span>

          <h2 className="text-2xl font-bold mt-8">User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>
              <span className="font-bold">Account Security: </span>
              You are responsible for maintaining the confidentiality of your
              credentials and for all activities that occur under your account,
              excluding actions by Jedwal as outlined in the Privacy Policy.
            </li>
            <li>
              <span className="font-bold">Authorized Access: </span>
              You must ensure that you have the necessary rights to access and
              use the Google Sheets you specify.
            </li>
            <li>
              <span className="font-bold">Compliance: </span>
              You agree to comply with all applicable laws and regulations in
              connection with your use of our service.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Prohibited Uses</h2>
          <span className="mt-1">You agree not to:</span>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>Interfere with or disrupt the service or servers.</li>
            <li>Use the service for any illegal or unauthorized purpose.</li>
            <li>
              Attempt to gain unauthorized access to any part of the service.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Intellectual Property</h2>
          <span className="mt-1">
            All content, trademarks, and data on this app, including but not
            limited to software, text, graphics, and logos, are the property of
            the app owner or its licensors and are protected by applicable
            intellectual property laws.
          </span>

          <h2 className="text-2xl font-bold mt-8">Termination</h2>
          <span className="mt-1">
            We reserve the right to terminate or suspend your access to our
            service at our sole discretion, without notice, for conduct that we
            believe violates these Terms of Service or is harmful to other
            users, us, or third parties, or for any other reason. If terminated
            with outstanding payments, you will be refunded for the remaining
            days of the month.
          </span>

          <h2 className="text-2xl font-bold mt-8">Disclaimers</h2>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>
              <span className="font-bold">No Warranty: </span>
              The service is provided &quot;as is&quot; and &quot;as
              available&quot; without any warranties of any kind, express or
              implied.
            </li>
            <li>
              <span className="font-bold">Limitation of Liability: </span>
              In no event shall we be liable for any direct, indirect,
              incidental, special, or consequential damages resulting from the
              use or inability to use the service.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Indemnification</h2>
          <span className="mt-1">
            You agree to indemnify and hold harmless Jedwal and its affiliates,
            officers, agents, and employees from any claim or demand, including
            reasonable attorneys&apos; fees, arising out of your use of the
            service or your violation of these Terms of Service.
          </span>

          <h2 className="text-2xl font-bold mt-8">Changes to Terms</h2>
          <span className="mt-1">
            We reserve the right to modify these terms at any time. If a
            revision is material, we will provide at least 14 days&apos; notice
            prior to any new terms taking effect. What constitutes a material
            change will be determined at our sole discretion.
          </span>

          <h2 className="text-2xl font-bold mt-8">Governing Law</h2>
          <span className="mt-1">
            These terms and conditions are governed by and construed in
            accordance with the laws of the United States.
          </span>
          <h2 className="text-2xl font-bold mt-8">Contact Us</h2>
          <p className="mt-1">
            If you have any questions or concerns about this Terms of Service,
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
