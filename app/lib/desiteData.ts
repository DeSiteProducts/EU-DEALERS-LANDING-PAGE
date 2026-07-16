export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Mission", href: "#mission" },
  { label: "Videos", href: "#videos" },
  { label: "Stories", href: "#stories" },
  { label: "Downloads", href: "#downloads" },
  
];

export const differenceItems = [
  {
    icon: "warranty",
    title: "5-Year Structural Warranty",
    text: "Built with long-term value in mind.",
  },
  {
    icon: "sizes",
    title: "Three screener sizes",
    text: "56 Mini, 68 Pro, and 78 Grizzly.",
  },
  {
    icon: "portability",
    title: "Compact and portable",
    text: "Easy to move, stage, and use on real jobsites.",
  },
  {
    icon: "feedback",
    title: "Contractor feedback",
    text: "Designed from real-world operator input.",
  },
  {
    icon: "roi",
    title: "High resale value and ROI",
    text: "A practical equipment investment for working crews.",
  },
];
export type ProductVideo = {
  id: string;
  title: string;
};

export type DesiteProduct = {
  name: string;
  detailVariant?: string;
  description?: string[];
  imageAlt?: string;
  images: string[];
  proscreenHighlights?: {
    label: string;
    value: string;
  }[];
  videos?: ProductVideo[];
  materials?: string[];
  features?: string[];
  specs?: string;
  capacity?: string;
  equipment?: string;
  applications?: string;
  specSheet?: string;
  SuggestedRetailPrice?: string;
  CostforStockingDealers?: string; 
};

