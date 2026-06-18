import React from 'react'
import "@/styles/components/catalogues.css";
import dynamic from "next/dynamic";
const Banner = dynamic(() => import("@/components/common/Banner"))
import { cataloguesBanner } from "@/data/cataloguesBanner";
import LazyWrapper from '@/components/common/LazyWrapper';
import { cataloguesData } from "@/data/cataloguesData";
import Image from 'next/image';
import Link from 'next/link';
import WallCard from "@/components/common/WallCard";

const Catalogues = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Catalogues"} info={cataloguesBanner} /></LazyWrapper>
      <div className={cataloguesData[0]?.className}>
        {
          cataloguesData[0]?.allContents?.map(elm => (
            <WallCard
              id={elm?.contentIndex}
              key={elm?.contentIndex}
              contentWall={elm?.contentWall}
              fileContent={elm?.fileContent}
              title={elm?.title}
              renderAction={
                <Link href={`http://localhost:3052/${elm?.fileContent?.url}`} className="catalogues-content-link">
                  Download
                </Link>
              }
            />
          ))
        }
      </div>
    </div>
  )
}

export default Catalogues