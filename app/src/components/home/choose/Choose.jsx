"use client";
import Image from 'next/image';
import React from 'react';
import { chooseDetails } from "@/data/home/chooseDetails";
import Link from 'next/link';
import ChooseReason from "./ChooseReason"
import ChooseGallery from "./ChooseGallery"

const Choose = () => {
  return (
    <>
        <div className="choose-layout">
            <div className="choose-hdr">
                <div className="choose-top">
                    <span className={chooseDetails[0]?.topper?.icon?.className}>
                        <Image
                            src={chooseDetails[0]?.topper?.icon?.url}
                            alt={chooseDetails[0]?.topper?.icon?.alt}
                            width={parseInt(chooseDetails[0]?.topper?.icon?.width)}
                            height={parseInt(chooseDetails[0]?.topper?.icon?.height)}
                        />
                    </span>
                    <span className={chooseDetails[0]?.topper?.text?.className}>{chooseDetails[0]?.topper?.text?.data}</span>
                </div>
                <div className={chooseDetails[0]?.heading?.className}>{chooseDetails[0]?.heading?.data}</div>
            </div>
            <div className={chooseDetails[0]?.contents?.className}>
                {
                    chooseDetails[0]?.contents?.allChoices?.map(elm => {
                        if (["left", "right"].includes(String(elm.alignment))) return <ChooseReason data={elm} key={elm.containerIndex} />;
                        if (String(elm.alignment)==="center") return <ChooseGallery data={elm} key={elm.containerIndex} />;
                    })
                }
            </div>
            <div className="choose-actions">
                <Link href="#" className={chooseDetails[0]?.link?.className}>{chooseDetails[0]?.link?.name}</Link>
            </div>
        </div>
    </>
  )
}

export default React.memo(Choose)