export const products: DesiteProduct[] = [
  {
    name: "68V Vibratory Mini Screener",
    detailVariant: "DeSite ProScreen",
    imageAlt: "DeSite 68 ProScreen screener product photo",
    images: [
      "/images/68/1.png",
      "/images/68/2.png",
      "/images/68/3.png",
      "/images/68/4.png",
      "/images/68/5.png",
      "/images/68/6.png",
      "/images/68/7.png",
      "/images/68/8.png",
      "/images/68/9.png",
      "/images/68/10.png",
      "/images/68/11.png",
      "/images/68/12.png",
      "/images/68/13.png",
    ],
    proscreenHighlights: [
      {
        label: "Weight",
        value: "725 kg",
      },
      {
        label: "Bucket Width",
        value: "Up to 1.7 meters",
      },
      {
        label: "Feed Height",
        value: "1.8 meters",
      },
      {
        label: "Mesh Range",
        value: "3 mm to 100 mm",
      },
      {
        label: "Warranty",
        value: "5 Year Structure Warranty",
      },
    ],
    videos: [
      {
        id: "892414970?h=138d6d872a",
        title: "68 Homepage",
      },
      {
        id: "1040504352?h=4cdb5c911b",
        title: "68 Pro Screen Overview",
      },
      {
        id: "1197839645?h=78d43fe477",
        title: "68V Screening Compost",
      },
      {
        id: "1129558957?h=2e45ba4add",
        title: "68 Pro Screen Overview",
      },
    ],
    materials: [
      "Soils",
      "Sand",
      "Gravels",
      "Compost",
      "Erosion Rock",
    ],
    features: [
    "45 To 25 Degree Tilting Screen Deck",
    "Coil Over Spring Suspension System",
    "Bucket And Fork Transport Pockets",
    "Hot Dip Zinc Coating Finish",
  ],
  SuggestedRetailPrice: "5,300",
  CostforStockingDealers: "3,700",

  },
   {
    name: "SLG 78 Grizzly RB",
    description: ["DeSite’s spring suspension grizzly makes it the best compact grizzly screener on the market. Designed for compact equipment the screen deck feed height is under 2.4 meters "," The 78 Grizzly with riser box weighs in at 750kg and comes with fork pockets built into the screeners structure for easy onsite transport. "," Backed by our 5 Year Structure Warranty you can count on the SLG 78 Grizzly to be rugged built equipment."],
    detailVariant: "DeSite Grizzly",
    imageAlt: "SLG 78 Grizzly RB screener product photo",
    images: [
      "/images/78grizzly/SLG78RBFront.webp",
      "/images/78grizzly/SLG78RBBack.webp",
      "/images/78grizzly/SLG78RBSide.webp",
      "/images/78grizzly/SLG78RBDraw1.webp",
      "/images/78grizzly/SLG78RBDraw2.webp",
      "/images/78grizzly/front.webp",
      "/images/78grizzly/back.webp",
      "/images/78grizzly/side.webp",
      "/images/78grizzly/suspension.webp",
      "/images/78grizzly/feature.webp",
      "/images/78grizzly/riserbox.webp",
      "/images/78grizzly/riserbox2.webp",
      "/images/78grizzly/inaction1.webp",
      "/images/78grizzly/inaction2.webp",
      "/images/78grizzly/inaction3.webp",
      "/images/78grizzly/inaction4.webp",
      "/images/78grizzly/inaction5.webp",
      "/images/78grizzly/inaction6.webp",
      "/images/78grizzly/inaction7.webp",
      "/images/78grizzly/inaction8.webp",
      "/images/78grizzly/inaction9.webp",
      "/images/78grizzly/inaction10.webp",
    ],
    proscreenHighlights: [
      {
        label: "Weight",
        value: "",
      },
      {
        label: "Bucket Width",
        value: "",
      },
      {
        label: "Feed Height",
        value: "",
      },
      {
        label: "Mesh Range",
        value: "50 mm to 100 mm",
      },
      {
        label: "Warranty",
        value: "5 Year Structure Warranty",
      },
    ],
    videos: [
      {
        id: "1129896297",
        title: "SLG 78 Spring Loaded Grizzly Screening Dirt",
      },
      {
        id: "1001990400",
        title: "SLG 78 Spring Loaded Grizzly Screening Gravel",
      },
      {
        id: "1123779281",
        title: "78 GRIZZLY",
      },
      {
        id: "1003281077",
        title: "SLG 78 Spring Loaded Grizzly Screening Overview",
      },
    ],
    materials: [
      "Dirt",
      "Gravels",
      "Erosion Rock",
    ],
    features: [
    "Self cleaning spring suspension system",
    "Quick disconnect riser box",
    "4 inch nylon tiedown straps",
    "Side tensioning mesh system",
    "Available mesh sizes 50, 75, and 100mm",
  ],
  SuggestedRetailPrice: "5,700",
  CostforStockingDealers: "4,000",


  },
  {
    name: "SLG 78 Grizzly",
    description: ["Product overview and detailed model information will be added soon."],
    detailVariant: "DeSite Grizzly",
    imageAlt: "SLG 78 Grizzly screener product photo",
    images: [],
    proscreenHighlights: [
      {
        label: "Weight",
        value: "",
      },
      {
        label: "Bucket Width",
        value: "",
      },
      {
        label: "Feed Height",
        value: "",
      },
      {
        label: "Mesh Range",
        value: "",
      },
      {
        label: "Warranty",
        value: "5 Year Structure Warranty",
      },
      
    ],
    videos: [],
    materials: [
      "coming soon"
    ],
    features: [
    "coming soon"
  ],
 
  },
  {
    name: "SLG 56 Mini",
    description: ["Product overview and detailed model information will be added soon."],
    detailVariant: "DeSite Grizzly",
    imageAlt: "SLG 56 Mini screener product photo",
    images: [
      "/images/56/SLG56Front.webp",
      "/images/56/SLG56Back.webp",
      "/images/56/SLG56Side.webp",
      "/images/56/SLG56Draw1.webp",
      "/images/56/SLG56Draw2.webp",
      "/images/56/front.webp",
      "/images/56/side.webp",
      "/images/56/side2.webp",
      "/images/56/side3.webp",
      "/images/56/suspension.webp",
      "/images/56/tube.webp",
      "/images/56/pack.webp",
      "/images/56/feature1.webp",
      "/images/56/wheels.webp",
      "/images/56/inaction1.webp",
      "/images/56/inaction2.webp",
      "/images/56/inaction3.webp",
      "/images/56/inaction4.webp",
    ],
    proscreenHighlights: [
      {
        label: "Weight",
        value: "",
      },
      {
        label: "Bucket Width",
        value: "",
      },
      {
        label: "Feed Height",
        value: "",
      },
      {
        label: "Mesh Range",
        value: "",
      },
      {
        label: "Warranty",
        value: "5 Year Structure Warranty",
      },
    ],
    videos: [
      {
        id: "1006286529",
        title: "SLG 56 Towable Spring Loaded Grizzly | Overview",
      },
      {
        id: "1125998905",
        title: "SLG 56 Towable Spring Loaded Grizzly Testimonial",
      },
      {
        id: "970371995",
        title: "DESITE SLG - 56 MINI",
      },
      {
        id: "970809028",
        title: "SLG 56 Towable Spring Loaded Grizzly | Disconnect Hitch System",
      },
    ],
    materials: [
      "Soils",
      "Sand",
      "Gravels",
      "Compost",
      "Erosion Rock",
    ],
    features: [
    "coming soon"
  ],

  },
 {
    name: "SLG 48 Mini",
    description: ["Product overview and detailed model information will be added soon."],
    detailVariant: "DeSite Grizzly",
    imageAlt: "SLG 48 Mini screener product photo",
    images: [
      "/images/48/SLG48Front.webp",
      "/images/48/SLG48Back.webp",
      "/images/48/SLG48Side.webp",
      "/images/48/SLG48Draw1.webp",
      "/images/48/SLG48Draw2.webp",
      "/images/48/front48.webp",
      "/images/48/side48.webp",
      "/images/48/Suspension48.webp",
      "/images/48/wheels48.webp",
      "/images/48/48InAction1.webp",
      "/images/48/48InAction2.webp",
      "/images/48/48InAction3.webp",
      "/images/48/48InAction4.webp",
      
    ],
    proscreenHighlights: [
      {
        label: "Weight",
        value: "",
      },
      {
        label: "Bucket Width",
        value: "",
      },
      {
        label: "Feed Height",
        value: "",
      },
      {
        label: "Mesh Range",
        value: "",
      },
      {
        label: "Warranty",
        value: "5 Year Structure Warranty",
      },
    ],
    videos: [
      {
        id: "945966711",
        title: "DESITE SLG - 48 MINI",
      },
    ],
    materials: [
      "Soils",
      "Sand",
      "Gravels",
      "Compost",
      "Erosion Rock",
    ],
    features: [
    "coming soon"
  ],

  },

];

