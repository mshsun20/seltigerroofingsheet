import React from 'react'
import "@/styles/components/certificationscredentials.css";
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper"
const Banner = dynamic(() => import("@/components/common/Banner"))
import { certificationCredentialBanner } from "@/data/certificationCredentialBanner";
const CertificationsCredentialsDocsInfo = dynamic(() => import("@/components/about/CertificationsCredentialsDocsInfo"));
const CertificationsCredentialsFaqInfo = dynamic(() => import("@/components/about/CertificationsCredentialsFaqInfo"));

const CertificationsCredentials = () => {
  return (
    <div className="content-layout">
        <LazyWrapper><Banner data={"Certifications & Credentials"} info={certificationCredentialBanner} /></LazyWrapper>
        <LazyWrapper><CertificationsCredentialsDocsInfo /></LazyWrapper>
        <LazyWrapper><CertificationsCredentialsFaqInfo /></LazyWrapper>
    </div>
  )
}

export default CertificationsCredentials