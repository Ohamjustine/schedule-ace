export type TestimonialCardProps = {
  name: string;
  role: string;
  university: string;
  content: string;
  rating: number;
  avatar: string;
};

export type TestimonialSliderProps = {
  testimonials: {
    name: string;
    role: string;
    university: string;
    content: string;
    rating: number;
    avatar: string;
  }[];
};