export const videos = [
  {
    title: "Product Demos",
    thumbnail: "/assets/desite/videos/product-demo-thumbnail.jpg",
    description: "Placeholder demo video showing setup, screening, and material output.",
    embed: "YouTube or Vimeo link placeholder",
  },
  {
    title: "Customer Jobsites and Testimonials",
    thumbnail: "/assets/desite/videos/customer-jobsite-thumbnail.jpg",
    description: "Placeholder customer jobsite footage with real working conditions.",
    embed: "YouTube or Vimeo link placeholder",
  },
  {
    title: "Before and After Material Results",
    thumbnail: "/assets/desite/videos/before-after-thumbnail.jpg",
    description: "Placeholder comparison of raw material and screened finished material.",
    embed: "YouTube or Vimeo link placeholder",
  },
  {
    title: "Behind the Scenes Field Testing",
    thumbnail: "/assets/desite/videos/behind-scenes-thumbnail.jpg",
    supportImage: "/assets/desite/videos/brad-customer-field-testing.jpg",
    description: "Placeholder field-testing footage with Brad speaking with customers.",
    embed: "YouTube or Vimeo link placeholder",
  },
];

export const customerStories = [
  {
    name: "Chris Hawes",
    location: "Location placeholder",
    machine: "Machine purchased placeholder",
    photo: "/assets/desite/customers/lin-customer-photo.jpg",
    jobsite: "/images/reviews/1.webp",
    quote:
      "Love my machine I'm in California it's very portable I screen manure compost and topsoil since I'm in California, We always have carb checking to see if you have an updated motors so with this set up I have a Honda generator. It runs the vibrations, so Ino longer have to deal with carb, I can put it in my dump trailer move it to different jobs. I run the machine all by myself. Easy to set up and cheap to run. Love my machine.",
  },
  {
    name: "Mark Kowalczyk",
    location: "Location placeholder",
    machine: "Machine purchased placeholder",
    photo: "/assets/desite/customers/dan-customer-photo.jpg",
    jobsite: "/images/reviews/2.webp",
    quote:
      "Using my 108 almost everyday. Making 1 inch minus soil fill blended with aged compost and mushroom soil. Screen works awesome and the material it makes sells itself.",
  },
  {
    name: "Jennifer Bond",
    location: "Location placeholder",
    machine: "Machine purchased placeholder",
    photo: "/assets/desite/customers/kelly-customer-photo.jpg",
    jobsite: "/images/reviews/3.webp",
    quote:
      "BEST screener in the industry with the BEST support I’ve seen across all my equipment. Andy and Brad have been GREAT to work with and my equipment has been flawless. Everyone who see’s it is in awe at the build quality, the welds look like rolls of dimes, they’re gorgeous... You won’t regret buying ANY of Columbia’s products... I know I sure don’t!!!!",
  },
  {
    name: "Larry Pierce",
    location: "Location placeholder",
    machine: "Machine purchased placeholder",
    photo: "/assets/desite/customers/rob-customer-photo.jpg",
    jobsite: "/images/reviews/4.webp",
    quote:"Andy did a fantastic job selling this very easy and great communication unloaded it screen 6 yards worked great much faster and cleaner product than my other name brand screener.",
  },
  {
    name: "Piney Grove Homestead and Mini Farm",
    location: "Location placeholder",
    machine: "Machine purchased placeholder",
    photo: "/assets/desite/customers/rob-customer-photo.jpg",
    jobsite: "/images/reviews/5copy.webp",
    quote:"Trying out our DeSite 56\" screener for the first time. Can't wait to put this to work on our huge compost pile!",
  },
  {
    name: "Michael Paul",
    location: "Location placeholder",
    machine: "Machine purchased placeholder",
    photo: "/assets/desite/customers/rob-customer-photo.jpg",
    jobsite: "/images/reviews/6.webp",
    quote:"The Easter bunny dropped a big egg today for us !! This should definitely help the screening operation . Thank you for all the help Brad and Andy Columbia Equipment Sales.",
  },
  {
    name: "Harlowe Farm",
    location: "Location placeholder",
    machine: "Machine purchased placeholder",
    photo: "/assets/desite/customers/rob-customer-photo.jpg",
    jobsite: "",
    quote:"I have the desite 78 and can do 30 to 35 yards an hour with my 3 yard loader . I have done hundreds and hundreds of yards of topsoil in the last 3 years with zero problems with it . Great working screener for small operators in my opinion.",
    video:"https://www.youtube.com/embed/h3F7ziYb88Q",
  },
  {
    name: "Dewey Coleman",
    location: "Location placeholder",
    machine: "Machine purchased placeholder",
    photo: "/assets/desite/customers/rob-customer-photo.jpg",
    jobsite: "/images/reviews/8.webp",
    quote:"We love ours! Great product!.",
  },
  {
    name: "Jennifer Bond ",
    location: "Location placeholder",
    machine: "Machine purchased placeholder",
    photo: "/assets/desite/customers/rob-customer-photo.jpg",
    jobsite: "/images/reviews/9.webp",
    quote:"I’m so glad I ordered the riser with my 78, I wouldn’t own one without it.",
  },
  {
    name: "Derek Taylor",
    location: "Location placeholder",
    machine: "Machine purchased placeholder",
    photo: "/assets/desite/customers/rob-customer-photo.jpg",
    jobsite: "/assets/desite/customers/rob-customer-photo.jpg",
    quote:"I have the desite 78 and can do 30 to 35 yards an hour with my 3 yard loader . I have done hundreds and hundreds of yards of topsoil in the last 3 years with zero problems with it . Great working screener for small operators in my opinion.",
  },
  {
    name: "Bill Stone",
    location: "Location placeholder",
    machine: "Machine purchased placeholder",
    photo: "/assets/desite/customers/rob-customer-photo.jpg",
    jobsite: "/assets/desite/customers/rob-customer-photo.jpg",
    quote:"The screener is a “no joke” piece of equipment. Too bad folks can’t see one in person to see the quality before they decide to get one. The pictures and videos don’t show how well built it is. Thanks for the great service. Looking forward to trying it out this afternoon.",
  },
  {
    name: "MIKE",
    location: "Location placeholder",
    machine: "Machine purchased placeholder",
    photo: "/assets/desite/customers/rob-customer-photo.jpg",
    jobsite: "/assets/desite/customers/rob-customer-photo.jpg",
    quote:"I wasn’t expecting delivery until next week. Had fun today sifting a pile of mixed debris. Made some nice topsoil. Also screened some DG. Beautiful job. So pleased with this machine I can’t tell you how much. Hope to get some video soon.",
  }
];

