// About menu items
const highlightItems = [
  { name: "Meets & Events", path: "/about/highlights/meets_and_events" },
  { name: "Catalogues", path: "/about/highlights/catalogues" }
]
const aboutItems = [
  { name: "Company Overview", path: "/about/company_overview" },
  { name: "Manufacturing Facilities", path: "/about/manufacturing_facilities" },
  { name: "Future Vision", path: "/about/future_vision" },
  { name: "Certifications & Credentials", path: "/about/certifications_and_credentials" },
  { name: "CSR", path: "/about/csr" },
  { name: "Highlights", children: [ ...highlightItems ] }
]

// Business Menu items
const productsItems = [
  { name: "Colour Coated", path: "/business/colour_coated" },
  { name: "Aluzinc Sheets", path: "/business/aluzinc_sheets" },
  { name: "Pipes", path: "/business/pipes" },
  { name: "CRFH & CRCA", path: "/business/crfh_and_crca" }
]
const crsSubItems = [
  { name: "Royale", path: "/business/coloured_roofing_sheets/royale" },
  { name: "Elite", path: "/business/coloured_roofing_sheets/elite" }
]
const glvlmSubItems = [
  { name: "Azure", path: "/business/galvalume/azure" },
  { name: "Alfa", path: "/business/galvalume/alfa" }
]
const brandItems = [
  { name: "Coloured Roofing Sheets", children: [ ...crsSubItems ] },
  { name: "Galvalume", children: [ ...glvlmSubItems ] }
]
const applicationItems = [
  { name: "Industrial Use", path: "/business/industrial_use" },
  { name: "Domestic Use", path: "/business/domestic_use" },
  { name: "Project Based", path: "/business/project_based" },
]
const businessItems = [
  { name: "Our Products", children: [ ...productsItems ] },
  { name: "Our Brands", children: [ ...brandItems ] },
  { name: "Application", children: [ ...applicationItems ] },
  { name: "Media", path: "/business/media" }
]

// Roof It Yourself menu items
const resourceItems = [
  { name: "Handbook for Colour Coated Roofing Sheet", path: "/roof_it_yourself/resources/handbook_for_colour_coated_roofing_sheet" },
  { name: "Handbook for Al-Zn Coated Sheet", path: "/roof_it_yourself/resources/handbook_for_alzn_coated_sheet" },
]
const roofItYourselfItems = [
  { name: "Design Your Roof", path: "/roof_it_yourself/design_your_roof" },
  { name: "Roof Sheet Calculator", path: "/roof_it_yourself/roof_sheet_calculator" },
  { name: "Maintenance", path: "/roof_it_yourself/maintenance" },
  { name: "Installation", path: "/roof_it_yourself/installation" },
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
  { name: "Dealer Location", path: "/dealer_locations" },
  { name: "Contact Us", path: "/contact" }
]
