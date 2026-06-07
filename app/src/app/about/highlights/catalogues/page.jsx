import React from 'react'
import "@/styles/components/catalogues.css";
const Banner = React.lazy(() => import("@/components/Banner"))
import { cataloguesBanner } from "@/data/cataloguesBanner";
import LazyWrapper from '@/components/LazyWrapper';
import { cataloguesData } from "@/data/cataloguesData";
import Image from 'next/image';
import Link from 'next/link';

const Catalogues = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Catalogues"} info={cataloguesBanner} /></LazyWrapper>
      <div className={cataloguesData[0]?.className}>
        {
            cataloguesData[0]?.allContents?.map(elm => (
                <div className={elm?.className} key={elm?.contentIndex}>
                    <div className="wall-section">
                        <Image
                            src={elm?.contentWall?.url}
                            alt={elm?.contentWall?.alt}
                            width={elm?.contentWall?.width}
                            height={elm?.contentWall?.height}
                        />
                    </div>
                    <div className="caption-section">
                        <div className="title-section">
                            <Link href={`http://localhost:3052/${elm?.fileContent?.url}`} target="_blank">{elm?.title}</Link>
                        </div>
                        <div className="action-section">
                            <Link href={`http://localhost:3052/${elm?.fileContent?.url}`} target="_blank">Download</Link>
                        </div>
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default Catalogues