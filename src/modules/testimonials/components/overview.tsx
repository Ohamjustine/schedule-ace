import TestimonialCard from "@/modules/home/components/testimonial-card";
import { testimonialsData } from "@/modules/home/utils/data";

export const Overview = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-[#00BFA6] via-[#00BFA6] to-[#00C9FF] py-12 px-4 flex items-center justify-center min-h-[350px]">
        <div className="w-[95%] md:w-[85%] flex items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center max-w-xl text-left text-white">
            <h1 className="font-bold text-xl text-center md:text-4xl mb-4 ">
              What Student&apos;s Are Saying
            </h1>

            <p className="mb-4 text-sm md:text-md text-center">
              Real voices. Real results.See how Schedule Ace is helping students
              stay organized, reduce stress, and take control of their busy
              lives in school and beyond.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 px-4 flex items-center justify-center">
        <div className="w-[95%] md:w-[85%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-5">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="w-full">
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
