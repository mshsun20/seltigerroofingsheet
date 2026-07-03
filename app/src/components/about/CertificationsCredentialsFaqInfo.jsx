"use client";
import React from 'react'
import Accordion from '@/components/common/Accordion';
import CertificationsCredentialsFaq from './CertificationsCredentialsFaq';
import Image from 'next/image';
import { certificationCredentialsFaqDetails } from '@/data/certificationCredentialsFaqDetails';

const CertificationsCredentialsFaqInfo = () => {
    const items = certificationCredentialsFaqDetails[0]?.mainContent?.allContents?.map((item) => ({
        id: item?.contentIndex,
        heading: item?.heading,
        details: item?.details,
    }));

  return (
    <div className="certifications-credentials-faq-layout">
        <div className="contnr">
            <div className="certifications-credentials-faq-hdr">
                <div className="certifications-credentials-faq-top">
                    <span className={certificationCredentialsFaqDetails[0]?.topper?.icon?.className}>
                        <Image
                            src={certificationCredentialsFaqDetails[0]?.topper?.icon?.url}
                            alt={certificationCredentialsFaqDetails[0]?.topper?.icon?.alt}
                            width={parseInt(certificationCredentialsFaqDetails[0]?.topper?.icon?.width)}
                            height={parseInt(certificationCredentialsFaqDetails[0]?.topper?.icon?.height)}
                        />
                    </span>
                    <span className={certificationCredentialsFaqDetails[0]?.topper?.text?.className}>{certificationCredentialsFaqDetails[0]?.topper?.text?.data}</span>
                </div>
                <div className={certificationCredentialsFaqDetails[0]?.heading?.className}>{certificationCredentialsFaqDetails[0]?.heading?.data}</div>
            </div>
            <div className="certifications-credentials-faq-container">
                <div className={certificationCredentialsFaqDetails[0]?.mainContent?.className}>
                    <Accordion
                        items={items}
                        defaultOpen={0}
                        multiple={false}
                        renderItem={(item, isOpen, toggle) => (
                            <CertificationsCredentialsFaq
                                key={item.id}
                                item={item}
                                isOpen={isOpen}
                                toggle={toggle}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(CertificationsCredentialsFaqInfo)