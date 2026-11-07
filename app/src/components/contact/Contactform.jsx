"use client";
import React from "react";
import Image from 'next/image';
import { CheckCircle, X } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
// import { redirect } from "next/navigation"; // this has been used in Server Side Componenet
import { useRouter } from "next/navigation";
import STATES_BY_COUNTRY from "../../data/locations/states.js";
import INDIA_BLOCKS from "../../data/locations/india-blocks.js";
import INDIA_PINCODES from "../../data/locations/india-pincodes.js";
import axiosInstance from "@/configs/axiosInstance.js";


/* ================= DATA ================= */

const VERTICALS = {
    ALUMINIUM: [
        {
            "ALUMINIUM FOIL": [
                "ULG (ULTRA LIGHT GAUGE)",
                "LG (LIGHT GAUGE)",
                "MG (MEDIUM GAUGE)",
                "HOUSE FOIL",
                "SRC (SEMI-RIGID CONTAINER)",
                "ALU-ALU",
                "BATTERY FOIL",
                "COATED",
                "OTHER (SPECIFY)",
            ]
        }
    ],
    "FERRO ALLOYS": ["FERRO MANGANESE", "SILICO MANGANESE", "FERRO CHROME", "FERRO SILICON"],
    "MS LONG": [
        "TMT",
        "COIL TMT",
        "STRUCTURAL STEEL",
        "CRASH BARRIER",
        "BILLET",
        "PELLET",
        "PIG IRON",
        "SPONGE IRON",
        "WIRE ROD",
        "HB WIRE",
    ],
    CRM: ["Colour-Coated Sheets", "GI/GL", "Pipes", "CR Products (CRFH,CRCA,BP)"],
    "STAINLESS STEEL": [
        "SS BILLETS",
        "SS WIRE_RODS",
        "SS WIRES",
        "SS REBAR",
        "SS ROUND BAR/BLACK BAR",
        "SS BRIGHT BAR",
    ],
};

/* Vertical -> Product -> Sub Product
   A vertical's list can mix plain strings ("TMT") and objects
   ({ "ALUMINIUM FOIL": [...] }). Objects are products that have sub products.
   Normalised once here into { [vertical]: [{ name, subProducts: [] }] }. */
const OTHER_SUB_PRODUCT = "OTHER (SPECIFY)";
/* Sub products are multi-select and sent as an array of strings
   (record.subProduct: string[]). This separator is only for display. */
const SUB_PRODUCT_SEPARATOR = ", ";

const PRODUCTS_BY_VERTICAL = Object.fromEntries(
    Object.entries(VERTICALS).map(([vertical, items]) => [
        vertical,
        items.flatMap((item) =>
            typeof item === "string"
                ? [{ name: item, subProducts: [] }]
                : Object.entries(item).map(([name, subs]) => ({ name, subProducts: subs }))
        ),
    ])
);

const getSubProducts = (vertical, product) => {
    const match = (PRODUCTS_BY_VERTICAL[vertical] || []).find((p) => p.name === product);
    return match ? match.subProducts : [];
};

/* Gauge Category cell in the requirement / interest tables: for ALUMINIUM rows,
   the selected sub products one per line, each followed by a comma except the last. */
/* Business rows store the list as `subProducts`, interest rows as `subProduct`. */
const getSavedSubProducts = (r) => (r.subProducts !== undefined ? r.subProducts : r.subProduct);

const renderGaugeCategory = (r) => {
    const list = getSavedSubProducts(r);
    if (r.vertical !== "ALUMINIUM" || !Array.isArray(list) || !list.length) return "—";
    return list.map((s, idx) => (
        <div key={idx} style={{ whiteSpace: "nowrap" }}>
            {s}
            {idx < list.length - 1 ? "," : ""}
        </div>
    ));
};

/* ---------------- Job & Others attachment (ONE file only) ----------------
   When a file is attached the enquiry is sent as multipart/form-data: the same
   payload fields, plus the file under ATTACHMENT_FIELD. Without a file the
   request is the same JSON as before. */
const ATTACHMENT_FIELD = "attachment"; // NOTE: must match the backend upload field name
const ATTACHMENT_MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ATTACHMENT_EXTENSIONS = [".pdf", ".doc", ".docx"];

const formatFileSize = (bytes) =>
    bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

/* ---------------- Validation rules ---------------- */
const NAME_MAX = 50;
const COMPANY_MAX = 100;
const LOCATION_MAX = 100;
const EMAIL_MAX = 254;
const SPEC_MAX = 100;
const TERRITORY_MAX = 100;
const QTY_MAX_LENGTH = 10;
const JOB_DESCRIPTION_MIN = 10;

