import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { certificationCredentialData } from "@/data/certificationCredentialsData";

const CertificationsCredentialsDocsInfo = () => {
  return (
    <div className="certifications-credentials-document-layout">
        <div className="contnr">
            <div className="certifications-credentials-document-heading">{certificationCredentialData[0]?.heading?.data}</div>
            <div className="certifications-credentials-document-container">
                {
                    certificationCredentialData[0]?.contents?.map(elm => (
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
        </div>
    </div>
  )
}

export default React.memo(CertificationsCredentialsDocsInfo)