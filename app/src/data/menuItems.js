import Image from "next/image"

// About menu items
const highlightItems = [
  { name: "Meets & Events", path: "/meets-and-events" },
  { name: "Catalogues", path: "/catalogues" }
]
const aboutItems = [
  { name: "Company Overview", path: "/company-overview" },
  { name: "Manufacturing Facilities", path: "/manufacturing-facilities" },
  { name: "Future Vision", path: "/future-vision" },
  { name: "Certifications & Credentials", path: "/certifications-and-credentials" },
  { name: "CSR", path: "/csr" },
  { name: "Highlights", children: [ ...highlightItems ] }
]

// Business Menu items
const productsItems = [
  { name: "Colour Coated", path: "/colour-coated" },
  { name: "Aluzinc Sheets", path: "/aluzinc-sheets" },
  { name: "Pipes", path: "/pipes" },
  { name: "CRFH & CRCA", path: "/crfh-and-crca" }
]
const crsSubItems = [
  { name: "Royale", path: "/royale" },
  { name: "Elite", path: "/elite" }
]
const glvlmSubItems = [
  { name: "Azure", path: "/azure" },
  { name: "Alfa", path: "/alfa" }
]
const brandItems = [
  { name: "Coloured Roofing Sheets", children: [ ...crsSubItems ] },
  { name: "Galvalume", children: [ ...glvlmSubItems ] }
]
const applicationItems = [
  { name: "Industrial Use", path: "/industrial-use" },
  { name: "Domestic Use", path: "/domestic-use" },
  { name: "Project Based", path: "/project-based" },
]
const businessItems = [
  { name: "Our Products", children: [ ...productsItems ] },
  { name: "Our Brands", children: [ ...brandItems ] },
  { name: "Application", children: [ ...applicationItems ] },
  { name: "Media", path: "/media" }
]

// Roof It Yourself menu items
const resourceItems = [
  { name: "Handbook for Colour Coated Roofing Sheet", path: "/handbook-for-colour-coated-roofing-sheet" },
  { name: "Handbook for Al-Zn Coated Sheet", path: "/handbook-for-alzn-coated-sheet" },
]
const roofItYourselfItems = [
  { name: "Design Your Roof", path: "/design-your-roof" },
  { name: "Roof Sheet Calculator", path: "/roof-sheet-calculator" },
  { name: "Maintenance", path: "/maintenance" },
  { name: "Installation", path: "/installation" },
  { name: "Resources", children: [ ...resourceItems ] }
]




// Main Menu -----------------------------------------------------------------------------------------------------------------------
export const menuItems = [
  { name: "Home", path: "/" },
  { name: "About", children: [ ...aboutItems ] },
  { name: "Business", children: [ ...businessItems ] },
  {
    name: "Shyam Metalics",
    icon: "/shyam-logo.png",
    path: "https://www.shyammetalics.com",
    target: "_blank"
  },
  { name: "Roof It Yourself", children: [ ...roofItYourselfItems ] },
  { name: "Blog", path: "/blogs" },
  { name: "Dealer Location", path: "/dealerlocations" },
  { name: "Contact Us", path: "/contact" }
]
