import { allProductDetails } from "@/data/allProductDetails";
export const upcomingProductsData = [{
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
            data: "Products"
        }
    },
    heading: {
        className: "upcoming-products-heading",
        data: "Upcoming Products"
    },
    mainContent: {
        className: "upcoming-products-contents",
        allProducts: allProductDetails?.filter(elm => elm?.productStatus==="Upcoming")
    }
}]