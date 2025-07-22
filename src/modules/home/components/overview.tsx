import { Fragment } from "react";
import Image from "next/image";

import {
  whyScheduleAceData,
  howItWorksData,
  featuresData,
  testimonialsData,
} from "../utils/data";

import WhyScheduleCard from "./why-schedule-card";
import HowItWorksCard from "./how-it-works-card";
import FeaturesCard from "../../features/components/features-card";
import TestimonialSlider from "./testimonial-slider";

export default function HomePage() {
  return (
    <Fragment>
      {/* Hero Section  */}
      <div className="bg-[#E7F0FD] flex items-center justify-center">
        <div className="w-[90%] md:max-w-[80%] py-16 md:py-24 flex flex-col md:flex-row items-start md:items-center justify-center md:justify-between ">
          <div className="flex flex-col flex-1 items-center md:items-start justify-center">
            <h1 className="font-bold text-center md:text-left text-4xl">
              Ace your schedule. <br /> Stay ahead from anywhere.
            </h1>
            <p className="text-center md:text-left my-5">
              Unleash your productivity plan smarter with Schedule Ace. Stay
              organized and in control with Tasks, Calendar, and Reminders.
              Every assignment, idea, or responsibility no matter how small
              finds its place, helping you stay ahead and stress-free.
            </p>
            <button className="bg-[#337AFF] text-sm cursor-pointer text-white rounded-full px-10 md:px-8 py-2">
              Get Started
            </button>
          </div>

          <div className="flex mt-8 md:mt-0 w-full md:w-[50%] items-center justify-end flex-1">
            <Image
              src="/assets/images/hero_image.png"
              className="w-full md:w-96 rounded-md"
              alt="hero_image"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>

      {/* Why Schedule Ace  */}
      <div className="flex flex-col items-center justify-center py-16 md:py-24">
        <h2 className="text-4xl font-bold">Why Schedule Ace?</h2>
        <div className="w-[90%] md:max-w-[80%] py-20 gap-8 flex flex-col md:flex-row items-start md:items-center justify-center md:justify-between ">
          {whyScheduleAceData.map((item, index) => (
            <WhyScheduleCard
              key={index}
              {...{
                title: item.title,
                paragraph: item.paragraph,
                color: item.color,
              }}
            />
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-[#337AFF] flex flex-col items-center justify-center py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How it Works
          </h2>
          <p className="text-gray-100 text-lg max-w-2xl mx-auto">
            Plan smarter in minutes, here&apos;s how.
          </p>
        </div>
        <div className="w-[90%] md:max-w-[80%] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative">
          {howItWorksData.map((item, index) => {
            const colors: ("blue" | "green" | "orange")[] = [
              "blue",
              "green",
              "orange",
            ];

            return (
              <div key={index} className="relative">
                {/* Connection line between steps */}
                {index < howItWorksData.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform translate-x-2 z-0"></div>
                )}

                <HowItWorksCard
                  title={item.title}
                  stepNumber={index + 1}
                  color={colors[index]}
                />

                {/* Step indicator for mobile */}
                {index < howItWorksData.length - 1 && (
                  <div className="md:hidden w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 my-4"></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <button className="bg-white font-semibold text-blue-500 px-8 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 cursor-pointer shadow-xl transform hover:-translate-y-1">
            Get Started
          </button>
        </div>
      </div>

      {/* Features Snapshot */}
      <div className="bg-white flex flex-col items-center justify-center py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Features Snapshot
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to stay organized and productive
          </p>
        </div>
        <div className="w-[90%] md:max-w-[80%] flex flex-wrap justify-between gap-6 md:gap-8">
          {featuresData.map((feature, index) => (
            <FeaturesCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
            />
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-[#E7F0FD] flex flex-col items-center justify-center py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Students Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl px-4 mx-auto">
            Real feedback from students who use Schedule Ace to stay organized,
            meet deadlines, and reduce academic stress. Hear how it makes a
            difference.
          </p>
        </div>
        <div className="w-[90%] md:max-w-[80%]">
          <TestimonialSlider testimonials={testimonialsData} />
        </div>
      </div>
    </Fragment>
  );
}
