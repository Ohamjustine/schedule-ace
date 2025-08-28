// Utility function to generate random Avataaars URLs with different skin and hair colors
const generateAvatarUrl = (gender: 'man' | 'woman'): string => {
  const hairColors = [
    'Auburn',
    'Black',
    'Blonde',
    'BlondeGolden',
    'Brown',
    'BrownDark',
    'PastelPink',
    'Platinum',
    'Red',
    'SilverGray'
  ];
  
  const skinColors = [
    'Tanned',
    'Yellow',
    'Pale',
    'Light',
    'Brown',
    'DarkBrown',
    'Black'
  ];
  
  // Randomly select hair and skin colors
  const hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
  const skinColor = skinColors[Math.floor(Math.random() * skinColors.length)];
  
  // Choose top type based on gender
  const topType = gender === 'woman' ? 'LongHairStraight' : 'ShortHairShortFlat';
  
  // Build the URL with the base parameters and random colors
  return `https://avataaars.io/?avatarStyle=Circle&topType=${topType}&accessoriesType=Blank&hairColor=${hairColor}&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=${skinColor}`;
};

export const whyScheduleAceData = [
  {
    title: "🔔 Smart Reminders",
    paragraph:
      "Never miss a class, test, or deadline again. Set it once we'll keep you on track.",
    color: "blue" as const,
  },
  {
    title: "📅 Visual Scheduling",
    paragraph:
      "A sleek calendar made for students. View your week, plan your study blocks, and adjust with ease.",
    color: "green" as const,
  },
  {
    title: "📚 Course Based Organization",
    paragraph:
      "Sort tasks by subject, priority, or deadline. Stay in control of your academic life.",
    color: "purple" as const,
  },
  {
    title: "📈 Focus on What Matters",
    paragraph:
      "Clear dashboards and daily views help you prioritize what's urgent and what's important.",
    color: "orange" as const,
  },
];

export const howItWorksData = [
  {
    title: "Add your Courses and Class times",
  },
  {
    title: "Schedule assignments, exams and study sessions",
  },
  {
    title: "Get reminded and stay focused everyday",
  },
];

export const featuresData = [
  {
    title: "Weekly Planner View",
    description:
      "See your full week at a glance — tasks, classes, and deadlines all in one place.",
    icon: "📅",
    color: "blue" as const,
  },
  {
    title: "Task Modal",
    description:
      "Quickly add assignments with subject tags, due dates, and priority levels.",
    icon: "✏️",
    color: "green" as const,
  },
  {
    title: "Mobile & Desktop Friendly",
    description: "Plan and manage your schedule anywhere, anytime.",
    icon: "📱",
    color: "purple" as const,
  },
  {
    title: "Study Timer",
    description:
      "Stay focused with a built-in Pomodoro-style timer for deep work sessions.",
    icon: "⏰",
    color: "orange" as const,
  },
  {
    title: "Offline Access",
    description:
      "Stay productive even without internet — your schedule stays with you.",
    icon: "☁️",
    color: "blue" as const,
  },
  {
    title: "Calendar Sync",
    description:
      "Get a Syncronized calendar to keep all your events in one place.",
    icon: "📱",
    color: "orange" as const,
  },
];

export const testimonialsData = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    university: "Stanford University",
    content:
      "Schedule Ace transformed how I manage my coursework. The weekly planner view is exactly what I needed to stay on top of multiple projects and deadlines.",
    rating: 5,
    avatar: generateAvatarUrl("woman"),
  },
  {
    name: "Michael Chen",
    role: "Engineering Student",
    university: "MIT",
    content:
      "The study timer feature is a game-changer. I've improved my focus sessions and my grades have never been better. Highly recommend!",
    rating: 5,
    avatar: generateAvatarUrl("man"),
  },
  {
    name: "Emily Rodriguez",
    role: "Business Student",
    university: "Harvard University",
    content:
      "Finally, a scheduling app that understands student life. The task modal makes adding assignments so quick, and the reminders keep me from missing anything important.",
    rating: 5,
    avatar: generateAvatarUrl("woman"),
  },
  {
    name: "David Kim",
    role: "Medical Student",
    university: "Johns Hopkins",
    content:
      "Between classes, clinical rotations, and study sessions, I was always overwhelmed. Schedule Ace helped me organize everything and actually find time for myself.",
    rating: 5,
    avatar: generateAvatarUrl("man"),
  },
  {
    name: "Lisa Thompson",
    role: "Psychology Student",
    university: "UCLA",
    content:
      "The visual scheduling feature is incredible. I can see my entire week at a glance and plan my study sessions around my classes perfectly.",
    rating: 5,
    avatar: generateAvatarUrl("woman"),
  },
  {
    name: "Alex Martinez",
    role: "Art History Student",
    university: "NYU",
    content:
      "As someone who juggles multiple creative projects, Schedule Ace helps me stay organized without feeling overwhelmed. The interface is beautiful and intuitive.",
    rating: 5,
    avatar: generateAvatarUrl("man"),
  },
];