export const socialProof = [
  {
    title: "Facebook Views",
    path: "/assets/desite/social/facebook-views.jpg",
    text: "Screenshot placeholder for Facebook reach and video views.",
  },
  {
    title: "Instagram Views",
    path: "/assets/desite/social/instagram-views.jpg",
    text: "Screenshot placeholder for Instagram engagement.",
  },
  {
    title: "YouTube Views",
    path: "/assets/desite/social/youtube-views.jpg",
    text: "Screenshot placeholder focused on YouTube video views.",
  },
];

export const featuredTestimonials = [
  "Placeholder review about dependable performance and fast setup.",
  "Placeholder review about lower hauling costs and better use of material.",
  "Placeholder review about service, resale value, and production gains.",
];

export const loadoutImages = [
  "/assets/desite/loadouts/loadout-1.jpg",
  "/assets/desite/loadouts/loadout-2.jpg",
  "/assets/desite/loadouts/loadout-3.jpg",
  "/assets/desite/loadouts/loadout-4.jpg",
];

export const downloadAssets = [
  {
    name: "Logos PNG and SVG",
    description: "Download DeSite logo files for media and dealer use.",
    fileType: "ZIP",
    href: "/downloads/desite-logo-pack.zip",
  },
  {
    name: "Product Photos",
    description: "Placeholder folder for real product images.",
    fileType: "ZIP",
    href: "/downloads/desite-product-photos.zip",
  },
  {
    name: "Lifestyle Photos",
    description: "Placeholder folder for real jobsite and customer images.",
    fileType: "ZIP",
    href: "/downloads/desite-lifestyle-photos.zip",
  },
  {
    name: "Spec Sheets",
    description: "Download product spec sheets in one place.",
    fileType: "ZIP",
    href: "/downloads/desite-spec-sheets.zip",
  },
  {
    name: "Videos and B-roll",
    description: "Placeholder package for demos, b-roll, and field footage.",
    fileType: "ZIP",
    href: "/downloads/desite-broll.zip",
  },
  {
    name: "Brand Guidelines",
    description: "Placeholder PDF for DeSite brand rules and media use.",
    fileType: "PDF",
    href: "/downloads/desite-brand-guidelines.pdf",
  },
];
