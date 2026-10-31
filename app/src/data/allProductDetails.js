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
export const allProductDetails = [
    {
        name: `Cold Rolled Coils`,
        poster: {
            url: `/wp-content/uploads/2026/01/cr.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 0,
        productStatus: "Current",
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 15000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 30000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        netItem: {
            icon: {...iconSets?.badgeC},
            statValue: 0,
            statUnit: `MT/Month`,
            statTag: "Total"
        },
        caption: `Cold Rolled Coils`,
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
        productStatus: "Current",
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 12000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 30000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        netItem: {
            icon: {...iconSets?.badgeC},
            statValue: 0,
            statUnit: `MT/Month`,
            statTag: "Total"
        },
        caption: `Alu-Zinc`,
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
        productStatus: "Current",
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 0, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 30000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        netItem: {
            icon: {...iconSets?.badgeC},
            statValue: 0,
            statUnit: `MT/Month`,
            statTag: "Total"
        },
        caption: `Galvanized`,
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
        productStatus: "Current",
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 15000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 30000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        netItem: {
            icon: {...iconSets?.badgeC},
            statValue: 0,
            statUnit: `MT/Month`,
            statTag: "Total"
        },
        caption: `Color Coated Sheet`,
        description: [
            `<p></p>`,
        ]
    },
    {
        name: `Black Pipes`,
        poster: {
            url: `/wp-content/uploads/2026/01/black-pipes.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 4,
        productStatus: "Current",
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 4000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 2000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        netItem: {
            icon: {...iconSets?.badgeC},
            statValue: 0,
            statUnit: `MT/Month`,
            statTag: "Total"
        },
        caption: `Black Pipes`,
        description: [
            `<p></p>`,
        ]
    },
    {
        name: `Crash Barrier`,
        poster: {
            url: `/wp-content/uploads/2026/01/crash-barrier.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 5,
        productStatus: "Current",
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 5000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 10000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        netItem: {
            icon: {...iconSets?.badgeC},
            statValue: 0,
            statUnit: `MT/Month`,
            statTag: "Total"
        },
        caption: `Crash Barrier`,
        description: [
            `<p></p>`,
        ]
    },
    {
        name: `Galvanized Pipe`,
        poster: {
            url: `/wp-content/uploads/2026/01/galvanized-pipes.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 6,
        productStatus: "Upcoming",
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 5000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 7000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        netItem: {
            icon: {...iconSets?.badgeC},
            statValue: 0,
            statUnit: `MT/Month`,
            statTag: "Total"
        },
        caption: `Galvanized Pipe`,
        description: [
            `<p>SEL Tiger Galvanized Pipes combine strong steel construction with comprehensive corrosion resistance. It is engineered for longevity in structural, plumbing, and outdoor installations. These pipes offer dependable strength, dimensional consistency, and easy integration into construction and industrial systems.<br>Backed by meticulous quality checks, SEL Tiger Galvanized Pipes support safe, efficient project execution with minimal maintenance. Trusted across sectors, they deliver lasting performance and peace of mind for installers, engineers, and project owners alike.</p>`,
        ]
    },
    {
        name: `Hot Rolled Coil`,
        poster: {
            url: `/wp-content/uploads/2026/01/hr.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 7,
        productStatus: "Upcoming",
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 125000, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 125000, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        netItem: {
            icon: {...iconSets?.badgeC},
            statValue: 0,
            statUnit: `MT/Month`,
            statTag: "Total"
        },
        caption: `Hot Rolled Coil`,
        description: [
            `<p>Hot Rolled (HR) steel from SEL Tiger delivers dependable strength and consistent performance. It is made for heavy fabrication, structural frames, and industrial projects. With robust dimensional accuracy and superior material integrity, SEL Tiger HR steel supports long-lasting installations and smooth project execution.<br>Trusted by constructors and engineers alike, this product ensures structural confidence and resilience for large-scale construction, industrial assemblies, and bespoke manufacturing applications, backed by rigorous quality standards and supply reliability.</p>`,
        ]
    },
    {
        name: `Color Coated Aluminium Sheets`,
        poster: {
            url: `/wp-content/uploads/2026/01/color-coated-aluminium-sheets.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 8,
        productStatus: "Upcoming",
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 500, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 500, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        netItem: {
            icon: {...iconSets?.badgeC},
            statValue: 0,
            statUnit: `MT/Month`,
            statTag: "Total"
        },
        caption: `Color Coated Aluminium Sheets`,
        description: [
            `<p>SEL Tiger Aluminium Colour Coated sheets blend aesthetic appeal with enduring performance, ideal for modern roofing, façades, and architectural accents. The advanced colour coating system ensures vibrant and fade-resistant finishes paired with excellent weather and UV resistance. Lightweight yet strong, these sheets simplify installation while enhancing thermal performance and visual impact.<br>Designed for commercial, industrial, and residential projects, SEL Tiger Aluminium Colour Coated products deliver both beauty and functionality. They transform spaces with lasting colour retention and robust engineering you can rely on in every build.</p>`,
        ]
    },
    {
        name: `Aluminium Sheets`,
        poster: {
            url: `/wp-content/uploads/2026/01/aluminium-sheets.webp`,
            alt: `product image`,
            width: "1500",
            height: "1500",
        },
        productIndex: 9,
        productStatus: "Upcoming",
        info: [
            { id: 0, descTag: "Phase I", thickness: `0.11-0.16`, width: `Upto 1250 mm` },
            { id: 1, descTag: "Phase II", thickness: `0.11-2.50`, width: `Upto 1500 mm` },
        ],
        tiles: [
            { id: 0, icon: {...iconSets?.badgeA}, statValue: 500, statUnit: `MT/Month`, statTag: "Phase I" },
            { id: 1, icon: {...iconSets?.badgeB}, statValue: 500, statUnit: `MT/Month`, statTag: "Phase II" },
        ],
        netItem: {
            icon: {...iconSets?.badgeC},
            statValue: 0,
            statUnit: `MT/Month`,
            statTag: "Total"
        },
        caption: `Aluminium Sheets`,
        description: [
            `<p>SEL Tiger Aluminum products offer a powerful combination of lightweight resilience and corrosion resistance. Precision-produced from high-grade aluminium, these products deliver reliable performance, ease of handling, and excellent dimensional stability. Whether used in roofing, automotive assemblies, or architectural features, SEL Tiger Aluminium ensures longevity and consistent quality through every phase of use.<br>With inherent resistance to weather and chemical exposure, this versatile metal supports efficient installation, reduced maintenance, and enduring strength that aligns with modern project demands and sustainability goals.</p>`,
        ]
    },
]