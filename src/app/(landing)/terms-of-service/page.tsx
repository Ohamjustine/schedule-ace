import React from "react";

export default function TermsOfService() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-[#7B2FF2] via-[#2998FF] to-[#00C9FF] py-12 px-4 flex items-center justify-center min-h-[250px]">
        <div className="w-[95%] md:w-[85%] flex items-center justify-center gap-10">
          <div className="flex-1 max-w-xl text-center text-white">
            <h1 className="font-bold text-3xl md:text-4xl mb-4 ">
              Terms & Conditions
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 text-sm text-gray-800">
        <h1 className="font-bold text-lg mb-2">
          Welcome to Schedule Ace. By using our app or website, you agree to the
          following terms and conditions. Please read them carefully.
        </h1>
        <hr className="my-4" />
        <section className="mb-6">
          <h2 className="font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Schedule Ace, you agree to be bound by these
            Terms and our Privacy Policy. If you do not agree with any part of
            these terms, please do not use the service.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">2. Eligibility</h2>
          <p>
            Schedule Ace is designed for students and individuals looking to
            manage academic and personal schedules. By using the app, you
            confirm that you are at least 13 years old.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">3. Use of the App</h2>
          <p>
            You agree to use Schedule Ace for lawful purposes only. You may not
            use it:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>To distribute spam or harmful content</li>
            <li>To attempt unauthorized access to the app or its systems</li>
            <li>To violate intellectual property rights</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">4. User Accounts</h2>
          <p>When you create an account, you are responsible for:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Keeping your login details confidential</li>
            <li>Providing accurate and updated information</li>
            <li>All activity that happens under your account</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">5. Intellectual Property</h2>
          <p>
            All content and materials in Schedule Ace are owned by us or our
            licensors. You may not copy, modify, or distribute any part of the
            app without our permission.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">6. Data & Privacy</h2>
          <p>
            Your privacy is important to us. Our use of your data is governed by
            our{" "}
            <a href="/privacy-policy" className="text-blue-600 underline">
              Privacy Policy
            </a>
            . By using the app, you consent to how we collect, store, and use
            your information.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">7. Modifications</h2>
          <p>
            We may update these Terms occasionally. When we do, we’ll notify you
            through the app or website. Continued use after changes means you
            accept the revised Terms.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">8. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account if you
            violate these Terms. You can also delete your account at any time
            from your profile settings.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">9. Disclaimer</h2>
          <p>
            Schedule Ace is provided “as is.” We do our best to ensure
            reliability and uptime, but we do not guarantee that the service
            will be uninterrupted or error-free.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">10. Limitation of Liability</h2>
          <p>
            We are not liable for any loss or damage arising from the use (or
            inability to use) the app — including missed tasks, deleted data, or
            schedule conflicts.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="font-semibold mb-2">11. Contact Us</h2>
          <p>
            If you have questions or concerns about these Terms, reach out to us
            at:
            <br />
            <span className="inline-block mt-1">
              <a
                href="mailto:support@scheduleace.com"
                className="text-blue-600 underline"
              >
                support@scheduleace.com
              </a>
            </span>
          </p>
        </section>
      </div>
    </>
  );
}
