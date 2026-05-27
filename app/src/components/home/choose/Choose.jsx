"use client";
import Image from 'next/image';
import React from 'react';
import { chooseDetails } from "@/data/home/chooseDetails";
import Link from 'next/link';

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
            <div className="choose-container">
                {
                    chooseDetails[0]?.contents?.allChoices?.map(elm => {
                        String(elm.alignment)==="left" && (
                            <div key={elm.containerIndex}></div>
                        );
                        String(elm.alignment)==="center" && (
                            <div key={elm.containerIndex}></div>
                        );
                        String(elm.alignment)==="right" && (
                            <div key={elm.containerIndex}></div>
                        );
                    })
                }
            </div>
            <div className="choose-actions">
                <Link className={chooseDetails[0]?.link?.className}>{chooseDetails[0]?.link?.name}</Link>
            </div>
        </div>
    </>
  )
}

export default React.memo(Choose)