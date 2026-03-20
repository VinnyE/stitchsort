import type { QuizStep } from "../types/quiz";

export const quizSteps: QuizStep[] = [
  {
    id: "experience",
    title: "What's your sewing experience?",
    subtitle:
      "Your skill level helps us recommend the right complexity of controls and features.",
    categoryLabel: "Skill Assessment",
    selectionMode: "single",
    layout: "uniform",
    columns: 2,
    options: [
      {
        id: "beginner",
        icon: "spa",
        title: "Complete Beginner",
        description:
          "Never used a sewing machine or just starting to explore the craft.",
      },
      {
        id: "intermediate",
        icon: "trending_up",
        title: "Intermediate",
        description:
          "Comfortable with basic stitches and simple garment construction.",
      },
      {
        id: "advanced",
        icon: "architecture",
        title: "Advanced",
        description:
          "Experienced with complex patterns, tailoring, and multiple techniques.",
      },
      {
        id: "professional",
        icon: "workspace_premium",
        title: "Professional",
        description:
          "Sewing is your livelihood. You need reliability and precision daily.",
      },
    ],
  },
  {
    id: "fabrics",
    title: "What fabrics will you use most?",
    subtitle:
      "Selecting your primary materials helps us calibrate the motor torque and needle recommendations.",
    categoryLabel: "Material Compatibility",
    selectionMode: "multi",
    layout: "bento",
    columns: 6,
    options: [
      {
        id: "cotton-linen",
        icon: "eco",
        title: "Cotton & Linen",
        description:
          "Natural, breathable fibers perfect for dressmaking and light home decor.",
      },
      {
        id: "denim-canvas",
        icon: "layers",
        title: "Denim & Canvas",
        description:
          "Heavy-duty textiles requiring robust piercing power and reinforced seams.",
      },
      {
        id: "knits-stretch",
        icon: "texture",
        title: "Knits & Stretch",
        description: "Jersey, spandex, and activewear with high elasticity.",
      },
      {
        id: "specialty",
        icon: "diamond",
        title: "Specialty",
        description: "Leather, vinyl, and technical outdoor fabrics.",
      },
      {
        id: "mixed",
        icon: "grid_view",
        title: "Mixed",
        description: "An even blend of various weight and fiber types.",
      },
    ],
  },
  {
    id: "projects",
    title: "What will you create?",
    subtitle:
      "Your primary projects determine which stitch library and accessories matter most.",
    categoryLabel: "Project Planning",
    selectionMode: "multi",
    layout: "uniform",
    columns: 3,
    options: [
      {
        id: "garments",
        icon: "checkroom",
        title: "Garments & Apparel",
        description: "Dresses, shirts, pants, and custom clothing.",
      },
      {
        id: "quilting",
        icon: "grid_on",
        title: "Quilting",
        description: "Patchwork, free-motion quilting, and layered fabric art.",
      },
      {
        id: "home-decor",
        icon: "curtains",
        title: "Home Decor",
        description: "Curtains, pillows, table linens, and upholstery.",
      },
      {
        id: "repairs",
        icon: "handyman",
        title: "Repairs & Alterations",
        description: "Hemming, patching, and adjusting existing garments.",
      },
      {
        id: "crafts",
        icon: "palette",
        title: "Crafts & Accessories",
        description: "Bags, hats, toys, and decorative projects.",
      },
      {
        id: "embroidery",
        icon: "draw",
        title: "Embroidery",
        description: "Decorative stitching, monogramming, and thread artwork.",
      },
    ],
  },
  {
    id: "features",
    title: "Which features matter most?",
    subtitle:
      "Prioritize the capabilities that will enhance your workflow and creativity.",
    categoryLabel: "Feature Priority",
    selectionMode: "multi",
    layout: "uniform",
    columns: 3,
    options: [
      {
        id: "auto-threader",
        icon: "precision_manufacturing",
        title: "Auto Needle Threader",
        description: "One-step threading saves time and reduces frustration.",
      },
      {
        id: "speed-control",
        icon: "speed",
        title: "Speed Control",
        description:
          "Variable speed slider for precise control on delicate work.",
      },
      {
        id: "stitch-variety",
        icon: "auto_awesome",
        title: "Stitch Variety",
        description: "Large library of decorative and utility stitch patterns.",
      },
      {
        id: "heavy-duty",
        icon: "fitness_center",
        title: "Heavy-Duty Power",
        description: "Strong motor for piercing thick layers of fabric.",
      },
      {
        id: "quiet-operation",
        icon: "volume_off",
        title: "Quiet Operation",
        description:
          "Low noise level for apartment living or late-night sewing.",
      },
      {
        id: "portability",
        icon: "luggage",
        title: "Lightweight & Portable",
        description: "Easy to carry to classes, retreats, or different rooms.",
      },
    ],
  },
  {
    id: "budget",
    title: "What's your budget range?",
    subtitle:
      "We'll find the best value machine within your comfortable spending range.",
    categoryLabel: "Investment Level",
    selectionMode: "single",
    layout: "uniform",
    columns: 2,
    options: [
      {
        id: "entry",
        icon: "savings",
        title: "Under $150",
        description: "Entry-level machines perfect for learning or light use.",
      },
      {
        id: "mid",
        icon: "account_balance",
        title: "$150 - $250",
        description: "Great balance of features and value for regular sewists.",
      },
      {
        id: "premium",
        icon: "diamond",
        title: "$250 - $500",
        description:
          "Advanced features and build quality for serious crafters.",
      },
      {
        id: "professional",
        icon: "workspace_premium",
        title: "$500+",
        description: "Professional-grade machines with top-tier capabilities.",
      },
    ],
  },
  {
    id: "workspace",
    title: "Describe your sewing space",
    subtitle:
      "Your workspace affects our recommendations for machine size and noise level.",
    categoryLabel: "Environment",
    selectionMode: "single",
    layout: "uniform",
    columns: 2,
    options: [
      {
        id: "dedicated",
        icon: "house",
        title: "Dedicated Sewing Room",
        description:
          "A permanent setup with plenty of table space and storage.",
      },
      {
        id: "shared",
        icon: "meeting_room",
        title: "Shared / Multi-Use Space",
        description:
          "Kitchen table or shared room where the machine gets stored away.",
      },
      {
        id: "small",
        icon: "apartment",
        title: "Small Apartment",
        description:
          "Limited space where a compact, quiet machine is essential.",
      },
      {
        id: "portable",
        icon: "flight",
        title: "On-the-Go",
        description:
          "You travel to classes, retreats, or sewing meetups regularly.",
      },
    ],
  },
  {
    id: "preferences",
    title: "Any brand preferences?",
    subtitle:
      "Optional: let us know if you have brand loyalty or specific aversions.",
    categoryLabel: "Brand Affinity",
    selectionMode: "multi",
    layout: "uniform",
    columns: 3,
    options: [
      {
        id: "brother",
        icon: "star",
        title: "Brother",
        description: "Known for beginner-friendly, feature-rich machines.",
      },
      {
        id: "singer",
        icon: "star",
        title: "Singer",
        description: "Heritage brand with strong mechanical options.",
      },
      {
        id: "janome",
        icon: "star",
        title: "Janome",
        description: "Precision engineering favored by quilters.",
      },
      {
        id: "bernina",
        icon: "star",
        title: "Bernina",
        description: "Swiss luxury with outstanding stitch quality.",
      },
      {
        id: "juki",
        icon: "star",
        title: "Juki",
        description: "Industrial heritage for professional-grade sewing.",
      },
      {
        id: "no-preference",
        icon: "shuffle",
        title: "No Preference",
        description: "Show me the best match regardless of brand.",
      },
    ],
  },
];
