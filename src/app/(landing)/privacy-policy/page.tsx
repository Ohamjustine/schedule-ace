import React from "react";

export default function PrivacyPolicy() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-[#7B2FF2] via-[#2998FF] to-[#00C9FF] py-12 px-4 flex items-center justify-center min-h-[250px]">
        <div className="w-[95%] md:w-[85%] flex items-center justify-center gap-10">
          <div className="flex-1 max-w-xl text-center text-white">
            <h1 className="font-bold text-3xl md:text-4xl mb-4 ">
              Privacy Policy
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 text-sm text-gray-800">
        <h1 className="font-bold text-lg mb-2">
          Your privacy is important to us at Schedule Ace. This Privacy Policy
          explains how we collect, use, and protect your personal information
          when you use our app or website.
        </h1>
        <p className="mb-4">
          By using Schedule Ace, you agree to the practices described here.
        </p>
        <hr className="my-4" />
        <section className="mb-6">
          <h2 className="font-semibold mb-2">1. Information We Collect</h2>
          <ol className="list-decimal ml-5 space-y-2">
            <li>
              <span className="font-medium">Account Information</span>
              <br />
              When you sign up, we collect your name, email address, and
              password.
            </li>
            <li>
              <span className="font-medium">Schedule & Task Data</span>
              <br />
              We store the tasks, bookings, updates, and events you add to your
              schedule.
            </li>
            <li>
              <span className="font-medium">Usage Data</span>
              <br />
              We collect data on how you use the app—such as screen visits,
              feature usage, and interaction patterns—to improve our service.
            </li>
            <li>
              <span className="font-medium">Device Information</span>
              <br />
              We may collect information like device type, operating system,
              browser type, and IP address for analytics and troubleshooting.
            </li>
          </ol>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Personalize and improve your experience</li>
            <li>Send you reminders and notifications (if enabled)</li>
            <li>Improve app experience and features</li>
            <li>Communicate with you for updates, feedback, or support</li>
            <li>Prevent fraud or misuse of the service</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">3. Data Sharing & Disclosure</h2>
          <p>
            We do not sell or rent your personal data.
            <br />
            We may share data with service providers or analytics partners who
            help us operate the app.
            <br />
            All third parties must follow strict data protection guidelines.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">4. Your Rights & Choices</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Access or update your personal information</li>
            <li>Delete your account and data</li>
            <li>Control notification preferences</li>
            <li>
              To make changes, go to your Profile Settings or contact us at
              support@scheduleace.com
            </li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">5. Data Security</h2>
          <p>
            We use industry-standard security practices (like encryption and
            secure servers) to protect your data from unauthorized access, loss,
            or theft.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">6. Data Retention</h2>
          <p>
            We retain your data as long as your account is active or as needed
            for essential service operation. You can delete your account to
            remove most of your data at any time.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">7. Children&apos;s Privacy</h2>
          <p>
            Schedule Ace is intended for users aged 13 and older. We do not
            knowingly collect personal data from children under 13. If we
            discover this, we will delete the information immediately.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. If changes are
            significant, we will notify you via email or in-app notice.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">9. Contact Us</h2>
          <p>
            Have questions about our privacy policy or data practices?
            <br />
            Please contact us at{" "}
            <a
              href="mailto:support@scheduleace.com"
              className="text-blue-600 underline"
            >
              support@scheduleace.com
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}
