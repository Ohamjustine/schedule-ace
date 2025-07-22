import React, { Fragment } from "react";
import { featuresData } from "../utils/data";
import FeaturesCard from "./features-card";

export default function FeaturesPage() {
  return (
    <Fragment>
      {/* Hero Section  */}
      <div className="bg-[#E7F0FD] flex items-center justify-center">
        <div className="w-[90%] md:max-w-[80%] py-16 px-4 flex flex-col items-center justify-center ">
          <h1 className="font-bold text-center max-w-3xl text-4xl">
            Everything you need to stay ahead academically and personally.
          </h1>
          <p className="text-center max-w-3xl my-7">
            Schedule Ace helps students simplify their schedules, stay
            productive, and handle life&apos;s responsibilities in and out of class.
            All in one beautifully organized planner.
          </p>
          <button className="bg-[#337AFF] text-sm cursor-pointer text-white rounded-full px-10 md:px-8 py-2">
            Get Started
          </button>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="w-[90%] md:max-w-[80%] mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((feature, index) => (
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
    </Fragment>
  );
}
