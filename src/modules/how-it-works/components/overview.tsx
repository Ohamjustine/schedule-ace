import FeaturesCard from "@/modules/features/components/features-card";
import { Fragment } from "react";
import { howItWorksFeatureData } from "../utils/data";

export default function HowItWorksPage() {
  return (
    <Fragment>
      {/* Hero Section  */}
      <div className="bg-[#E7F0FD] flex items-center justify-center">
        <div className="w-[90%] md:max-w-[80%] py-16 px-4 flex flex-col items-center justify-center ">
          <h1 className="font-bold text-center max-w-3xl text-4xl">
            How It Works.
          </h1>
          <p className="text-center max-w-2xl my-7">
            One planner. Every part of your student life. <br />
            Schedule Ace makes it easy for students to stay organized not just
            with schoolwork, but with everything else life throws at them.{" "}
          </p>
          <span className="text-center">
            <b>Here&apos;s how it works in three simple steps:</b>
          </span>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="w-[90%] md:max-w-[80%] mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {howItWorksFeatureData.map((feature, index) => (
            <FeaturesCard
              key={index}
              {...{
                title: feature.title,
                description: feature.description,
                icon: feature.icon,
                color: feature.color,
                size: "lg",
              }}
            />
          ))}
        </div>
      </div>

      {/* Banner Section */}
      <div className="bg-blue-500 py-16">
        <div className="w-[90%] md:max-w-[80%] mx-auto px-4">
          <div className="text-white p-8 ">
            <div className="flex items-center justify-center mb-6">
              <span className="text-2xl mr-2">💡</span>
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                It&apos;s More Than a School Planner
              </h2>
            </div>

            <div className="max-w-xl mx-auto">
              <p className="text-lg font-semibold mb-6">
                Schedule Ace helps you manage:
              </p>

              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className=" mr-3 mt-1">•</span>
                  <span>Assignments & Class Schedules</span>
                </li>
                <li className="flex items-start">
                  <span className=" mr-3 mt-1">•</span>
                  <span>Meal Planning & Errands</span>
                </li>
                <li className="flex items-start">
                  <span className=" mr-3 mt-1">•</span>
                  <span>Transport Routes & Budgeting Tasks</span>
                </li>
                <li className="flex items-start">
                  <span className=" mr-3 mt-1">•</span>
                  <span>Personal Projects, Side Hustles & Habits</span>
                </li>
              </ul>

              <p className="text-lg font-medium mt-8">
                Because student life is more than just schoolwork.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
