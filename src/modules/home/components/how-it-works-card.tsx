import { HowItWorksCardProps } from "@/types/home";

export default function HowItWorksCard({
  title,
  stepNumber,
  color,
}: HowItWorksCardProps) {
  const colorClasses = {
    blue: {
      card: "bg-blue-50 border-blue-200",
      step: "from-blue-500 to-blue-600",
      accent: "from-blue-400 to-blue-500",
    },
    green: {
      card: "bg-emerald-50 border-emerald-200",
      step: "from-emerald-500 to-emerald-600",
      accent: "from-emerald-400 to-emerald-500",
    },
    purple: {
      card: "bg-violet-50 border-violet-200",
      step: "from-violet-500 to-violet-600",
      accent: "from-violet-400 to-violet-500",
    },
    orange: {
      card: "bg-orange-50 border-orange-200",
      step: "from-orange-500 to-orange-600",
      accent: "from-orange-400 to-orange-500",
    },
  };

  return (
    <div className="flex flex-col items-center text-center w-full md:max-w-xs relative group">
      {/* Step card */}
      <div
        className={`relative z-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-8 border-2 ${colorClasses[color].card}`}
      >
        {/* Step number with gradient */}
        <div
          className={`w-16 h-16 bg-gradient-to-br ${colorClasses[color].step} text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 mx-auto shadow-lg`}
        >
          {stepNumber}
        </div>

        {/* Step title */}
        <h3 className="text-xl font-semibold mb-4 text-gray-800 leading-tight">
          {title}
        </h3>

        {/* Decorative element */}
        <div
          className={`w-12 h-1 bg-gradient-to-r ${colorClasses[color].accent} rounded-full mx-auto mt-4`}
        ></div>
      </div>
    </div>
  );
}
