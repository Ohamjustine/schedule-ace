"use client";

import { TestimonialCardProps } from "@/types/testimonial";
import Image from "next/image";

export default function TestimonialCard({
  name,
  role,
  university,
  content,
  rating,
  avatar,
}: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="text-yellow-400">
        {index < rating ? "★" : "☆"}
      </span>
    ));
  };

  // Check if the avatar is an external URL (Avataaars)
  const isExternalAvatar = avatar.includes('avataaars.io');

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border border-gray-100 hover:shadow-md transition-all duration-300 h-[300px] flex flex-col">
      {/* Rating */}
      <div className="flex mb-4 text-lg">{renderStars(rating)}</div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-gray-700 leading-relaxed mb-6 italic">&apos;{content}&apos;</p>
      </div>

      {/* Author */}
      <div className="flex items-center mt-auto">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          {isExternalAvatar ? (
            <img
              src={avatar}
              alt={name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to a default avatar if the external image fails to load
                const target = e.target as HTMLImageElement;
                target.src = `https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light`;
              }}
            />
          ) : (
            <Image
              src={avatar}
              alt={name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
          <p className="text-xs text-gray-500">{university}</p>
        </div>
      </div>
    </div>
  );
}