const NAME_RE = /^\p{L}[\p{L}\s.'-]*$/u;
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
const INDIA_MOBILE_RE = /^[6-9]\d{9}$/;
const FOREIGN_POSTCODE_RE = /^[A-Za-z0-9][A-Za-z0-9 -]{1,9}$/;

/* Typing filters: invalid characters never reach state. */
const sanitizeName = (v) => v.replace(/[^\p{L}\s.'-]/gu, "").replace(/^\s+/, "").replace(/\s{2,}/g, " ").slice(0, NAME_MAX);
const sanitizeEmail = (v) => v.replace(/\s/g, "").slice(0, EMAIL_MAX);
const sanitizeQty = (v) => {
    let out = v.replace(/[^\d.]/g, "");
    const dot = out.indexOf(".");
    if (dot !== -1) out = out.slice(0, dot + 1) + out.slice(dot + 1).replace(/\./g, "").slice(0, 3); // max 3 decimals
    out = out.replace(/^0+(?=\d)/, ""); // "05" -> "5"
    if (out.startsWith(".")) out = "0" + out;
    return out.slice(0, QTY_MAX_LENGTH);
};

/* Phone length per country. India: exactly 10 digits (mobile, starts 6-9).
   Others: E.164 allows max 15 digits including the country code. */
const getPhoneRule = (countryName, dialCode) => {
    if (countryName === "India") return { min: 10, max: 10 };
    const codeDigits = String(dialCode || "").replace(/\D/g, "").length;
    const max = Math.max(6, 15 - codeDigits);
    return { min: Math.min(6, max), max };
};

const UOM_OPTIONS = ["MT", "KG", "Bags", "Pieces", "Tonnes"];

/* ---------------- Purpose -> Customer Type -> Sub Type ----------------
   PURPOSE_OPTIONS.purposeIndex      <- CUSTOMER_TYPE_OPTIONS.purposeGroup
   CUSTOMER_TYPE_OPTIONS.custTypeIndex <- SUB_TYPE_OPTIONS.customerGroup
   `group` is the existing purposeGroup value ("business" | "dealership" |
   "joborothers") that drives Section 3 and is sent in the payload. */
const PURPOSE_OPTIONS = [
    { purposeIndex: "p0", label: "Business Enquiry", group: "business" },
    { purposeIndex: "p1", label: "Interested in Dealership", group: "dealership" },
    { purposeIndex: "p2", label: "Job & Others", group: "joborothers" },
];

const CUSTOMER_TYPE_OPTIONS = [
    { custTypeIndex: "ct0", label: "End Customer", purposeGroup: "p0" },
    { custTypeIndex: "ct1", label: "Distributor", purposeGroup: "p0" },
    { custTypeIndex: "ct2", label: "Dealer", purposeGroup: "p0" },
    { custTypeIndex: "ct3", label: "Trader", purposeGroup: "p0" },
    { custTypeIndex: "ct4", label: "Company", purposeGroup: "p0" },
    { custTypeIndex: "ct5", label: "Steel Mills", purposeGroup: "p0" },
    { custTypeIndex: "ct6", label: "OEM Customer", purposeGroup: "p0" },
    { custTypeIndex: "ct7", label: "B2B Customer", purposeGroup: "p0" },
    { custTypeIndex: "ct8", label: "Export Customer", purposeGroup: "p0" },
    { custTypeIndex: "ct9", label: "Distributor", purposeGroup: "p1" },
    { custTypeIndex: "ct10", label: "Dealer", purposeGroup: "p1" },
    { custTypeIndex: "ct11", label: "Job & Others", purposeGroup: "p2" },
];

const SUB_TYPE_OPTIONS = [
    { subTypeIndex: "st0", label: "Sub Dealer", customerGroup: "ct0" },
    { subTypeIndex: "st1", label: "Retailer", customerGroup: "ct0" },
    { subTypeIndex: "st2", label: "Profiler", customerGroup: "ct0" },
    { subTypeIndex: "st3", label: "Project", customerGroup: "ct0" },
    { subTypeIndex: "st4", label: "Architect", customerGroup: "ct0" },
    { subTypeIndex: "st5", label: "Engineer", customerGroup: "ct0" },
    { subTypeIndex: "st6", label: "Agent", customerGroup: "ct0" },
    { subTypeIndex: "st7", label: "Builder", customerGroup: "ct0" },
    { subTypeIndex: "st8", label: "Mason", customerGroup: "ct0" },
    { subTypeIndex: "st9", label: "Contractor", customerGroup: "ct0" },
    { subTypeIndex: "st10", label: "EPC Contractor", customerGroup: "ct0" },
    { subTypeIndex: "st11", label: "Fabricator", customerGroup: "ct0" },
    { subTypeIndex: "st12", label: "House Owner", customerGroup: "ct0" },
    { subTypeIndex: "st13", label: "Partner", customerGroup: "ct0" },
];


// Full list of countries with their international dial code and flag emoji.
// India is kept first for prominence since it's the primary/domestic market.
const COUNTRIES = [
    { id: 101, name: "India", code: "+91", flag: "🇮🇳" },
    { id: 1, name: "Afghanistan", code: "+93", flag: "🇦🇫" },
    { id: 2, name: "Aland Islands", code: "+358", flag: "🇦🇽" },
    { id: 3, name: "Albania", code: "+355", flag: "🇦🇱" },
    { id: 4, name: "Algeria", code: "+213", flag: "🇩🇿" },
    { id: 5, name: "American Samoa", code: "+1 684", flag: "🇦🇸" },
    { id: 6, name: "Andorra", code: "+376", flag: "🇦🇩" },
    { id: 7, name: "Angola", code: "+244", flag: "🇦🇴" },
    { id: 10, name: "Antigua and Barbuda", code: "+1 268", flag: "🇦🇬" },
    { id: 11, name: "Argentina", code: "+54", flag: "🇦🇷" },
    { id: 12, name: "Armenia", code: "+374", flag: "🇦🇲" },
    { id: 13, name: "Aruba", code: "+297", flag: "🇦🇼" },
    { id: 14, name: "Australia", code: "+61", flag: "🇦🇺" },
    { id: 15, name: "Austria", code: "+43", flag: "🇦🇹" },
    { id: 16, name: "Azerbaijan", code: "+994", flag: "🇦🇿" },
    { id: 18, name: "Bahrain", code: "+973", flag: "🇧🇭" },
    { id: 19, name: "Bangladesh", code: "+880", flag: "🇧🇩" },
    { id: 20, name: "Barbados", code: "+1 246", flag: "🇧🇧" },
    { id: 21, name: "Belarus", code: "+375", flag: "🇧🇾" },
    { id: 22, name: "Belgium", code: "+32", flag: "🇧🇪" },
    { id: 23, name: "Belize", code: "+501", flag: "🇧🇿" },
    { id: 24, name: "Benin", code: "+229", flag: "🇧🇯" },
    { id: 25, name: "Bermuda", code: "+1 441", flag: "🇧🇲" },
    { id: 26, name: "Bhutan", code: "+975", flag: "🇧🇹" },
    { id: 27, name: "Bolivia", code: "+591", flag: "🇧🇴" },
    { id: 155, name: "Bonaire, Sint Eustatius and Saba", code: "+599", flag: "🇧🇶" },
    { id: 28, name: "Bosnia and Herzegovina", code: "+387", flag: "🇧🇦" },
    { id: 29, name: "Botswana", code: "+267", flag: "🇧🇼" },
    { id: 31, name: "Brazil", code: "+55", flag: "🇧🇷" },
    { id: 33, name: "Brunei", code: "+673", flag: "🇧🇳" },
    { id: 34, name: "Bulgaria", code: "+359", flag: "🇧🇬" },
    { id: 35, name: "Burkina Faso", code: "+226", flag: "🇧🇫" },
    { id: 36, name: "Burundi", code: "+257", flag: "🇧🇮" },
    { id: 37, name: "Cambodia", code: "+855", flag: "🇰🇭" },
    { id: 38, name: "Cameroon", code: "+237", flag: "🇨🇲" },
    { id: 39, name: "Canada", code: "+1", flag: "🇨🇦" },
    { id: 40, name: "Cape Verde", code: "+238", flag: "🇨🇻" },
    { id: 41, name: "Cayman Islands", code: "+1 345", flag: "🇰🇾" },
    { id: 42, name: "Central African Republic", code: "+236", flag: "🇨🇫" },
    { id: 43, name: "Chad", code: "+235", flag: "🇹🇩" },
    { id: 44, name: "Chile", code: "+56", flag: "🇨🇱" },
    { id: 45, name: "China", code: "+86", flag: "🇨🇳" },
    { id: 48, name: "Colombia", code: "+57", flag: "🇨🇴" },
    { id: 49, name: "Comoros", code: "+269", flag: "🇰🇲" },
    { id: 50, name: "Congo", code: "+242", flag: "🇨🇬" },
    { id: 53, name: "Costa Rica", code: "+506", flag: "🇨🇷" },
    { id: 55, name: "Croatia", code: "+385", flag: "🇭🇷" },
    { id: 56, name: "Cuba", code: "+53", flag: "🇨🇺" },
    { id: 57, name: "Cyprus", code: "+357", flag: "🇨🇾" },
    { id: 58, name: "Czech Republic", code: "+420", flag: "🇨🇿" },
    { id: 51, name: "Democratic Republic of the Congo", code: "+243", flag: "🇨🇩" },
    { id: 59, name: "Denmark", code: "+45", flag: "🇩🇰" },
    { id: 60, name: "Djibouti", code: "+253", flag: "🇩🇯" },
    { id: 61, name: "Dominica", code: "+1 767", flag: "🇩🇲" },
    { id: 62, name: "Dominican Republic", code: "+1 809", flag: "🇩🇴" },
    { id: 64, name: "Ecuador", code: "+593", flag: "🇪🇨" },
    { id: 65, name: "Egypt", code: "+20", flag: "🇪🇬" },
    { id: 66, name: "El Salvador", code: "+503", flag: "🇸🇻" },
    { id: 67, name: "Equatorial Guinea", code: "+240", flag: "🇬🇶" },
    { id: 68, name: "Eritrea", code: "+291", flag: "🇪🇷" },
    { id: 69, name: "Estonia", code: "+372", flag: "🇪🇪" },
    { id: 212, name: "Eswatini", code: "+268", flag: "🇸🇿" },
    { id: 70, name: "Ethiopia", code: "+251", flag: "🇪🇹" },
    { id: 72, name: "Faroe Islands", code: "+298", flag: "🇫🇴" },
    { id: 73, name: "Fiji Islands", code: "+679", flag: "🇫🇯" },
    { id: 74, name: "Finland", code: "+358", flag: "🇫🇮" },
    { id: 75, name: "France", code: "+33", flag: "🇫🇷" },
    { id: 77, name: "French Polynesia", code: "+689", flag: "🇵🇫" },
    { id: 79, name: "Gabon", code: "+241", flag: "🇬🇦" },
    { id: 81, name: "Georgia", code: "+995", flag: "🇬🇪" },
    { id: 82, name: "Germany", code: "+49", flag: "🇩🇪" },
    { id: 83, name: "Ghana", code: "+233", flag: "🇬🇭" },
    { id: 85, name: "Greece", code: "+30", flag: "🇬🇷" },
    { id: 86, name: "Greenland", code: "+299", flag: "🇬🇱" },
    { id: 87, name: "Grenada", code: "+1 473", flag: "🇬🇩" },
    { id: 88, name: "Guadeloupe", code: "+590", flag: "🇬🇵" },
    { id: 89, name: "Guam", code: "+1 671", flag: "🇬🇺" },
    { id: 90, name: "Guatemala", code: "+502", flag: "🇬🇹" },
    { id: 91, name: "Guernsey", code: "+44 1481", flag: "🇬🇬" },
    { id: 92, name: "Guinea", code: "+224", flag: "🇬🇳" },
    { id: 93, name: "Guinea-Bissau", code: "+245", flag: "🇬🇼" },
    { id: 94, name: "Guyana", code: "+592", flag: "🇬🇾" },
    { id: 95, name: "Haiti", code: "+509", flag: "🇭🇹" },
    { id: 97, name: "Honduras", code: "+504", flag: "🇭🇳" },
    { id: 98, name: "Hong Kong S.A.R.", code: "+852", flag: "🇭🇰" },
    { id: 99, name: "Hungary", code: "+36", flag: "🇭🇺" },
    { id: 100, name: "Iceland", code: "+354", flag: "🇮🇸" },
    { id: 102, name: "Indonesia", code: "+62", flag: "🇮🇩" },
    { id: 103, name: "Iran", code: "+98", flag: "🇮🇷" },
    { id: 104, name: "Iraq", code: "+964", flag: "🇮🇶" },
    { id: 105, name: "Ireland", code: "+353", flag: "🇮🇪" },
    { id: 106, name: "Israel", code: "+972", flag: "🇮🇱" },
    { id: 107, name: "Italy", code: "+39", flag: "🇮🇹" },
    { id: 54, name: "Ivory Coast", code: "+225", flag: "🇨🇮" },
    { id: 108, name: "Jamaica", code: "+1 876", flag: "🇯🇲" },
    { id: 109, name: "Japan", code: "+81", flag: "🇯🇵" },
    { id: 110, name: "Jersey", code: "+44 1534", flag: "🇯🇪" },
    { id: 111, name: "Jordan", code: "+962", flag: "🇯🇴" },
    { id: 112, name: "Kazakhstan", code: "+7", flag: "🇰🇿" },
    { id: 113, name: "Kenya", code: "+254", flag: "🇰🇪" },
    { id: 114, name: "Kiribati", code: "+686", flag: "🇰🇮" },
    { id: 248, name: "Kosovo", code: "+383", flag: "🇽🇰" },
    { id: 117, name: "Kuwait", code: "+965", flag: "🇰🇼" },
    { id: 118, name: "Kyrgyzstan", code: "+996", flag: "🇰🇬" },
    { id: 119, name: "Laos", code: "+856", flag: "🇱🇦" },
    { id: 120, name: "Latvia", code: "+371", flag: "🇱🇻" },
    { id: 121, name: "Lebanon", code: "+961", flag: "🇱🇧" },
    { id: 122, name: "Lesotho", code: "+266", flag: "🇱🇸" },
    { id: 123, name: "Liberia", code: "+231", flag: "🇱🇷" },
    { id: 124, name: "Libya", code: "+218", flag: "🇱🇾" },
    { id: 125, name: "Liechtenstein", code: "+423", flag: "🇱🇮" },
    { id: 126, name: "Lithuania", code: "+370", flag: "🇱🇹" },
    { id: 127, name: "Luxembourg", code: "+352", flag: "🇱🇺" },
    { id: 130, name: "Madagascar", code: "+261", flag: "🇲🇬" },
    { id: 131, name: "Malawi", code: "+265", flag: "🇲🇼" },
    { id: 132, name: "Malaysia", code: "+60", flag: "🇲🇾" },
    { id: 133, name: "Maldives", code: "+960", flag: "🇲🇻" },
    { id: 134, name: "Mali", code: "+223", flag: "🇲🇱" },
    { id: 135, name: "Malta", code: "+356", flag: "🇲🇹" },
    { id: 136, name: "Man (Isle of)", code: "+44 1624", flag: "🇮🇲" },
    { id: 137, name: "Marshall Islands", code: "+692", flag: "🇲🇭" },
    { id: 138, name: "Martinique", code: "+596", flag: "🇲🇶" },
    { id: 139, name: "Mauritania", code: "+222", flag: "🇲🇷" },
    { id: 140, name: "Mauritius", code: "+230", flag: "🇲🇺" },
    { id: 141, name: "Mayotte", code: "+269", flag: "🇾🇹" },
    { id: 142, name: "Mexico", code: "+52", flag: "🇲🇽" },
    { id: 143, name: "Micronesia", code: "+691", flag: "🇫🇲" },
    { id: 144, name: "Moldova", code: "+373", flag: "🇲🇩" },
    { id: 145, name: "Monaco", code: "+377", flag: "🇲🇨" },
    { id: 146, name: "Mongolia", code: "+976", flag: "🇲🇳" },
    { id: 147, name: "Montenegro", code: "+382", flag: "🇲🇪" },
    { id: 149, name: "Morocco", code: "+212", flag: "🇲🇦" },
    { id: 150, name: "Mozambique", code: "+258", flag: "🇲🇿" },
    { id: 151, name: "Myanmar", code: "+95", flag: "🇲🇲" },
    { id: 152, name: "Namibia", code: "+264", flag: "🇳🇦" },
    { id: 153, name: "Nauru", code: "+674", flag: "🇳🇷" },
    { id: 154, name: "Nepal", code: "+977", flag: "🇳🇵" },
    { id: 156, name: "Netherlands", code: "+31", flag: "🇳🇱" },
    { id: 157, name: "New Caledonia", code: "+687", flag: "🇳🇨" },
    { id: 158, name: "New Zealand", code: "+64", flag: "🇳🇿" },
    { id: 159, name: "Nicaragua", code: "+505", flag: "🇳🇮" },
    { id: 160, name: "Niger", code: "+227", flag: "🇳🇪" },
    { id: 161, name: "Nigeria", code: "+234", flag: "🇳🇬" },
    { id: 115, name: "North Korea", code: "+850", flag: "🇰🇵" },
    { id: 129, name: "North Macedonia", code: "+389", flag: "🇲🇰" },
    { id: 165, name: "Norway", code: "+47", flag: "🇳🇴" },
    { id: 166, name: "Oman", code: "+968", flag: "🇴🇲" },
    { id: 167, name: "Pakistan", code: "+92", flag: "🇵🇰" },
    { id: 168, name: "Palau", code: "+680", flag: "🇵🇼" },
    { id: 169, name: "Palestinian Territory Occupied", code: "+970", flag: "🇵🇸" },
    { id: 170, name: "Panama", code: "+507", flag: "🇵🇦" },
    { id: 171, name: "Papua New Guinea", code: "+675", flag: "🇵🇬" },
    { id: 172, name: "Paraguay", code: "+595", flag: "🇵🇾" },
    { id: 173, name: "Peru", code: "+51", flag: "🇵🇪" },
    { id: 174, name: "Philippines", code: "+63", flag: "🇵🇭" },
    { id: 176, name: "Poland", code: "+48", flag: "🇵🇱" },
    { id: 177, name: "Portugal", code: "+351", flag: "🇵🇹" },
    { id: 178, name: "Puerto Rico", code: "+1 787", flag: "🇵🇷" },
    { id: 179, name: "Qatar", code: "+974", flag: "🇶🇦" },
    { id: 180, name: "Reunion", code: "+262", flag: "🇷🇪" },
    { id: 181, name: "Romania", code: "+40", flag: "🇷🇴" },
    { id: 182, name: "Russia", code: "+7", flag: "🇷🇺" },
    { id: 183, name: "Rwanda", code: "+250", flag: "🇷🇼" },
    { id: 185, name: "Saint Kitts and Nevis", code: "+1 869", flag: "🇰🇳" },
    { id: 186, name: "Saint Lucia", code: "+1 758", flag: "🇱🇨" },
    { id: 188, name: "Saint Vincent and the Grenadines", code: "+1 784", flag: "🇻🇨" },
    { id: 191, name: "Samoa", code: "+685", flag: "🇼🇸" },
    { id: 192, name: "San Marino", code: "+378", flag: "🇸🇲" },
    { id: 193, name: "Sao Tome and Principe", code: "+239", flag: "🇸🇹" },
    { id: 194, name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
    { id: 195, name: "Senegal", code: "+221", flag: "🇸🇳" },
    { id: 196, name: "Serbia", code: "+381", flag: "🇷🇸" },
    { id: 197, name: "Seychelles", code: "+248", flag: "🇸🇨" },
    { id: 198, name: "Sierra Leone", code: "+232", flag: "🇸🇱" },
    { id: 199, name: "Singapore", code: "+65", flag: "🇸🇬" },
    { id: 200, name: "Slovakia", code: "+421", flag: "🇸🇰" },
    { id: 201, name: "Slovenia", code: "+386", flag: "🇸🇮" },
    { id: 202, name: "Solomon Islands", code: "+677", flag: "🇸🇧" },
    { id: 203, name: "Somalia", code: "+252", flag: "🇸🇴" },
    { id: 204, name: "South Africa", code: "+27", flag: "🇿🇦" },
    { id: 116, name: "South Korea", code: "+82", flag: "🇰🇷" },
    { id: 206, name: "South Sudan", code: "+211", flag: "🇸🇸" },
    { id: 207, name: "Spain", code: "+34", flag: "🇪🇸" },
    { id: 208, name: "Sri Lanka", code: "+94", flag: "🇱🇰" },
    { id: 209, name: "Sudan", code: "+249", flag: "🇸🇩" },
    { id: 210, name: "Suriname", code: "+597", flag: "🇸🇷" },
    { id: 213, name: "Sweden", code: "+46", flag: "🇸🇪" },
    { id: 214, name: "Switzerland", code: "+41", flag: "🇨🇭" },
    { id: 215, name: "Syria", code: "+963", flag: "🇸🇾" },
    { id: 216, name: "Taiwan", code: "+886", flag: "🇹🇼" },
    { id: 217, name: "Tajikistan", code: "+992", flag: "🇹🇯" },
    { id: 218, name: "Tanzania", code: "+255", flag: "🇹🇿" },
    { id: 219, name: "Thailand", code: "+66", flag: "🇹🇭" },
    { id: 17, name: "The Bahamas", code: "+1 242", flag: "🇧🇸" },
    { id: 80, name: "The Gambia", code: "+220", flag: "🇬🇲" },
    { id: 63, name: "Timor-Leste", code: "+670", flag: "🇹🇱" },
    { id: 220, name: "Togo", code: "+228", flag: "🇹🇬" },
    { id: 222, name: "Tonga", code: "+676", flag: "🇹🇴" },
    { id: 223, name: "Trinidad and Tobago", code: "+1 868", flag: "🇹🇹" },
    { id: 224, name: "Tunisia", code: "+216", flag: "🇹🇳" },
    { id: 225, name: "Turkey", code: "+90", flag: "🇹🇷" },
    { id: 226, name: "Turkmenistan", code: "+993", flag: "🇹🇲" },
    { id: 228, name: "Tuvalu", code: "+688", flag: "🇹🇻" },
    { id: 229, name: "Uganda", code: "+256", flag: "🇺🇬" },
    { id: 230, name: "Ukraine", code: "+380", flag: "🇺🇦" },
    { id: 231, name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
    { id: 232, name: "United Kingdom", code: "+44", flag: "🇬🇧" },
    { id: 233, name: "United States", code: "+1", flag: "🇺🇸" },
    { id: 235, name: "Uruguay", code: "+598", flag: "🇺🇾" },
    { id: 236, name: "Uzbekistan", code: "+998", flag: "🇺🇿" },
    { id: 237, name: "Vanuatu", code: "+678", flag: "🇻🇺" },
    { id: 239, name: "Venezuela", code: "+58", flag: "🇻🇪" },
    { id: 240, name: "Vietnam", code: "+84", flag: "🇻🇳" },
    { id: 242, name: "Virgin Islands (US)", code: "+1 284", flag: "🇻🇮" },
    { id: 243, name: "Wallis and Futuna Islands", code: "+681", flag: "🇼🇫" },
    { id: 245, name: "Yemen", code: "+967", flag: "🇾🇪" },
    { id: 246, name: "Zambia", code: "+260", flag: "🇿🇲" },
    { id: 247, name: "Zimbabwe", code: "+263", flag: "🇿🇼" },
];

const INDIA_FIELDS = [
    { key: "district", label: "District", required: true, placeholder: "Auto filled", readonly: true },
    {
        key: "block",
        label: "Block",
        required: true,
        type: "select",
        placeholder: "Select block",
    },
    { key: "location", label: "Location / Area", required: false, placeholder: "Enter location / area" },
];

const DEFAULT_COUNTRY_FIELDS = [
    { key: "city", label: "City", required: true, placeholder: "Enter city" },
    { key: "location", label: "Location / Area", required: false, placeholder: "Enter location / area" },
];

// Precomputed once at module load: O(1) lookup instead of re-scanning the
// 218-entry COUNTRIES array and rebuilding config objects on every render.
// India keeps its special PIN-driven district/block flow; every other
// country falls back to a simple state/city/location flow (the pattern
// previously hardcoded only for "United States").
const INDIA_STATE_CFG = { placeholder: "Auto filled", readonly: true, required: true };
const DEFAULT_STATE_CFG = { placeholder: "Enter state", readonly: false, required: true };

const COUNTRY_CONFIG_MAP = new Map(
    COUNTRIES.map((meta) => {
        const isIndia = meta.name === "India";
        return [
            meta.name,
            {
                id: meta.id,
                flag: meta.flag,
                code: meta.code,
                pinRequired: isIndia,
                state: isIndia ? INDIA_STATE_CFG : DEFAULT_STATE_CFG,
                fields: isIndia ? INDIA_FIELDS : DEFAULT_COUNTRY_FIELDS,
            },
        ];
    })
);

const getCountryConfig = (countryName) => {
    return COUNTRY_CONFIG_MAP.get(countryName) || COUNTRY_CONFIG_MAP.get("India");
}

const SUBTITLES = {
    business: "Please provide your details below. All fields marked with * are mandatory.",
    dealership:
        "Interested in becoming our dealer or distributor? Please share your details with us. All fields marked with* are mandatory.",
    joborothers:
        "Have a job enquiry or any other question? Share your details below and we'll get back to you. All fields marked with* are mandatory.",
    none: "Please provide your details below. All fields marked with * are mandatory.",
};

const emptyModalState = () => {
    return {
        vertical: "CRM",
        product: "",
        subProducts: [],
        subProductOther: "",
        spec: "",
        qty: "0",
        uom: "MT",
        requirement: "",
        territory: "",
        why: "",
    };
};

/* ================= COMPONENT ================= */

const Contactform = () => {
    /* ---------------- Basic Information ---------------- */
    const router = useRouter();
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [companyName, setCompanyName] = React.useState("");
    const [country, setCountry] = React.useState("India");
    const [countrySearch, setCountrySearch] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [emailId, setEmailId] = React.useState("");
    const [pinCode, setPinCode] = React.useState("");
    const [pinLookupStatus, setPinLookupStatus] = React.useState("idle"); // idle | loading | done | notfound
    const [stateInput, setStateInput] = React.useState("");
    const [district, setDistrict] = React.useState("");
    const [districtCode, setDistrictCode] = React.useState("");
    const [blockValue, setBlockValue] = React.useState("");
    const [blockOptions, setBlockOptions] = React.useState([]);
    const [blockLookupStatus, setBlockLookupStatus] = React.useState("idle"); // idle | loading | done | empty
    const [location, setLocation] = React.useState("");
    const [city, setCity] = React.useState("");
    const [stateId, setStateId] = React.useState(null);
    const [stateOptions, setStateOptions] = React.useState([]);
    const [cityOptions, setCityOptions] = React.useState([]);

    /* ---------------- Purpose -> Customer Type -> Sub Type ---------------- */
    const [purpose, setPurpose] = React.useState(null);
    const [purposeGroup, setPurposeGroup] = React.useState(null);
    const [purposeIndex, setPurposeIndex] = React.useState(null);
    const [customerType, setCustomerType] = React.useState("");
    const [custTypeIndex, setCustTypeIndex] = React.useState(null);
    const [subType, setSubType] = React.useState("");
    const [subTypeIndex, setSubTypeIndex] = React.useState(null);

    /* ---------------- Section 3 data ---------------- */
    const [businessRequirements, setBusinessRequirements] = React.useState([]);
    const [productInterests, setProductInterests] = React.useState([]);
    const [jobDescription, setJobDescription] = React.useState("");
    const [attachment, setAttachment] = React.useState(null); // single File | null (Job & Others only)
    const [attachmentError, setAttachmentError] = React.useState("");
    const attachmentInputRef = React.useRef(null);

    /* ---------------- Section 4 ---------------- */
    const [remarks, setRemarks] = React.useState("");

    /* ---------------- Consent ---------------- */
    const [agreeChecked, setAgreeChecked] = React.useState(false);

    /* ---------------- Dropdown open state ---------------- */
    const [openDropdown, setOpenDropdown] = React.useState(null); // "country" | "purpose" | "customerType" | "subType" | "block" | "vertical" | "product" | "subProduct" | "uom" | null

    /* ---------------- Add Product Requirement / Interest modal ---------------- */
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalMode, setModalMode] = React.useState("business");
    const [modalEditIndex, setModalEditIndex] = React.useState(-1);
    const [modalData, setModalData] = React.useState(emptyModalState());

    /* ---------------- Privacy policy modal ---------------- */
    const [showPrivacyModal, setShowPrivacyModal] = React.useState(false);
    const [hasScrolledToEnd, setHasScrolledToEnd] = React.useState(false);
    const modalBodyRef = React.useRef(null);

    /* ---------------- Submit / toast ---------------- */
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [emailError, setEmailError] = React.useState(""); // red hint under Email ID

    const [showToast, setShowToast] = React.useState(false);

    const cfg = React.useMemo(() => getCountryConfig(country), [country]);
    const phoneRule = React.useMemo(() => getPhoneRule(country, cfg.code), [country, cfg.code]);

    /* ---------------- India: PIN code -> auto-fill State + District ----------------
      Flow: user types a 6-digit PIN -> we look it up in india-pincodes.js ->
      on a hit we auto-fill State (read-only) and District (read-only), which
      in turn drives the District -> Block effect below via `districtCode`.
      Every time the PIN changes (or fails to resolve) we also clear whatever
      block was previously selected, since a new/failed PIN means the old
      block choice no longer belongs to the current district. */
    React.useEffect(() => {
        if (country !== "India") return;

        const pin = pinCode.trim();

        if (!/^\d{6}$/.test(pin)) {
            setTimeout(() => {
                setPinLookupStatus("idle");
                setStateInput("");
                setDistrict("");
                setDistrictCode("");
                setBlockValue("");
            }, 0);
            return;
        }

        let cancelled = false;

        setTimeout(() => {
            setPinLookupStatus("loading");
        }, 0);

        const timer = setTimeout(async () => {
            try {
                const { default: INDIA_PINCODES } = await import(
                    "../../data/locations/india-pincodes.js"
                );

                if (cancelled) return;

                const entry = INDIA_PINCODES[pin];

                if (!entry) {
                    setStateInput("");
                    setDistrict("");
                    setDistrictCode("");
                    setBlockValue("");
                    setPinLookupStatus("notfound");
                    return;
                }

                setStateInput(entry.state || "");
                setDistrict(entry.district || "");
                setBlockValue("");

                setDistrictCode(
                    entry.districtCode != null
                        ? String(entry.districtCode)
                        : ""
                );

                setPinLookupStatus("done");

            } catch (error) {
                if (cancelled) return;

                console.error("PIN code lookup failed:", error);

                setPinLookupStatus("notfound");
            }
        }, 250);

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };

    }, [pinCode, country]);

    /* ---------------- India: District -> Block dropdown ----------------
      Fires whenever `districtCode` changes (i.e. right after a successful
      PIN lookup above). Loads india-blocks.js, which is keyed by district
      code with the shape `{ [districtCode]: { blocks: [{code,name}, ...] } }`,
      and populates the Block dropdown from `entry.blocks`. */
    React.useEffect(() => {
        let cancelled = false;

        if (country !== "India" || !districtCode) {
            setTimeout(() => {
                setBlockOptions([]);
                setBlockLookupStatus("idle");
            }, 0);
            return;
        }

        const loadBlocks = async () => {
            try {
                setBlockLookupStatus("loading");
                const { default: INDIA_BLOCKS } = await import("../../data/locations/india-blocks.js");
                if (cancelled) return;

                const entry = INDIA_BLOCKS[districtCode];
                const list = entry && Array.isArray(entry.blocks) ? entry.blocks : [];
                setBlockOptions(list);
                setBlockLookupStatus(list.length ? "done" : "empty");
            } catch (error) {
                if (cancelled) return;
                console.error("Block lookup failed:", error);
                setBlockOptions([]);
                setBlockLookupStatus("empty");
            }
        };

        loadBlocks();
        return () => {
            cancelled = true;
        };
    }, [districtCode, country]);

    /* ---------------- Rest of world: Country -> State list (static import, no fetch needed) ---------------- */
    React.useEffect(() => {
        let cancelled = false;

        if (country === "India" || !cfg.id) {
            setTimeout(() => {
                setStateOptions([]);
            }, 0);
            return;
        }

        const loadStates = async () => {
            try {
                const { default: STATES_BY_COUNTRY } = await import(
                    "../../data/locations/states.js"
                );

                if (cancelled) return;

                setStateOptions(STATES_BY_COUNTRY[cfg.id] || []);

            } catch (error) {
                if (cancelled) return;

                console.error("State lookup failed:", error);

                setStateOptions([]);
            }
        };

        loadStates();
        return () => {
            cancelled = true;
        };
    }, [country, cfg.id]);

    /* ---------------- Rest of world: State -> City list ---------------- */
    React.useEffect(() => {
        if (country === "India" || !cfg.id || !stateId) {
            const t = setTimeout(() => setCityOptions([]), 0);
            return () => clearTimeout(t);
        }
        let cancelled = false;
        import(`../../data/locations/cities/${cfg.id}.js`).then((mod) => {
            if (!cancelled) setCityOptions(mod.default[stateId] || []);
        }).catch(() => {
            if (!cancelled) setCityOptions([]);
        });
        return () => {
            cancelled = true;
        };
    }, [country, cfg.id, stateId]);

    function handleStateSelect(s) {
        setStateInput(s.name);
        setStateId(s.id);
        setCity("");
        setOpenDropdown(null);
    }

    function handleCitySelect(c) {
        setCity(c.name);
        setOpenDropdown(null);
    }

    /* ---------------- Close dropdowns on outside click ---------------- */
    React.useEffect(() => {
        function handleDocClick(e) {
            if (!e.target.closest(".dd")) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("click", handleDocClick);
        return () => document.removeEventListener("click", handleDocClick);
    }, []);

    /* ---------------- Privacy modal: auto-pass if content doesn't overflow ---------------- */
    React.useEffect(() => {
        if (showPrivacyModal) {
            const el = modalBodyRef.current;
            if (el && el.scrollHeight <= el.clientHeight + 8) {
                setHasScrolledToEnd(true);
            }
        }
    }, [showPrivacyModal]);

    /* ---------------- Title / subtitle ---------------- */
    const title = (() => {
        const prefix = country === "India" ? "Domestic" : "Export";
        if (purposeGroup === "business") return `${prefix} (Business Enquiry)`;
        if (purposeGroup === "dealership") return `${prefix} Dealership / Distributorship Enquiry`;
        if (purposeGroup === "joborothers") return `${prefix} Enquiry (Job / Others)`;
        return `${prefix} Enquiry`;
    })();

    const subtitleRaw = SUBTITLES[purposeGroup || "none"];
    const subtitleParts = subtitleRaw.split("*");

    const purposeOptions = React.useMemo(
        () => (country === "India" ? PURPOSE_OPTIONS : PURPOSE_OPTIONS.filter((p) => p.purposeIndex === "p0")),
        [country]
    );

    const customerTypeOptions = React.useMemo(
        () => (purposeIndex ? CUSTOMER_TYPE_OPTIONS.filter((c) => c.purposeGroup === purposeIndex) : []),
        [purposeIndex]
    );

    const subTypeOptions = React.useMemo(
        () => (custTypeIndex ? SUB_TYPE_OPTIONS.filter((s) => s.customerGroup === custTypeIndex) : []),
        [custTypeIndex]
    );

    const modalSubProducts = React.useMemo(
        () => getSubProducts(modalData.vertical, modalData.product),
        [modalData.vertical, modalData.product]
    );

    // Gauge Category column appears only when at least one row is ALUMINIUM.
    const showReqGauge = businessRequirements.some((r) => r.vertical === "ALUMINIUM");
    const showInterestGauge = productInterests.some((r) => r.vertical === "ALUMINIUM");

    const filteredCountries = React.useMemo(() => {
        const q = countrySearch.trim().toLowerCase();
        return q ? COUNTRIES.filter((c) => c.name.toLowerCase().includes(q)) : COUNTRIES;
    }, [countrySearch]);

    /* ---------------- Handlers ---------------- */

    /* ---------------- Job & Others attachment: one file only ----------------
       A valid new file replaces the current one; an invalid file is rejected
       and the current one (if any) is kept. */
    function handleAttachmentChange(e) {
        const picked = Array.from(e.target.files || []);
        e.target.value = ""; // allow picking the same file again later
        if (!picked.length) return;

        const file = picked[0];
        const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

        if (!ATTACHMENT_EXTENSIONS.includes(ext)) {
            setAttachmentError(`${file.name} — only PDF, DOC or DOCX files are allowed.`);
            return;
        }
        if (file.size > ATTACHMENT_MAX_SIZE) {
            setAttachmentError(`${file.name} — file is larger than 5 MB.`);
            return;
        }
        setAttachment(file);
        setAttachmentError(picked.length > 1 ? "Only one file can be attached — the first one was used." : "");
    }

    function removeAttachment() {
        setAttachment(null);
        setAttachmentError("");
    }

    function resetPurposeChain() {
        setPurpose(null);
        setPurposeGroup(null);
        setPurposeIndex(null);
        setCustomerType("");
        setCustTypeIndex(null);
        setSubType("");
        setSubTypeIndex(null);
        removeAttachment();
    }

    function handleCountrySelect(c) {
        setCountry(c);
        setOpenDropdown(null);
        setCountrySearch("");
        setDistrict("");
        setDistrictCode("");
        setBlockValue("");
        setBlockOptions([]);
        setBlockLookupStatus("idle");
        setLocation("");
        setCity("");
        setStateInput("");
        setStateId(null);
        setStateOptions([]);
        setCityOptions([]);
        setPinCode("");
        setPinLookupStatus("idle");
        // Keep the typed phone number but cut it to the new country's max length.
        setPhoneNumber((prev) => prev.slice(0, getPhoneRule(c, getCountryConfig(c).code).max));
        if (c !== "India" && purposeIndex !== "p0") {
            resetPurposeChain();
        }
    }

    function handlePurposeSelect(p) {
        setPurpose(p.label);
        setPurposeGroup(p.group);
        setPurposeIndex(p.purposeIndex);
        setSubType("");
        setSubTypeIndex(null);
        // The attachment belongs to Job & Others only.
        if (p.group !== "joborothers") removeAttachment();

        // Auto-pick the customer type when the purpose has exactly one (e.g. Job & Others).
        const cts = CUSTOMER_TYPE_OPTIONS.filter((c) => c.purposeGroup === p.purposeIndex);
        if (cts.length === 1) {
            setCustomerType(cts[0].label);
            setCustTypeIndex(cts[0].custTypeIndex);
        } else {
            setCustomerType("");
            setCustTypeIndex(null);
        }
        setOpenDropdown(null);
    }

    function handleCustomerTypeSelect(c) {
        setCustomerType(c.label);
        setCustTypeIndex(c.custTypeIndex);
        setSubType("");
        setSubTypeIndex(null);
        setOpenDropdown(null);
    }

    function handleSubTypeSelect(s) {
        setSubType(s.label);
        setSubTypeIndex(s.subTypeIndex);
        setOpenDropdown(null);
    }

    // function openModal(mode, editIndex = -1) {
    //     setModalMode(mode);
    //     setModalEditIndex(editIndex);
    //     if (editIndex >= 0) {
    //         const src = mode === "business" ? businessRequirements[editIndex] : productInterests[editIndex];
    //         const subs = getSubProducts(src.vertical, src.product);
    //         // The saved subProduct array is mapped back to selections; an entry
    //         // not in the list was typed under OTHER (SPECIFY).
    //         // Accepts the array shape as well as a legacy "A, B" string, and
    //         // matches ignoring case / stray spaces so ticks are always restored.
    //         const savedRaw = getSavedSubProducts(src);
    //         const saved = (
    //             Array.isArray(savedRaw)
    //                 ? savedRaw
    //                 : typeof savedRaw === "string"
    //                     ? savedRaw.split(",")
    //                     : []
    //         )
    //             .map((s) => String(s).trim())
    //             .filter(Boolean);
    //         const norm = (s) => s.toLowerCase().replace(/\s+/g, " ");
    //         const findOption = (s) => subs.find((o) => norm(o) === norm(s));
    //         const known = subs.filter((o) => o !== OTHER_SUB_PRODUCT && saved.some((s) => norm(s) === norm(o)));
    //         const typed = saved.filter((s) => !findOption(s) || findOption(s) === OTHER_SUB_PRODUCT);
    //         // eslint-disable-next-line no-unused-vars
    //         const { subProduct: _savedSubProduct, subProducts: _savedSubProducts, ...rest } = src;
    //         setModalData({
    //             ...emptyModalState(),
    //             ...rest,
    //             subProducts: typed.length ? [...known, OTHER_SUB_PRODUCT] : known,
    //             subProductOther: typed.join(SUB_PRODUCT_SEPARATOR),
    //         });
    //     } else {
    //         setModalData(emptyModalState());
    //     }
    //     setOpenDropdown(null);
    //     setModalOpen(true);
    // }
    function openModal(mode, editIndex = -1) {
        setModalMode(mode);
        setModalEditIndex(editIndex);

        if (editIndex >= 0) {
            const src = mode === "business"
                ? businessRequirements[editIndex]
                : productInterests[editIndex];

            // Only allow products belonging to CRM.
            const isValidCRMProduct = PRODUCTS_BY_VERTICAL.CRM.some(
                (p) => p.name === src.product
            );

            const subs = getSubProducts("CRM", src.product);

            const savedRaw = getSavedSubProducts(src);

            const saved = (
                Array.isArray(savedRaw)
                    ? savedRaw
                    : typeof savedRaw === "string"
                        ? savedRaw.split(",")
                        : []
            )
                .map((s) => String(s).trim())
                .filter(Boolean);

            const norm = (s) => s.toLowerCase().replace(/\s+/g, " ");

            const findOption = (s) =>
                subs.find((o) => norm(o) === norm(s));

            const known = subs.filter(
                (o) =>
                    o !== OTHER_SUB_PRODUCT &&
                    saved.some((s) => norm(s) === norm(o))
            );

            const typed = saved.filter(
                (s) =>
                    !findOption(s) ||
                    findOption(s) === OTHER_SUB_PRODUCT
            );

            const {
                subProduct: _savedSubProduct,
                subProducts: _savedSubProducts,
                ...rest
            } = src;

            setModalData({
                ...emptyModalState(),
                ...rest,

                // Force CRM regardless of previously saved vertical.
                vertical: "CRM",

                // Retain only products available under CRM.
                product: isValidCRMProduct ? src.product : "",

                subProducts: typed.length
                    ? [...known, OTHER_SUB_PRODUCT]
                    : known,

                subProductOther: typed.join(SUB_PRODUCT_SEPARATOR),
            });

        } else {
            setModalData(emptyModalState());
        }

        setOpenDropdown(null);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setOpenDropdown(null);
    }

    function toggleSubProduct(s) {
        setModalData((prev) => {
            const subProducts = prev.subProducts.includes(s)
                ? prev.subProducts.filter((x) => x !== s)
                : [...prev.subProducts, s];
            return {
                ...prev,
                subProducts,
                subProductOther: subProducts.includes(OTHER_SUB_PRODUCT) ? prev.subProductOther : "",
            };
        });
    }

    function validateModal() {
        const e = {};
        const d = modalData;
        if (!d.vertical) e.vertical = "Please select a vertical.";
        if (!d.product) e.product = "Please select a product.";
        if (modalSubProducts.length) {
            if (!d.subProducts.length) e.subProducts = "Please select at least one gauge category.";
            else if (d.subProducts.includes(OTHER_SUB_PRODUCT) && !d.subProductOther.trim())
                e.subProductOther = "Please specify the gauge category.";
        }
        if (modalMode === "business") {
            const qty = Number(d.qty);
            if (!String(d.qty).trim()) e.qty = "Quantity is required.";
            else if (!Number.isFinite(qty) || qty <= 0) e.qty = "Quantity must be greater than 0.";
            if (!d.uom) e.uom = "Please select a unit of measure.";
            if (!d.requirement.trim()) e.requirement = "Please describe your requirement.";
        } else {
            if (!d.territory.trim()) e.territory = "Territory of interest is required.";
            if (!d.why.trim()) e.why = "Please tell us why you are interested.";
        }
        return Object.fromEntries(Object.entries(e).filter(([, v]) => v));
    }

    function saveModal() {
        const hasOther = modalData.subProducts.includes(OTHER_SUB_PRODUCT);
        const mErrors = Object.values(validateModal());
        if (mErrors.length) {
            alert(mErrors[0]);
            return;
        }
        // Array of strings in list order (not click order), with the OTHER text last.
        // Products without Gauge Categories send an empty array.
        const subProduct = !modalSubProducts.length
            ? []
            : [
                ...modalSubProducts.filter((s) => s !== OTHER_SUB_PRODUCT && modalData.subProducts.includes(s)),
                ...(hasOther ? [modalData.subProductOther.trim()] : []),
            ];

        if (modalMode === "business") {
            const record = {
                vertical: modalData.vertical,
                product: modalData.product,
                subProducts: subProduct,
                spec: modalData.spec,
                qty: modalData.qty,
                uom: modalData.uom,
                requirement: modalData.requirement,
            };
            setBusinessRequirements((prev) => {
                if (modalEditIndex >= 0) {
                    const copy = [...prev];
                    copy[modalEditIndex] = record;
                    return copy;
                }
                return [...prev, record];
            });
        } else {
            const record = {
                vertical: modalData.vertical,
                product: modalData.product,
                subProduct,
                territory: modalData.territory,
                why: modalData.why,
            };
            setProductInterests((prev) => {
                if (modalEditIndex >= 0) {
                    const copy = [...prev];
                    copy[modalEditIndex] = record;
                    return copy;
                }
                return [...prev, record];
            });
        }
        closeModal();
    }

    function deleteRequirement(i) {
        setBusinessRequirements((prev) => prev.filter((_, idx) => idx !== i));
    }
    function deleteInterest(i) {
        setProductInterests((prev) => prev.filter((_, idx) => idx !== i));
    }

    /* ---------------- Privacy modal handlers ---------------- */

    function handlePrivacyCheckboxClick(e) {
        e.preventDefault();
        if (agreeChecked) {
            setAgreeChecked(false);
            return;
        }
        setHasScrolledToEnd(false);
        setShowPrivacyModal(true);
    }

    function openPrivacyModalForViewing(e) {
        e.preventDefault();
        setHasScrolledToEnd(false);
        setShowPrivacyModal(true);
    }

    function handleModalScroll(e) {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollTop + clientHeight >= scrollHeight - 8) {
            setHasScrolledToEnd(true);
        }
    }

    function handlePrivacyAgree() {
        if (!hasScrolledToEnd) return;
        setAgreeChecked(true);
        setShowPrivacyModal(false);
    }

    /* ---------------- Clear / Submit ---------------- */

    function clearForm() {
        setFirstName("");
        setLastName("");
        setCompanyName("");
        setPhoneNumber("");
        setEmailId("");
        setPinCode("");
        setPinLookupStatus("idle");
        setStateInput("");
        setStateId(null);
        setStateOptions([]);
        setDistrict("");
        setDistrictCode("");
        setBlockValue("");
        setBlockOptions([]);
        setBlockLookupStatus("idle");
        setLocation("");
        setCity("");
        setCityOptions([]);
        setAgreeChecked(false);
        setBusinessRequirements([]);
        setProductInterests([]);
        setJobDescription("");
        setRemarks("");
        setEmailError("");
        resetPurposeChain();
    }

    /* ---------------- Full-form validation ---------------- */
    function validateForm() {
        const e = {};
        const isIndia = country === "India";

        // Section 1 — Basic information
        const fn = firstName.trim();
        if (!fn) e.firstName = "First name is required.";
        else if (fn.length < 2 || !NAME_RE.test(fn)) e.firstName = "Enter a valid first name (letters only, min 2).";
        const ln = lastName.trim();
        if (!ln) e.lastName = "Last name is required.";
        else if (!NAME_RE.test(ln)) e.lastName = "Enter a valid last name (letters only).";
        if (companyName.length > COMPANY_MAX) e.companyName = `Max ${COMPANY_MAX} characters.`;

        if (!phoneNumber) e.phone = "Phone number is required.";
        else if (isIndia && !INDIA_MOBILE_RE.test(phoneNumber))
            e.phone = phoneNumber.length !== 10 ? "Phone number must be exactly 10 digits." : "Enter a valid Indian mobile number (starts with 6-9).";
        else if (!isIndia && (phoneNumber.length < phoneRule.min || phoneNumber.length > phoneRule.max))
            e.phone = `Phone number must be ${phoneRule.min}-${phoneRule.max} digits.`;

        const em = emailId.trim();
        if (!em) e.email = "Email ID is required.";
        else if (!EMAIL_RE.test(em)) e.email = "Enter a valid email ID (e.g. name@company.com).";

        if (isIndia) {
            if (!pinCode) e.pinCode = "PIN code is required.";
            else if (!/^\d{6}$/.test(pinCode)) e.pinCode = "PIN code must be 6 digits.";
            else if (pinLookupStatus === "notfound" || !stateInput || !district) e.pinCode = "PIN code not found. Please check it.";
            if (districtCode && blockOptions.length && !blockValue) e.block = "Please select a block.";
        } else {
            if (pinCode && !FOREIGN_POSTCODE_RE.test(pinCode)) e.pinCode = "Enter a valid postal code.";
            if (!stateInput.trim()) e.state = "State is required.";
            if (!city.trim()) e.city = "City is required.";
        }
        if (location.length > LOCATION_MAX) e.location = `Max ${LOCATION_MAX} characters.`;

        // Section 2 — Purpose chain
        if (!purposeGroup) e.purpose = "Please select a purpose.";
        else if (!customerType) e.customerType = "Please select a customer type.";
        else if (subTypeOptions.length && !subType) e.subType = "Please select a sub type.";

        // Section 3 — depends on purpose
        if (purposeGroup === "business" && !businessRequirements.length)
            e.businessRequirements = "Please add at least one product requirement.";
        if (purposeGroup === "dealership" && !productInterests.length)
            e.productInterests = "Please add at least one product interest.";
        if (purposeGroup === "joborothers") {
            const jd = jobDescription.trim();
            if (!jd) e.jobDescription = "Please describe your enquiry.";
            else if (jd.length < JOB_DESCRIPTION_MIN) e.jobDescription = `Please enter at least ${JOB_DESCRIPTION_MIN} characters.`;
        }

        // Consent
        if (!agreeChecked) e.privacy = "Please agree to the Privacy Policy before submitting.";
        return e;
    }

    async function handleSubmit() {
        // Same alert pop-up as before; shows the first problem found, top to bottom.
        const em = emailId.trim();
        setEmailError(!em ? "Email ID is required" : !EMAIL_RE.test(em) ? "Enter a valid email ID" : "");
        const formErrors = Object.values(validateForm());
        if (formErrors.length) {
            alert(formErrors[0]);
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                companyName: companyName.trim(),
                country,
                phone: `${cfg.code} ${phoneNumber}`,
                email: emailId.trim(),
                pinCode,
                state: stateInput,
                district,
                block: blockValue,
                location,
                city,
                purpose,
                purposeGroup,
                customerType,
                subType,
                businessRequirements,
                productInterests,
                jobDescription,
                remarks,
                privacyAccepted: agreeChecked,
                status: "Pending",
            };

            const file = purposeGroup === "joborothers" ? attachment : null;
            let response;

            if (file) {
                // Same fields as the JSON payload; arrays are JSON strings because
                // multipart values are text. The file goes under ATTACHMENT_FIELD.
                const formData = new FormData();
                Object.entries(payload).forEach(([key, value]) => {
                    formData.append(key, Array.isArray(value) ? JSON.stringify(value) : value ?? "");
                });
                formData.append(ATTACHMENT_FIELD, file);

                response = await axiosInstance.post(`/api/enquiries`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                response = await axiosInstance.post(`/api/enquiries`, payload);
            }

            
            if (response.status === 201) {
                clearForm();
                router.push("/thank-you");
            }
            else {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                // setShowToast(false);
            }
        } catch (error) {
            console.error("Inquiry submit error:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    /* ================= RENDER ================= */

    return (
        <div className="contact-form-layout">
            <div className="contact-form-hdr">
                <div className="contact-form-top">
                    <span className="topper-icon">
                        <Image
                            src="/wp-content/themes/sel/assets/img/icons/sub-logo3.svg"
                            alt="sub logo3"
                            width={20}
                            height={20}
                        />
                    </span>
                    <span className="topper-text">Enquiry</span>
                </div>
                <div className="contact-form-hdng">Submit Your Enquiry</div>
            </div>
            <div className="contact-form-container">
                <div className="enq-wrap">
                    <style>
                        {
                            `.enq-wrap{
                            --orange:#F97316;
                            --orange-dark:#EA580C;
                            --orange-soft:#FFF1E7;
                            --ink:#111827;
                            --sub:#6B7280;
                            --sub-light:#9CA3AF;
                            --border:#E2E5EA;
                            --bg-soft:#F9FAFB;
                            --bg-page:#EEF0F3;
                            --danger:#EF4444;
                            --danger-soft:#FDECEC;
                            --link:#2563EB;
                            --radius:10px;
                            --radius-sm:6px;
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                            margin:0;
                            background:var(--bg-page);
                            color:var(--ink);
                            border-radius:14px;
                            box-shadow: 0 0 1rem #E2E5EA;
                            }
                            .enq-wrap *{box-sizing:border-box}
                            .enq-wrap .wrap{margin:0 auto;}
                            .enq-wrap .card{
                            background:#fff;
                            border-radius:14px;
                            padding:20px 24px 22px;
                            box-shadow:0 1px 3px rgba(16,24,40,.06), 0 1px 2px rgba(16,24,40,.04);
                            }
                            .enq-wrap h1{font-size:21px;margin:0 0 3px;letter-spacing:-0.01em;}
                            .enq-wrap .subtitle{color:var(--sub);font-size:13px;margin:0 0 14px;line-height:1.4;}
                            .enq-wrap .subtitle b, .enq-wrap .subtitle strong{color:var(--ink);}
                            .enq-wrap .section{border-top:1px solid var(--border);margin-top:22px;padding-top:20px;}
                            .enq-wrap .section:first-of-type{border-top:none;margin-top:0;padding-top:0;}
                            .enq-wrap .section-head{display:flex;align-items:center;gap:10px;margin-bottom:2px;}
                            .enq-wrap .badge{
                            width:23px;height:23px;border-radius:7px;background:var(--orange);color:#fff;
                            display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex:none;
                            }
                            .enq-wrap .section-title{font-size:14.5px;font-weight:700;margin:0;}
                            .enq-wrap .section-sub{color:var(--sub);font-size:12px;margin:4px 0 8px 0;line-height:1.4;}
                            .enq-wrap .section-body{margin-left:0;}
                            .enq-wrap .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px 14px;margin-top:10px;}
                            .enq-wrap .grid.cols-4{grid-template-columns:repeat(4,1fr);}
                            .enq-wrap .field{display:flex;flex-direction:column;gap:4px;min-width:0;}
                            .enq-wrap .field label{font-size:12.5px;font-weight:600;color:var(--ink);}
                            .enq-wrap .field label .opt{font-weight:400;color:var(--sub-light);font-size:11.5px;}
                            .enq-wrap .req{color:var(--danger);margin-left:2px;}
                            .enq-wrap .hint{font-size:10.5px;color:var(--sub-light);margin-top:-2px;}
                            .enq-wrap input[type=text], .enq-wrap input[type=number], .enq-wrap textarea{
                            width:100%;border:1px solid var(--border);border-radius:var(--radius-sm);
                            padding:8px 10px;font-size:13.5px;color:var(--ink);background:#fff;font-family:inherit;
                            }
                            .enq-wrap input::placeholder, .enq-wrap textarea::placeholder{color:var(--sub-light);}
                            .enq-wrap input:disabled, .enq-wrap input[readonly]{background:var(--bg-soft);color:var(--sub);}
                            .enq-wrap input:focus, .enq-wrap textarea:focus, .enq-wrap .dd-btn:focus{outline:2px solid #C7D2FE;outline-offset:1px;border-color:#A5B4FC;}
                            .enq-wrap textarea{resize:vertical;min-height:64px;}
                            .enq-wrap .phone-row{display:flex;gap:6px;}
                            .enq-wrap .phone-code{
                            display:flex;align-items:center;gap:5px;border:1px solid var(--border);border-radius:var(--radius-sm);
                            padding:0 8px;background:#fff;font-size:13.5px;color:var(--ink);flex:none;white-space:nowrap;
                            }
                            .enq-wrap .charcount{text-align:right;font-size:10.5px;color:var(--sub-light);margin-top:-3px;}

                            .enq-wrap .dd{position:relative;}
                            .enq-wrap .dd-btn{
                            width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;
                            border:1px solid var(--border);border-radius:var(--radius-sm);background:#fff;
                            padding:8px 10px;font-size:13.5px;cursor:pointer;color:var(--ink);text-align:left;
                            }
                            .enq-wrap .dd-btn.placeholder{color:var(--sub-light);}
                            .enq-wrap .dd-btn:disabled{background:var(--bg-soft);color:var(--sub-light);cursor:not-allowed;}
                            .enq-wrap .dd-btn .chip{display:flex;align-items:center;gap:8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
                            .enq-wrap .dd-btn .vbar{width:14px;height:12px;flex:none;position:relative;display:inline-block;}
                            .enq-wrap .dd-btn .vbar::before,.enq-wrap .dd-btn .vbar::after{content:"";position:absolute;left:0;right:0;height:3px;background:var(--orange);border-radius:1px;}
                            .enq-wrap .dd-btn .vbar::before{top:0;}
                            .enq-wrap .dd-btn .vbar::after{bottom:0;}
                            .enq-wrap .dd-btn .vbar span{position:absolute;top:4.5px;left:0;right:0;height:3px;background:var(--orange);border-radius:1px;}
                            .enq-wrap .chev{transition:transform .15s ease;color:var(--sub);flex:none;}
                            .enq-wrap .dd.open .chev{transform:rotate(180deg);}
                            .enq-wrap .dd-panel{
                            position:absolute;left:0;right:0;top:calc(100% + 6px);background:#fff;border:1px solid var(--border);
                            border-radius:var(--radius-sm);box-shadow:0 10px 30px rgba(16,24,40,.14);z-index:40;
                            max-height:280px;overflow-y:auto;display:none;
                            }
                            .enq-wrap .dd.open .dd-panel{display:block;}
                            .enq-wrap .dd-panel .dd-head{padding:8px 12px;font-size:13.5px;font-weight:600;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;}
                            .enq-wrap .dd-search{position:sticky;top:0;background:#fff;padding:8px;border-bottom:1px solid var(--border);z-index:1;}
                            .enq-wrap .dd-search input{width:100%;border:1px solid var(--border);border-radius:var(--radius-sm);padding:6px 9px;font-size:13px;}
                            .enq-wrap .dd-item{padding:8px 12px;font-size:13.5px;color:var(--sub);cursor:pointer;border-bottom:1px solid #F1F2F4;}
                            .enq-wrap .dd-item:last-child{border-bottom:none;}
                            .enq-wrap .dd-item:hover{background:var(--bg-soft);color:var(--ink);}
                            .enq-wrap .dd-item.selected{background:var(--orange-soft);color:var(--ink);font-weight:600;}
                            .enq-wrap .dd-item.strong{font-weight:700;color:var(--ink);}
                            .enq-wrap .dd-item.disabled{cursor:default;color:var(--sub-dark);}
                            .enq-wrap .dd-item.check{display:flex;align-items:center;gap:8px;}
                            .enq-wrap .dd-item.check input{pointer-events:none;flex:none;accent-color:var(--orange);}
                            .enq-wrap .dd-empty{padding:12px;font-size:12.5px;color:var(--sub-light);}
                            .enq-wrap .dd-item .vbar-item{display:inline-block;position:relative;width:14px;height:12px;margin-right:8px;}
                            .enq-wrap .dd-item .vbar-bar{position:absolute;left:0;right:0;height:3px;background:var(--orange);border-radius:1px;}
                            .enq-wrap .dd-item .vbar-top{top:0;}
                            .enq-wrap .dd-item .vbar-mid{top:4.5px;}
                            .enq-wrap .dd-item .vbar-bottom{bottom:0;}

                            .enq-wrap .table-wrap{border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-top:10px;overflow-x:auto;}
                            .enq-wrap table{width:100%;border-collapse:collapse;font-size:12.5px;}
                            .enq-wrap thead th{
                            background:var(--bg-soft);text-align:left;padding:7px 12px;font-weight:600;color:var(--ink);
                            border-bottom:1px solid var(--border);white-space:nowrap;
                            }
                            .enq-wrap tbody td{padding:8px 12px;border-bottom:1px solid var(--border);vertical-align:top;color:var(--ink);}
                            .enq-wrap tbody tr:last-child td{border-bottom:none;}
                            .enq-wrap .req-note{color:var(--sub);font-size:12px;}
                            .enq-wrap .actions a{cursor:pointer;font-size:12px;font-weight:600;margin-right:12px;white-space:nowrap;}
                            .enq-wrap .a-edit{color:var(--link);}
                            .enq-wrap .a-delete{color:var(--danger);}
                            .enq-wrap .table-empty{padding:16px 12px;text-align:center;color:var(--sub-light);font-size:12.5px;}
                            .enq-wrap .row-top{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;}
                            .enq-wrap .add-link{
                            display:inline-flex;align-items:center;gap:6px;color:var(--orange-dark);font-weight:600;font-size:12.5px;
                            cursor:pointer;margin-top:10px;
                            }
                            .enq-wrap .btn{
                            border-radius:8px;padding:9px 16px;font-size:13.5px;font-weight:600;cursor:pointer;border:1px solid transparent;
                            display:inline-flex;align-items:center;gap:8px;
                            }
                            .enq-wrap .btn-outline{background:#fff;border-color:var(--orange);color:var(--orange-dark);}
                            .enq-wrap .btn-outline.plain{border-color:var(--border);color:var(--ink);}
                            .enq-wrap .btn-primary{background:var(--orange);color:#fff;}
                            .enq-wrap .btn-primary:hover{background:var(--orange-dark);}
                            .enq-wrap .btn-primary:disabled{background:#D1D5DB;cursor:not-allowed;}
                            .enq-wrap .btn-sm{padding:7px 12px;font-size:12.5px;}

                            .enq-wrap .upload-box{
                            border:1px dashed var(--border);border-radius:var(--radius);padding:12px 14px;display:flex;align-items:center;
                            justify-content:space-between;gap:14px;background:var(--bg-soft);
                            }
                            .enq-wrap .upload-box .u-text b{display:block;font-size:13px;color:var(--ink);}
                            .enq-wrap .upload-box .u-text span{font-size:11.5px;color:var(--sub-light);}
                            .enq-wrap .files-note{font-size:11px;color:var(--sub-light);margin-top:6px;}

                            .enq-wrap .footer-row{display:flex;align-items:center;gap:8px;margin-top:16px;font-size:13px;color:var(--ink);}
                            .enq-wrap .footer-row a{color:var(--orange-dark);text-decoration:none;font-weight:600;}
                            .enq-wrap .submit-row{display:flex;justify-content:space-between;align-items:center;margin-top:12px;flex-wrap:wrap;gap:10px;}
                            .enq-wrap .secure-note{text-align:center;color:var(--sub-light);font-size:11.5px;margin-top:12px;}
                            .enq-wrap .placeholder-note{
                            background:var(--bg-soft);border:1px dashed var(--border);border-radius:var(--radius);
                            padding:16px;text-align:center;color:var(--sub-light);font-size:13px;margin-top:10px;
                            }

                            .enq-wrap .overlay{
                            position:fixed;inset:0;background:rgba(17,24,39,.45);display:flex;align-items:flex-start;justify-content:center;
                            padding:110px 16px 30px;z-index:9999;overflow-y:auto;
                            }
                            .enq-wrap .modal{
                            background:#fff;border-radius:14px;max-width:640px;width:100%;padding:20px 22px 20px;
                            box-shadow:0 20px 60px rgba(16,24,40,.25);
                            max-height:calc(100vh - 140px);overflow-y:auto;
                            }
                            .enq-wrap .modal-head{display:flex;justify-content:space-between;align-items:flex-start;}
                            .enq-wrap .modal-head h2{font-size:18px;margin:0 0 3px;}
                            .enq-wrap .modal-head p{margin:0;color:var(--sub);font-size:13px;}
                            .enq-wrap .modal-close{background:none;border:none;font-size:19px;color:var(--sub-light);cursor:pointer;line-height:1;padding:2px;}
                            .enq-wrap .modal hr{border:none;border-top:1px solid var(--border);margin:12px 0 14px;}
                            .enq-wrap .modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;}
                            .enq-wrap .modal-grid.cols-3{grid-template-columns:1fr 1fr 1fr;}
                            .enq-wrap .modal-actions{display:flex;justify-content:space-between;align-items:center;margin-top:14px;}
                            .enq-wrap .loc-input{position:relative;}
                            .enq-wrap .loc-input span{position:absolute;left:12px;top:9px;color:var(--sub-light);font-size:13px;}
                            .enq-wrap .loc-input input{padding-left:26px;}

                            @media (max-width:720px){
                            .enq-wrap .grid, .enq-wrap .grid.cols-4{grid-template-columns:1fr 1fr;}
                            .enq-wrap .modal-grid, .enq-wrap .modal-grid.cols-3{grid-template-columns:1fr;}
                            .enq-wrap .card{padding:16px 16px 18px;}
                            .enq-wrap .overlay{padding-top:90px;}
                            .enq-wrap .modal{max-height:calc(100vh - 110px);}
                            }
                            @media (max-width:480px){
                            .enq-wrap .grid, .enq-wrap .grid.cols-4{grid-template-columns:1fr;}
                            }`
                        }
                    </style>

                    {showToast && (
                        <div className="fixed bottom-6 right-6 z-50">
                            <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]">
                                <CheckCircle className="w-6 h-6" />
                                <span className="flex-1 font-medium">Submitted successfully!</span>
                                <button onClick={() => setShowToast(false)}>
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="wrap">
                        <div className="card">
                            <h1>{title}</h1>
                            <p className="subtitle">
                                {subtitleParts[0]}
                                <span className="req">*</span>
                                {subtitleParts[1]}
                            </p>

                            {/* SECTION 1: BASIC INFORMATION */}
                            <div className="section">
                                <div className="section-head">
                                    <div className="badge">1</div>
                                    <h3 className="section-title">Basic Information</h3>
                                </div>
                                <div className="section-body">
                                    <div className="grid cols-4">
                                        <div className="field">
                                            <label>
                                                First Name <span className="req">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter first name"
                                                maxLength={NAME_MAX}
                                                value={firstName}
                                                onChange={(e) => {
                                                    setFirstName(sanitizeName(e.target.value));
                                                }}
                                            />
                                        </div>
                                        <div className="field">
                                            <label>
                                                Last Name <span className="req">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter last name"
                                                maxLength={NAME_MAX}
                                                value={lastName}
                                                onChange={(e) => {
                                                    setLastName(sanitizeName(e.target.value));
                                                }}
                                            />
                                        </div>
                                        <div className="field">
                                            <label>
                                                Company Name <span className="opt">(if applicable)</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter company name"
                                                maxLength={COMPANY_MAX}
                                                value={companyName}
                                                onChange={(e) => {
                                                    setCompanyName(e.target.value.replace(/^\s+/, ""));
                                                }}
                                            />
                                        </div>
                                        <div className="field">
                                            <label>
                                                Country <span className="req">*</span>
                                            </label>
                                            <div className={`dd ${openDropdown === "country" ? "open" : ""}`}>
                                                <button
                                                    type="button"
                                                    className="dd-btn"
                                                    onClick={() => setOpenDropdown(openDropdown === "country" ? null : "country")}
                                                >
                                                    <span className="chip">
                                                        {cfg.flag} {country}
                                                    </span>
                                                    <span className="chev">▾</span>
                                                </button>
                                                <div className="dd-panel">
                                                    <div className="dd-search">
                                                        <input
                                                            type="text"
                                                            placeholder="Search country..."
                                                            value={countrySearch}
                                                            onClick={(e) => e.stopPropagation()}
                                                            onChange={(e) => setCountrySearch(e.target.value)}
                                                        />
                                                    </div>
                                                    {filteredCountries.length ? (
                                                        filteredCountries.map((c) => (
                                                            <div
                                                                key={c.name}
                                                                className={`dd-item ${c.name === country ? "selected" : ""}`}
                                                                onClick={() => handleCountrySelect(c.name)}
                                                            >
                                                                {c.flag} {c.name}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="dd-empty">No countries match {countrySearch}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid cols-4">
                                        <div className="field">
                                            <label>
                                                Phone Number <span className="req">*</span>
                                            </label>
                                            <div className="phone-row">
                                                <div className="phone-code">
                                                    {cfg.flag} <span>{cfg.code}</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    placeholder="Enter phone number"
                                                    maxLength={phoneRule.max}
                                                    value={phoneNumber}
                                                    onChange={(e) => {
                                                        // Digits only, and typing stops at the country's max length (10 for India).
                                                        setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, phoneRule.max));
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label>
                                                Email ID <span className="req">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter email ID"
                                                maxLength={EMAIL_MAX}
                                                value={emailId}
                                                onChange={(e) => {
                                                    setEmailId(sanitizeEmail(e.target.value));
                                                    setEmailError("");
                                                }}
                                                onBlur={() => {
                                                    // Checked as soon as the user leaves the box.
                                                    const em = emailId.trim();
                                                    setEmailError(em && !EMAIL_RE.test(em) ? "Enter a valid email ID" : "");
                                                }}
                                            />
                                            {emailError && (
                                                <div className="hint" style={{ color: "var(--danger)" }}>
                                                    {emailError}
                                                </div>
                                            )}
                                        </div>
                                        <div className="field">
                                            <label>
                                                PIN Code {cfg.pinRequired ? <span className="req">*</span> : <span className="opt">(Optional)</span>}
                                            </label>
                                            <input
                                                type="text"
                                                inputMode={country === "India" ? "numeric" : "text"}
                                                placeholder="Enter PIN code"
                                                maxLength={country === "India" ? 6 : 10}
                                                value={pinCode}
                                                onChange={(e) => {
                                                    // India: 6 digits only. Elsewhere: letters, digits, space, hyphen (max 10).
                                                    setPinCode(
                                                        country === "India"
                                                            ? e.target.value.replace(/[^\d]/g, "").slice(0, 6)
                                                            : e.target.value.replace(/[^A-Za-z0-9 -]/g, "").toUpperCase().slice(0, 10)
                                                    );
                                                }}
                                            />
                                            {cfg.pinRequired && pinLookupStatus === "loading" && <div className="hint">Looking up State & District...</div>}
                                            {cfg.pinRequired && pinLookupStatus === "notfound" && (
                                                <div className="hint" style={{ color: "var(--danger)" }}>
                                                    PIN code not found
                                                </div>
                                            )}
                                            {cfg.pinRequired && pinLookupStatus === "idle" && <div className="hint">Auto-fetches State & District</div>}
                                        </div>
                                        <div className="field">
                                            <label>
                                                State {cfg.state.required ? <span className="req">*</span> : <span className="opt">(Optional)</span>}
                                            </label>
                                            {country === "India" ? (
                                                <input type="text" placeholder={cfg.state.placeholder} readOnly value={stateInput} />
                                            ) : stateOptions.length ? (
                                                <div className={`dd ${openDropdown === "state" ? "open" : ""}`}>
                                                    <button
                                                        type="button"
                                                        className={`dd-btn ${stateInput ? "" : "placeholder"}`}
                                                        onClick={() => setOpenDropdown(openDropdown === "state" ? null : "state")}
                                                    >
                                                        {stateInput || "Select state"}
                                                        <span className="chev">▾</span>
                                                    </button>
                                                    <div className="dd-panel">
                                                        {stateOptions.map((s) => (
                                                            <div
                                                                key={s.id}
                                                                className={`dd-item ${s.id === stateId ? "selected" : ""}`}
                                                                onClick={() => handleStateSelect(s)}
                                                            >
                                                                {s.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <input
                                                    type="text"
                                                    placeholder={cfg.state.placeholder}
                                                    maxLength={LOCATION_MAX}
                                                    value={stateInput}
                                                    onChange={(e) => {
                                                        setStateInput(e.target.value.replace(/^\s+/, ""));
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid cols-4">
                                        {cfg.fields.map((f) => {
                                            if (f.type === "select") {
                                                const options = blockOptions;
                                                const blockPlaceholder = !districtCode
                                                    ? "Enter PIN code first"
                                                    : blockLookupStatus === "loading"
                                                        ? "Loading blocks..."
                                                        : blockLookupStatus === "empty"
                                                            ? "No blocks found for this district"
                                                            : f.placeholder;
                                                return (
                                                    <div className="field" key={f.key}>
                                                        <label>
                                                            {f.label} {f.required ? <span className="req">*</span> : <span className="opt">(Optional)</span>}
                                                        </label>
                                                        <div className={`dd ${openDropdown === "block" ? "open" : ""}`}>
                                                            <button
                                                                type="button"
                                                                className={`dd-btn ${blockValue ? "" : "placeholder"}`}
                                                                disabled={!districtCode || blockLookupStatus === "loading"}
                                                                onClick={() => setOpenDropdown(openDropdown === "block" ? null : "block")}
                                                            >
                                                                {blockValue || blockPlaceholder}
                                                                <span className="chev">▾</span>
                                                            </button>
                                                            <div className="dd-panel">
                                                                {options.length ? (
                                                                    options.map((o) => (
                                                                        <div
                                                                            key={o.code}
                                                                            className={`dd-item ${o.name === blockValue ? "selected" : ""}`}
                                                                            onClick={() => {
                                                                                setBlockValue(o.name);
                                                                                setOpenDropdown(null);
                                                                            }}
                                                                        >
                                                                            {o.name}
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <div className="dd-empty">
                                                                        {districtCode ? "No blocks found for this district" : "Enter a valid PIN code to load blocks"}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            if (f.key === "city" && country !== "India") {
                                                return (
                                                    <div className="field" key={f.key}>
                                                        <label>
                                                            {f.label} {f.required ? <span className="req">*</span> : <span className="opt">(Optional)</span>}
                                                        </label>
                                                        {cityOptions.length ? (
                                                            <div className={`dd ${openDropdown === "city" ? "open" : ""}`}>
                                                                <button
                                                                    type="button"
                                                                    className={`dd-btn ${city ? "" : "placeholder"}`}
                                                                    onClick={() => setOpenDropdown(openDropdown === "city" ? null : "city")}
                                                                >
                                                                    {city || "Select city"}
                                                                    <span className="chev">▾</span>
                                                                </button>
                                                                <div className="dd-panel">
                                                                    {cityOptions.map((c) => (
                                                                        <div
                                                                            key={c.id}
                                                                            className={`dd-item ${c.name === city ? "selected" : ""}`}
                                                                            onClick={() => handleCitySelect(c)}
                                                                        >
                                                                            {c.name}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <input
                                                                type="text"
                                                                placeholder={stateId ? "Enter city" : "Select a state first"}
                                                                maxLength={LOCATION_MAX}
                                                                value={city}
                                                                onChange={(e) => {
                                                                    setCity(e.target.value.replace(/^\s+/, ""));
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                );
                                            }
                                            const val = f.key === "district" ? district : f.key === "location" ? location : f.key === "city" ? city : "";
                                            const setter =
                                                f.key === "district" ? setDistrict : f.key === "location" ? setLocation : f.key === "city" ? setCity : () => { };
                                            return (
                                                <div className="field" key={f.key}>
                                                    <label>
                                                        {f.label} {f.required ? <span className="req">*</span> : <span className="opt">(Optional)</span>}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder={f.placeholder}
                                                        readOnly={f.readonly}
                                                        maxLength={LOCATION_MAX}
                                                        value={val}
                                                        onChange={(e) => {
                                                            setter(e.target.value.replace(/^\s+/, ""));
                                                        }}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 2: PURPOSE -> CUSTOMER TYPE -> SUB TYPE */}
                            <div className="section">
                                <div className="section-head">
                                    <div className="badge">2</div>
                                    <h3 className="section-title">{purposeGroup === "business" || !purposeGroup ? "Purpose of Enquiry" : "Purpose"}</h3>
                                </div>
                                {(purposeGroup === "dealership" || purposeGroup === "joborothers") && (
                                    <p className="section-sub">Please select the purpose of your enquiry.</p>
                                )}
                                <div className="section-body" style={{ marginTop: 2 }}>
                                    <div className="grid">
                                        {/* Purpose */}
                                        <div className="field">
                                            <label>
                                                Select Purpose <span className="req">*</span>
                                            </label>
                                            <div className={`dd ${openDropdown === "purpose" ? "open" : ""}`}>
                                                <button
                                                    type="button"
                                                    className={`dd-btn ${purpose ? "" : "placeholder"}`}
                                                    onClick={() => setOpenDropdown(openDropdown === "purpose" ? null : "purpose")}
                                                >
                                                    {purpose || "Select purpose"}
                                                    <span className="chev">▾</span>
                                                </button>
                                                <div className="dd-panel">
                                                    {purposeOptions.map((p) => (
                                                        <div
                                                            key={p.purposeIndex}
                                                            className={`dd-item ${purposeIndex === p.purposeIndex ? "selected" : ""}`}
                                                            onClick={() => handlePurposeSelect(p)}
                                                        >
                                                            {p.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Customer Type */}
                                        <div className="field">
                                            <label>
                                                Customer Type <span className="req">*</span>
                                            </label>
                                            <div className={`dd ${openDropdown === "customerType" ? "open" : ""}`}>
                                                <button
                                                    type="button"
                                                    className={`dd-btn ${customerType ? "" : "placeholder"}`}
                                                    disabled={!purposeIndex}
                                                    onClick={() => setOpenDropdown(openDropdown === "customerType" ? null : "customerType")}
                                                >
                                                    {customerType || (purposeIndex ? "Select customer type" : "Select purpose first")}
                                                    <span className="chev">▾</span>
                                                </button>
                                                <div className="dd-panel">
                                                    {customerTypeOptions.length ? (
                                                        customerTypeOptions.map((c) => (
                                                            <div
                                                                key={c.custTypeIndex}
                                                                className={`dd-item ${custTypeIndex === c.custTypeIndex ? "selected" : ""}`}
                                                                onClick={() => handleCustomerTypeSelect(c)}
                                                            >
                                                                {c.label}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="dd-empty">Select a purpose first</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sub Type — only shown when the chosen customer type has sub types */}
                                        {subTypeOptions.length > 0 && (
                                            <div className="field">
                                                <label>
                                                    Sub Type <span className="req">*</span>
                                                </label>
                                                <div className={`dd ${openDropdown === "subType" ? "open" : ""}`}>
                                                    <button
                                                        type="button"
                                                        className={`dd-btn ${subType ? "" : "placeholder"}`}
                                                        onClick={() => setOpenDropdown(openDropdown === "subType" ? null : "subType")}
                                                    >
                                                        {subType || "Select sub type"}
                                                        <span className="chev">▾</span>
                                                    </button>
                                                    <div className="dd-panel">
                                                        {subTypeOptions.map((s) => (
                                                            <div
                                                                key={s.subTypeIndex}
                                                                className={`dd-item ${subTypeIndex === s.subTypeIndex ? "selected" : ""}`}
                                                                onClick={() => handleSubTypeSelect(s)}
                                                            >
                                                                {s.label}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 3: DYNAMIC */}
                            {!purposeGroup && (
                                <div className="section">
                                    <div className="placeholder-note">Select a purpose above to continue the form.</div>
                                </div>
                            )}

                            {purposeGroup === "business" && (
                                <div className="section">
                                    <div className="row-top">
                                        <div className="section-head">
                                            <div className="badge">3</div>
                                            <h3 className="section-title">Business Requirements</h3>
                                        </div>
                                        <button type="button" className="btn btn-outline btn-sm" onClick={() => openModal("business")}>
                                            + Add Product Requirement
                                        </button>
                                    </div>
                                    <p className="section-sub" style={{ marginBottom: 0 }}>
                                        Add one or more product requirements for your enquiry.
                                    </p>
                                    <div className="table-wrap">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Vertical</th>
                                                    <th>Products</th>
                                                    {showReqGauge && <th>Gauge Category</th>}
                                                    <th>Specification</th>
                                                    <th>Quantity</th>
                                                    <th>UOM</th>
                                                    <th>Requirement</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {businessRequirements.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={showReqGauge ? 9 : 8} className="table-empty">
                                                            No product requirements added yet.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    businessRequirements.map((r, i) => (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{r.vertical}</td>
                                                            <td>{r.product}</td>
                                                            {showReqGauge && <td>{renderGaugeCategory(r)}</td>}
                                                            <td>{r.spec || "—"}</td>
                                                            <td>{r.qty}</td>
                                                            <td>{r.uom}</td>
                                                            <td>{r.requirement}</td>
                                                            <td className="actions">
                                                                <a className="a-edit" onClick={() => openModal("business", i)}>
                                                                    ✎ Edit
                                                                </a>
                                                                <a className="a-delete" onClick={() => deleteRequirement(i)}>
                                                                    🗑 Delete
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div>
                                        <span className="add-link" onClick={() => openModal("business")}>
                                            + Add Another Product Requirement
                                        </span>
                                    </div>
                                </div>
                            )}

                            {purposeGroup === "dealership" && (
                                <div className="section">
                                    <div className="row-top">
                                        <div className="section-head">
                                            <div className="badge">3</div>
                                            <h3 className="section-title">Business Interest</h3>
                                        </div>
                                        <button type="button" className="btn btn-outline btn-sm" onClick={() => openModal("dealership")}>
                                            + Add Product Interest
                                        </button>
                                    </div>
                                    <p className="section-sub" style={{ marginBottom: 0 }}>
                                        Tell us which products you are interested in representing.
                                    </p>
                                    <p className="section-sub" style={{ fontWeight: 600, color: "var(--ink)", marginTop: 8 }}>
                                        Your Product Interests ({productInterests.length})
                                    </p>
                                    <div className="table-wrap" style={{ marginTop: 6 }}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>VERTICAL</th>
                                                    <th>PRODUCTS</th>
                                                    {showInterestGauge && <th>GAUGE CATEGORY</th>}
                                                    <th>TERRITORY OF INTEREST</th>
                                                    <th>WHY ARE YOU INTERESTED?</th>
                                                    <th>ACTIONS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {productInterests.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={showInterestGauge ? 7 : 6} className="table-empty">
                                                            No product interests added yet.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    productInterests.map((r, i) => (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{r.vertical}</td>
                                                            <td>{r.product}</td>
                                                            {showInterestGauge && <td>{renderGaugeCategory(r)}</td>}
                                                            <td>{r.territory}</td>
                                                            <td>{r.why}</td>
                                                            <td className="actions">
                                                                <a className="a-edit" onClick={() => openModal("dealership", i)}>
                                                                    ✎ Edit
                                                                </a>
                                                                <a className="a-delete" onClick={() => deleteInterest(i)}>
                                                                    🗑 Delete
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {purposeGroup === "joborothers" && (
                                <div className="section">
                                    <div className="section-head">
                                        <div className="badge">3</div>
                                        <h3 className="section-title">Tell Us More</h3>
                                    </div>
                                    <div className="field" style={{ marginTop: 10 }}>
                                        <label>
                                            Describe Your Enquiry <span className="req">*</span>
                                        </label>
                                        <textarea
                                            maxLength={1000}
                                            placeholder="Tell us how we can help. Please include any relevant details so our team can respond appropriately."
                                            value={jobDescription}
                                            onChange={(e) => {
                                                setJobDescription(e.target.value.replace(/^\s+/, ""));
                                            }}
                                        />
                                        <div className="charcount">{jobDescription.length} / 1000</div>
                                    </div>
                                    <div style={{ marginTop: 10 }}>
                                        <label style={{ fontSize: "12.5px", fontWeight: 600 }}>
                                            Attachment <span className="opt">(Optional)</span>
                                        </label>
                                        <div className="upload-box" style={{ marginTop: 6 }}>
                                            <div className="u-text" style={{ minWidth: 0 }}>
                                                {attachment ? (
                                                    <>
                                                        <b style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>📄 {attachment.name}</b>
                                                        <span>{formatFileSize(attachment.size)}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <b>Upload Resume / Supporting Document</b>
                                                        <span>One file only — PDF, DOC, DOCX (Max 5 MB)</span>
                                                    </>
                                                )}
                                            </div>
                                            <div style={{ display: "flex", gap: 8, flex: "none" }}>
                                                {attachment && (
                                                    <button type="button" className="btn btn-outline plain btn-sm" onClick={removeAttachment}>
                                                        ✕ Remove
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    className="btn btn-outline plain btn-sm"
                                                    onClick={() => attachmentInputRef.current?.click()}
                                                >
                                                    {attachment ? "Replace File" : "Browse File"}
                                                </button>
                                            </div>
                                            {/* No "multiple" attribute: the picker allows a single file only. */}
                                            <input
                                                ref={attachmentInputRef}
                                                type="file"
                                                accept={ATTACHMENT_EXTENSIONS.join(",")}
                                                onChange={handleAttachmentChange}
                                                style={{ display: "none" }}
                                            />
                                        </div>
                                        {attachmentError && (
                                            <div className="hint" style={{ color: "var(--danger)", marginTop: 6 }}>
                                                {attachmentError}
                                            </div>
                                        )}
                                        <div className="files-note">🔒 Your file is secure and protected.</div>
                                    </div>
                                </div>
                            )}

                            {/* SECTION 4: REMARKS */}
                            {(purposeGroup === "business" || purposeGroup === "dealership") && (
                                <div className="section">
                                    <div className="section-head">
                                        <div className="badge">4</div>
                                        <h3 className="section-title">
                                            Additional Remarks <span className="opt">(Optional)</span>
                                        </h3>
                                    </div>
                                    <div className="field" style={{ marginTop: 8 }}>
                                        <textarea
                                            maxLength={1000}
                                            placeholder="Enter additional remarks..."
                                            style={{ minHeight: 40 }}
                                            value={remarks}
                                            onChange={(e) => setRemarks(e.target.value)}
                                        />
                                        <div className="charcount">{remarks.length} / 1000</div>
                                    </div>
                                </div>
                            )}

                            <div className="footer-row">
                                <input type="checkbox" checked={agreeChecked} onClick={handlePrivacyCheckboxClick} onChange={() => { }} style={{ width: 16, height: 16 }} />
                                <label>
                                    I agree to the{" "}
                                    <a href="#" onClick={openPrivacyModalForViewing}>
                                        Privacy Policy
                                    </a>{" "}
                                    and consent to being contacted regarding my enquiry.
                                </label>
                            </div>
                            <div className="submit-row">
                                <button type="button" className="btn btn-outline plain" onClick={clearForm}>
                                    ↺ Clear Form
                                </button>
                                <button type="button" className="btn btn-primary" disabled={isSubmitting} onClick={handleSubmit}>
                                    {isSubmitting ? "Submitting..." : "Submit Enquiry ➤"}
                                </button>
                            </div>
                            <p className="secure-note">🔒 Your information is safe and secure with us.</p>
                        </div>
                    </div>

                    {/* ---------------- ADD PRODUCT REQUIREMENT / INTEREST MODAL ---------------- */}
                    {modalOpen && (
                        <div className="overlay" onClick={closeModal}>
                            <div className="modal" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-head">
                                    <div>
                                        <h2>
                                            {modalEditIndex >= 0 ? "Edit" : "Add"} {modalMode === "dealership" ? "Product Interest" : "Product Requirement"}
                                        </h2>
                                        <p>Fill in the details below. It will be added to your enquiry.</p>
                                    </div>
                                    <button type="button" className="modal-close" onClick={closeModal}>
                                        ✕
                                    </button>
                                </div>
                                <hr />
                                <div className="modal-grid">
                                    <div className="field">
                                        <label>
                                            Vertical <span className="req">*</span>
                                        </label>

                                        <div className="dd">
                                            <div
                                                className="dd-btn"
                                                style={{
                                                    cursor: "not-allowed",
                                                    background: "var(--input-bg, #f5f5f5)",
                                                    opacity: 0.85,
                                                }}
                                            >
                                                <span className="chip">
                                                    <span className="vbar">
                                                        <span></span>
                                                    </span>
                                                    CRM
                                                </span>
                                            </div>
                                        </div>
                                        {/* <div className={`dd ${openDropdown === "vertical" ? "open" : ""}`}>
                                            <button
                                                type="button"
                                                className={`dd-btn ${modalData.vertical ? "" : "placeholder"}`}
                                                onClick={() => setOpenDropdown(openDropdown === "vertical" ? null : "vertical")}
                                            >
                                                {modalData.vertical ? (
                                                    <span className="chip">
                                                        <span className="vbar">
                                                            <span></span>
                                                        </span>
                                                        {modalData.vertical}
                                                    </span>
                                                ) : (
                                                    "Select Vertical"
                                                )}
                                                <span className="chev">▾</span>
                                            </button>
                                            <div className="dd-panel">
                                                {Object.keys(VERTICALS).map((v) => (
                                                    <div
                                                        key={v}
                                                        className={`dd-item ${v === modalData.vertical ? "selected" : ""}`}
                                                        onClick={() => {
                                                            // A vertical with a single product (e.g. ALUMINIUM -> ALUMINIUM FOIL)
                                                            // gets that product pre-selected; if it has sub products, open that dropdown next.
                                                            const products = PRODUCTS_BY_VERTICAL[v] || [];
                                                            const only = products.length === 1 ? products[0] : null;
                                                            // Re-picking the vertical that is already selected must not
                                                            // wipe the product / gauge categories (e.g. while editing).
                                                            if (v === modalData.vertical) {
                                                                setOpenDropdown(null);
                                                                return;
                                                            }
                                                            setModalData((prev) => ({
                                                                ...prev,
                                                                vertical: v,
                                                                product: only ? only.name : "",
                                                                subProducts: [],
                                                                subProductOther: "",
                                                            }));
                                                            setOpenDropdown(only && only.subProducts.length ? "subProduct" : null);
                                                        }}
                                                    >
                                                        <span className="vbar-item">
                                                            <span className="vbar-bar vbar-top"></span>
                                                            <span className="vbar-bar vbar-mid"></span>
                                                            <span className="vbar-bar vbar-bottom"></span>
                                                        </span>
                                                        {v}
                                                    </div>
                                                ))}
                                            </div>
                                        </div> */}
                                    </div>

                                    <div className="field">
                                        <label>
                                            Products <span className="req">*</span>
                                        </label>
                                        <div className={`dd ${openDropdown === "product" ? "open" : ""}`}>
                                            <button
                                                type="button"
                                                className={`dd-btn ${modalData.product ? "" : "placeholder"}`}
                                                onClick={() => setOpenDropdown(openDropdown === "product" ? null : "product")}
                                            >
                                                {modalData.product || "Select Product"}
                                                <span className="chev">▾</span>
                                            </button>
                                            <div className="dd-panel">
                                                {(PRODUCTS_BY_VERTICAL[modalData.vertical] || []).length ? (
                                                    PRODUCTS_BY_VERTICAL[modalData.vertical].map((p) => (
                                                        <div
                                                            key={p.name}
                                                            className={`dd-item ${p.name === modalData.product ? "selected" : ""}`}
                                                            onClick={() => {
                                                                // Re-picking the same product keeps the ticked gauge categories.
                                                                if (p.name !== modalData.product) {
                                                                    setModalData((prev) => ({ ...prev, product: p.name, subProducts: [], subProductOther: "" }));
                                                                }
                                                                setOpenDropdown(null);
                                                            }}
                                                        >
                                                            {p.name}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="dd-empty">Select a Vertical first</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Gauge Categories (multi-select) — only for products that have Gauge Categories (e.g. ALUMINIUM FOIL).
                        The panel stays open while ticking; it closes on outside click or the button. */}
                                {modalSubProducts.length > 0 && (
                                    <div className="modal-grid">
                                        <div className="field">
                                            <label>
                                                Gauge Categories <span className="req">*</span>
                                            </label>
                                            <div className={`dd ${openDropdown === "subProduct" ? "open" : ""}`}>
                                                <button
                                                    type="button"
                                                    className={`dd-btn ${modalData.subProducts.length ? "" : "placeholder"}`}
                                                    onClick={() => setOpenDropdown(openDropdown === "subProduct" ? null : "subProduct")}
                                                >
                                                    <span className="chip">
                                                        {modalData.subProducts.length
                                                            ? modalData.subProducts.join(SUB_PRODUCT_SEPARATOR)
                                                            : "Select gauge categories"}
                                                    </span>
                                                    <span className="chev">▾</span>
                                                </button>
                                                <div className="dd-panel">
                                                    {modalSubProducts.map((s) => {
                                                        const checked = modalData.subProducts.includes(s);
                                                        return (
                                                            <div
                                                                key={s}
                                                                className={`dd-item check ${checked ? "selected" : ""}`}
                                                                onClick={() => toggleSubProduct(s)}
                                                            >
                                                                <input type="checkbox" checked={checked} readOnly tabIndex={-1} />
                                                                {s}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        {modalData.subProducts.includes(OTHER_SUB_PRODUCT) && (
                                            <div className="field">
                                                <label>
                                                    Specify Gauge Category <span className="req">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter gauge category"
                                                    maxLength={SPEC_MAX}
                                                    value={modalData.subProductOther}
                                                    onChange={(e) => {
                                                        const v = e.target.value.replace(/^\s+/, "");
                                                        setModalData((prev) => ({ ...prev, subProductOther: v }));
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {modalMode === "business" && (
                                    <div>
                                        <div className="modal-grid cols-3">
                                            <div className="field">
                                                <label>
                                                    Product Specification <span className="opt">(if any)</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="FE500D, 12 mm"
                                                    maxLength={SPEC_MAX}
                                                    value={modalData.spec}
                                                    onChange={(e) => {
                                                        const v = e.target.value.replace(/^\s+/, "");
                                                        setModalData((prev) => ({ ...prev, spec: v }));
                                                    }}
                                                />
                                                <div className="hint">e.g. FE500D, 12 mm, Grade 60</div>
                                            </div>
                                            <div className="field">
                                                <label>
                                                    Quantity <span className="req">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    inputMode="decimal"
                                                    placeholder="0"
                                                    maxLength={QTY_MAX_LENGTH}
                                                    value={modalData.qty}
                                                    onFocus={(e) => e.target.select()} // typing replaces the default 0
                                                    onChange={(e) => {
                                                        const v = sanitizeQty(e.target.value);
                                                        setModalData((prev) => ({ ...prev, qty: v }));
                                                    }}
                                                />
                                            </div>
                                            <div className="field">
                                                <label>
                                                    Unit of Measure (UOM) <span className="req">*</span>
                                                </label>
                                                <div className={`dd ${openDropdown === "uom" ? "open" : ""}`}>
                                                    <button type="button" className="dd-btn" onClick={() => setOpenDropdown(openDropdown === "uom" ? null : "uom")}>
                                                        {modalData.uom || "MT"}
                                                        <span className="chev">▾</span>
                                                    </button>
                                                    <div className="dd-panel">
                                                        {UOM_OPTIONS.map((u) => (
                                                            <div
                                                                key={u}
                                                                className={`dd-item ${u === modalData.uom ? "selected" : ""}`}
                                                                onClick={() => {
                                                                    setModalData((prev) => ({ ...prev, uom: u }));
                                                                    setOpenDropdown(null);
                                                                }}
                                                            >
                                                                {u}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="field" style={{ marginBottom: 6 }}>
                                            <label>
                                                Requirement / Enquiry <span className="req">*</span>
                                            </label>
                                            <textarea
                                                maxLength={1000}
                                                placeholder="Need monthly supply for infrastructure project."
                                                value={modalData.requirement}
                                                onChange={(e) => {
                                                    const v = e.target.value.replace(/^\s+/, "");
                                                    setModalData((prev) => ({ ...prev, requirement: v }));
                                                }}
                                            />
                                            <div className="charcount">{modalData.requirement.length} / 1000</div>
                                        </div>
                                    </div>
                                )}

                                {modalMode === "dealership" && (
                                    <div>
                                        <div className="field">
                                            <label>
                                                Territory of Interest (City / District / Region) <span className="req">*</span>
                                            </label>
                                            <div className="loc-input">
                                                <span>📍</span>
                                                <input
                                                    type="text"
                                                    placeholder="Enter the city, district or region"
                                                    maxLength={TERRITORY_MAX}
                                                    value={modalData.territory}
                                                    onChange={(e) => {
                                                        const v = e.target.value.replace(/^\s+/, "");
                                                        setModalData((prev) => ({ ...prev, territory: v }));
                                                    }}
                                                />
                                            </div>
                                            <div className="hint">Enter the city, district or region you want to operate in.</div>
                                        </div>
                                        <div className="field" style={{ marginTop: 16, marginBottom: 6 }}>
                                            <label>
                                                Why are you interested in these products? <span className="req">*</span>
                                            </label>
                                            <textarea
                                                maxLength={1000}
                                                placeholder="Interested in dealership for the steel products in this region."
                                                value={modalData.why}
                                                onChange={(e) => {
                                                    const v = e.target.value.replace(/^\s+/, "");
                                                    setModalData((prev) => ({ ...prev, why: v }));
                                                }}
                                            />
                                            <div className="charcount">{modalData.why.length} / 1000</div>
                                        </div>
                                    </div>
                                )}

                                <div className="modal-actions">
                                    <button type="button" className="btn btn-outline plain" onClick={closeModal}>
                                        ✕ Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={saveModal}>
                                        ✓ {modalEditIndex >= 0 ? "Save Changes" : "Add to Enquiry"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ---------------- PRIVACY POLICY MODAL (scroll-to-accept) ---------------- */}
                    <AnimatePresence>
                        {showPrivacyModal && (
                            <m.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4"
                            >
                                <m.div
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col"
                                >
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-b-mauve-300">
                                        <h3 className="text-xl font-bold">
                                            Privacy Policy <span className="text-orange-500">& Consent</span>
                                        </h3>
                                        <button onClick={() => setShowPrivacyModal(false)} className="text-gray-500 hover:text-gray-800" aria-label="Close">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div
                                        ref={modalBodyRef}
                                        onScroll={handleModalScroll}
                                        className="flex-1 min-h-0 overflow-y-auto px-6 py-4 space-y-4 text-sm text-gray-700"
                                    >
                                        <h4 className="text-base font-semibold text-black">Privacy Policy & Consent for Enquiry</h4>
                                        <p>
                                            I hereby acknowledge and consent to the collection and processing of the information provided by me through this
                                            enquiry form. I understand that the information may be used by the Company to respond to my enquiry, provide relevant
                                            information, communicate with me regarding the requested products or services, and for related customer support
                                            purposes.
                                        </p>
                                        <p>
                                            I confirm that the information provided by me is accurate to the best of my knowledge. I understand that my personal
                                            information will be handled in accordance with the Company&rsquo;s Privacy Policy and applicable data protection laws.
                                        </p>
                                        <p>
                                            By submitting this form, I provide my consent to the Company to contact me through the communication details provided
                                            by me for the purpose of addressing my enquiry.
                                        </p>
                                    </div>

                                    <div className="px-6 py-4 border-t border-t-mauve-300">
                                        {!hasScrolledToEnd && (
                                            <p className="text-xs text-gray-500 mb-2">Please scroll to the end of the policy to enable the checkbox.</p>
                                        )}
                                        <label className={`flex items-center gap-2 ${hasScrolledToEnd ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}>
                                            <input type="checkbox" checked={false} disabled={!hasScrolledToEnd} onChange={handlePrivacyAgree} />
                                            I have read and agree to the Privacy Policy
                                        </label>
                                    </div>
                                </m.div>
                            </m.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>        
        </div>
    );
}

export default React.memo(Contactform);