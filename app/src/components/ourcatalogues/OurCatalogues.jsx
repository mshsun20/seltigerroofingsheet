import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { ourCatalogues } from "@/data/ourCatalogues";
import "@/styles/components/ourcatalogues.css";

const OurCatalogues = () => {
  return (
    <div className="our-catalogues-layout">
        <div className="our-catalogues-parallax">
            <Image
                src={ourCatalogues[0]?.wall?.url}
                alt={ourCatalogues[0]?.wall?.alt}
                width={ourCatalogues[0]?.wall?.width}
                height={ourCatalogues[0]?.wall?.height}
            />
        </div>
        <div className="contnr">
            <div className="our-catalogues-container">
                <div className="our-catalogues-title">
                    {ourCatalogues[0]?.contents?.title}
                </div>
                <div className="our-catalogues-actions">
                    <Link
                        className="our-catalogues-link"
                        href={ourCatalogues[0]?.contents?.actions?.url}
                    >
                        {ourCatalogues[0]?.contents?.actions?.info}
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OurCatalogues