import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import "@/styles/components/businessenquiry.css";

const BusinessEnquiry = ({ dataSet = {} }) => {
  return (
    <div className="business-enquiry-layout">
        <div className="business-enquiry-parallax">
            <Image
                src={dataSet?.wall?.url}
                alt={dataSet?.wall?.alt}
                width={dataSet?.wall?.width}
                height={dataSet?.wall?.height}
            />
        </div>
        <div className="contnr">
            <div className="business-enquiry-container">
                <div className="business-enquiry-title">
                    {dataSet?.contents?.title}
                </div>
                <div className="business-enquiry-actions">
                    <Link
                        className="business-enquiry-link"
                        href={dataSet?.contents?.actions?.url}
                    >
                        {dataSet?.contents?.actions?.info}
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BusinessEnquiry