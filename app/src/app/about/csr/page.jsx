"use client";
import React from 'react'
import dynamic from "next/dynamic";
const Banner = dynamic(() => import("@/components/common/Banner"))
import { csrBanner } from "@/data/csrBanner";
import { csrData } from "@/data/csrData"
import Image from 'next/image';
import Link from 'next/link';
import LazyWrapper from '@/components/common/LazyWrapper';

const Csr = () => {
  return (
    <div className="content-layout">
        <LazyWrapper><Banner data={"CSR"} info={csrBanner} /></LazyWrapper>
        <div className={csrData[0]?.mainContent?.className}>
            {
                csrData[0]?.mainContent?.allContent?.map(elm => (
                    <div className={elm?.className} key={elm?.contentIndex}>
                        <div className={elm?.contentBackground?.className}>
                            <Image
                                src={elm?.contentBackground?.url}
                                alt={elm?.contentBackground?.alt}
                                width={elm?.contentBackground?.width}
                                height={elm?.contentBackground?.height}
                            />
                        </div>
                        <div className={elm?.contentTextuals?.className}></div>
                        <div className="csr-content-actions">
                            <Link href={`/about/csr/${elm?.contentSlug}`}>Read More</Link>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Csr