export const Overview = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-[#7B2FF2] via-[#2998FF] to-[#00C9FF] py-12 px-4 flex items-center justify-center min-h-[450px]">
        <div className="w-[95%] md:w-[85%] flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 max-w-xl text-left text-white">
            <h1 className="font-bold text-3xl md:text-4xl mb-4 ">
              About Schedule Ace
            </h1>
            <h2 className="font-semibold text-lg md:text-xl mb-4 ">
              Organize your student life — one smart plan at a time.
            </h2>
            <p className="mb-4 ">
              At Schedule Ace, we believe that productivity should feel simple —
              not stressful.
            </p>
            <p className="mb-4 ">
              Whether you&apos;re managing a full course load, planning your meals,
              tracking expenses, or juggling side responsibilities.
            </p>
            <p className="">
              We’re here to help you stay focused, organized, and in control.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="w-full flex flex-col items-center bg-white">
        <div className="w-[90%] md:w-[85%] mt-10 space-y-12">
          {/* Mission */}
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="w-full md:max-w-lg">
              <span className="text-sm text-[#2998FF] font-semibold">
                Mission
              </span>
              <h2 className="font-bold text-2xl mt-1 mb-2">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                To empower students with a flexible, all-in-one tool that helps
                them manage academic work and personal commitments more
                effectively one task at a time.
              </p>
            </div>
            <div className="rounded-xl w-full md:max-w-sm shadow-md bg-white p-5 mt-4 border border-gray-100">
              <span className="block text-black font-bold text-lg">
                Empowering students to take control of{" "}
                <span className="text-[#2998FF]">
                  their academic and personal lives with one smart, all-in-one
                  planning tool.
                </span>
              </span>
            </div>
          </div>

          {/* Vision */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 justify-between">
            <div className="rounded-xl w-full md:max-w-sm shadow-md bg-white p-6 border border-gray-100 flex items-center">
              <span className="font-bold text-lg text-gray-800">
                Too many tools. Too much chaos.{" "}
                <span className="text-[#2998FF]">
                  Schedule Ace brings it all together tasks, deadlines, and
                  daily life so students can stay ahead, not just keep up.
                </span>
              </span>
            </div>

            <div className="w-full text-right md:max-w-lg">
              <span className="text-sm text-[#2998FF] font-semibold">
                Vision
              </span>
              <h2 className="font-bold text-2xl mt-1 mb-2">
                Why We Built Schedule Ace?
              </h2>
              <p className="text-gray-700 mb-4">
                We saw too many students trying to balance school, life, and
                responsibilities across multiple apps, sticky notes, and
                scattered reminders.
              </p>
              <p className="text-gray-700 mb-4">
                So we built a planner that brings it all together: tasks,
                schedules, reminders, and routines in one clean, easy-to-use
                space.
              </p>
              <p className="text-gray-700">
                From assignment deadlines and group projects to transportation
                plans and personal goals, Schedule Ace gives students the
                clarity and structure they need to stay ahead not just catch up.
              </p>
            </div>
          </div>

          {/* Service  */}
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="w-full md:max-w-lg">
              <span className="text-sm text-[#2998FF] font-semibold">
                Service
              </span>
              <h2 className="font-bold text-2xl mt-1 mb-2">Who We Serve</h2>
              <p className="text-gray-700 mb-4">
                Students at every level, from secondary school to university,
                who want to stay on top of their academic workload while
                managing real-life responsibilities.
              </p>
              <p className="text-gray-700">
                Whether you&apos;re balancing lectures and assignments, planning
                meals, or organizing daily tasks, Schedule Ace helps you stay
                productive and stress-free, all in one place.
              </p>
            </div>

            <div className="w-full md:max-w-sm ">
              <div className="rounded-xl shadow-md bg-white p-6 border border-gray-100 flex items-center">
                <span className="font-bold text-lg">
                  Stay sharp, stay balanced,{" "}
                  <span className="text-[#2998FF]">All in one place.</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="w-full mt-5 py-12 px-4 flex flex-col items-center bg-white">
        <h2 className="font-bold text-2xl mb-8 text-center">Our Commitment</h2>
        <div className="w-full max-w-6xl grid md:grid-cols-3 gap-8">
          {/* Commitment Card 1 */}
          <div className="rounded-xl border-t-4 border-[#7B2FF2] bg-white shadow p-6 flex flex-col items-start">
            <span className="text-[#7B2FF2] font-bold text-lg mb-2">01</span>
            <span className="font-semibold mb-1">Simplicity first:</span>
            <span className="text-gray-700">
              Clean, student friendly design with everything you need, nothing
              you don’t.
            </span>
          </div>
          {/* Commitment Card 2 */}
          <div className="rounded-xl border-t-4 border-[#2998FF] bg-white shadow p-6 flex flex-col items-start">
            <span className="text-[#2998FF] font-bold text-lg mb-2">02</span>
            <span className="font-semibold mb-1">Privacy always:</span>
            <span className="text-gray-700">
              Your data stays yours. We never sell or share your information.
            </span>
          </div>
          {/* Commitment Card 3 */}
          <div className="rounded-xl border-t-4 border-[#00C9FF] bg-white shadow p-6 flex flex-col items-start">
            <span className="text-[#00C9FF] font-bold text-lg mb-2">03</span>
            <span className="font-semibold mb-1">Support that listens:</span>
            <span className="text-gray-700">
              We’re here when you need help or have ideas to make Schedule Ace
              better.
            </span>
          </div>
        </div>
      </section>
    </>
  );
};
