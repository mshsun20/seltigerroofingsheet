const iconSets = {
    badgeA: {
        url: `/wp-content/themes/sel/assets/img/all-images/icon/capacity.png`,
        alt: `badge 1`,
        width: `1000`,
        height: `1000`
    },
    badgeB: {
        url: `/wp-content/themes/sel/assets/img/all-images/icon/capacity-2.png`,
        alt: `badge 2`,
        width: `1000`,
        height: `1000`
    },
    badgeC: {
        url: `/wp-content/themes/sel/assets/img/all-images/icon/capacity-3.png`,
        alt: `badge 3`,
        width: `1000`,
        height: `1000`
    },
}
const allProductDetails = [
    {
        name: `Cold Rolled Coils`,
        poster: {
            url: `/wp-content/uploads/2026/01/cr.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 0,
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 15000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 30000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        caption: `<p></p>`,
        description: [
            `<p></p>`,
        ]
    },
    {
        name: `Alu-Zinc`,
        poster: {
            url: `/wp-content/uploads/2026/01/gl.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 1,
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 15000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 30000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        caption: `<p></p>`,
        description: [
            `<p></p>`,
        ]
    },
    {
        name: `Galvanized`,
        poster: {
            url: `/wp-content/uploads/2026/01/gp.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 2,
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 15000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 30000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        caption: `<p></p>`,
        description: [
            `<p></p>`,
        ]
    },
    {
        name: `Color Coated Sheet`,
        poster: {
            url: `/wp-content/uploads/2026/01/colour-coated-roofing-sheets.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 3,
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 15000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 30000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        caption: `<p></p>`,
        description: [
            `<p></p>`,
        ]
    },
    {
        name: `Cold Rolled Coils`,
        poster: {
            url: `/wp-content/uploads/2026/01/black-pipes.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 4,
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 15000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 30000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        caption: `<p></p>`,
        description: [
            `<p></p>`,
        ]
    },
    {
        name: `Cold Rolled Coils`,
        poster: {
            url: `/wp-content/uploads/2026/01/crash-barrier.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 5,
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 15000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 30000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        caption: `<p></p>`,
        description: [
            `<p></p>`,
        ]
    },
    {
        name: `Cold Rolled Coils`,
        poster: {
            url: `/wp-content/uploads/2026/01/galvanized-pipes.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 6,
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 15000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 30000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        caption: `<p></p>`,
        description: [
            `<p></p>`,
        ]
    },
    {
        name: `Cold Rolled Coils`,
        poster: {
            url: `/wp-content/uploads/2026/01/hr.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 7,
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 15000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 30000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        caption: `<p></p>`,
        description: [
            `<p></p>`,
        ]
    },
    {
        name: `Cold Rolled Coils`,
        poster: {
            url: `/wp-content/uploads/2026/01/color-coated-aluminium-sheets.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 8,
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 15000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 30000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        caption: `<p></p>`,
        description: [
            `<p></p>`,
        ]
    },
    {
        name: `Cold Rolled Coils`,
        poster: {
            url: `/wp-content/uploads/2026/01/aluminium-sheets.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 9,
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 15000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 30000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        caption: `<p></p>`,
        description: [
            `<p></p>`,
        ]
    },
]
export const upcomingUpdatesInfo = [{
    topper: {
        icon: {
            className: "topper-icon",
            url: "/wp-content/themes/sel/assets/img/icons/sub-logo3.svg",
            alt: "sub logo3",
            width: 20,
            height: 20
        },
        text: {
            className: "topper-text",
            data: "Upcoming Updates"
        }
    },
    heading: {
        className: "upcoming-updates-heading",
        data: "Current and Upstream Facilities"
    },
    mainContent: {
        className: "upcoming-updates-contents",
        allProducts: [...allProductDetails]
    }
}]