import { FeaturesCardProps } from "@/types/feature";

export default function FeaturesCard({
  title,
  description,
  icon,
  color,
  size = "md",
}: FeaturesCardProps) {
  const colorClasses = {
    blue: {
      card: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      icon: "bg-blue-100 text-blue-600",
    },
    green: {
      card: "bg-green-50 border-green-200 hover:bg-green-100",
      icon: "bg-green-100 text-green-600",
    },
    purple: {
      card: "bg-purple-50 border-purple-200 hover:bg-purple-100",
      icon: "bg-purple-100 text-purple-600",
    },
    orange: {
      card: "bg-orange-50 border-orange-200 hover:bg-orange-100",
      icon: "bg-orange-100 text-orange-600",
    },
  };

  const boxSizes = {
    sm: "h-32 md:w-96",
    md: "h-48 md:w-96",
    lg: "h-68 md:h-60 md:w-96",
  };

  return (
    <div
      className={`flex flex-col items-start rounded-lg border-2 shadow-lg justify-start w-full  ${boxSizes[size]} p-6 transition-all duration-300 hover:shadow-xl ${colorClasses[color].card}`}
    >
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-4 ${colorClasses[color].icon}`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
        {description}
      </p>
    </div>
  );
}
