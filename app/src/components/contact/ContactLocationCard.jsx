import Image from "next/image";
import "@/styles/components/contactlocationcard.css";

const ContactLocationCard = ({ item }) => {
    return (
        <div className="contact-location-card">
            <div className="contact-location-card-hdr">
                <div className="contact-location-hdr">
                    {item.heading}
                </div>
                <div className="contact-location-icon">
                    <Image
                        src={item.icon.src}
                        alt="icon"
                        width={1000}
                        height={750}
                    />
                </div>
            </div>
            <div className="contact-location-details">
                {item.details}
            </div>
        </div>
    );
};

export default ContactLocationCard;