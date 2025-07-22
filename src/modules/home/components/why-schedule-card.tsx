import { WhyScheduleCardProps } from "@/types/home";

export default function WhyScheduleCard({
  title,
  paragraph,
  color = "blue",
}: WhyScheduleCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    green: "bg-green-50 border-green-200 hover:bg-green-100",
    purple: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    orange: "bg-orange-50 border-orange-200 hover:bg-orange-100",
  };

  return (
    <div
      className={`flex flex-col items-center rounded-lg border-2 shadow-lg justify-center w-full md:w-80 h-60 p-6 transition-all duration-300 hover:shadow-xl ${colorClasses[color]}`}
    >
      <h3 className="text-lg text-center font-semibold mb-3">{title}</h3>
      <p className="text-center text-gray-700 leading-relaxed">{paragraph}</p>
    </div>
  );
}
