import { allProductDetails } from "@/data/allProductDetails";
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