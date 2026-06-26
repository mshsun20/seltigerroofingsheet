import React from 'react'
import "@/styles/components/certificationscredentials.css";
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper"
const Banner = dynamic(() => import("@/components/common/Banner"))
import { certificationCredentialBanner } from "@/data/certificationCredentialBanner";
import { certificationCredentialData } from "@/data/certificationCredentialsData"
const CertificationsCredentialsFaqInfo = dynamic(() => import("@/components/about/CertificationsCredentialsFaqInfo"));
import Image from 'next/image';
import Link from 'next/link';

const CertificationsCredentials = () => {
  return (
    <div className="content-layout">
        <LazyWrapper><Banner data={"Certifications & Credentials"} info={certificationCredentialBanner} /></LazyWrapper>
        <div className="certifications-credentials-document-container">
            {
                certificationCredentialData?.map(elm => (
                    <div className="certifications-credentials-document-section" key={elm?.certIndex}>
                        <div className="certifications-credentials-document-icon">
                            <Image
                                src={elm?.certIcon?.url}
                                alt={elm?.certIcon?.alt}
                                width={elm?.certIcon?.width}
                                height={elm?.certIcon?.height}
                            />
                        </div>
                        <div className="certifications-credentials-document-title">{elm?.certTitle}</div>
                        <div className="certifications-credentials-document-actions">
                            <Link href={elm?.certLink} target="_blank">Download</Link>
                        </div>
                    </div>
                ))
            }
        </div>
        <LazyWrapper><CertificationsCredentialsFaqInfo /></LazyWrapper>
    </div>
  )
}

export default CertificationsCredentials