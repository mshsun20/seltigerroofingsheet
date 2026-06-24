import React from 'react'
import "@/styles/components/certificationscredentials.css";
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper"
const Banner = dynamic(() => import("@/components/common/Banner"))
import { certificationCredentialBanner } from "@/data/certificationCredentialBanner";
const Faqs = dynamic(() => import("@/components/faqs/Faqs"))
import { certificationCredentialData } from "@/data/certificationCredentialsData"
import Image from 'next/image';
import Link from 'next/link';

const CertificationsCredentials = () => {
  return (
    <div className="content-layout">
        <LazyWrapper><Banner data={"Certifications & Credentials"} info={certificationCredentialBanner} /></LazyWrapper>
        <div className="document-container">
            {
                certificationCredentialData?.map(elm => (
                    <div className="document-section" key={elm?.certIndex}>
                        <div className="document-icon">
                            <Image
                                src={elm?.certIcon?.url}
                                alt={elm?.certIcon?.alt}
                                width={elm?.certIcon?.width}
                                height={elm?.certIcon?.height}
                            />
                        </div>
                        <div className="document-title">{elm?.certTitle}</div>
                        <div className="document-actions">
                            <Link href={elm?.certLink} target="_blank">Download</Link>
                        </div>
                    </div>
                ))
            }
        </div>
        <LazyWrapper><Faqs /></LazyWrapper>
    </div>
  )
}

export default CertificationsCredentials