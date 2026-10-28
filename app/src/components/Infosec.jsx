"use client";
import React from 'react'
import Image from "next/image";
import Link from 'next/link';

const Infosec = () => {
  return (
    <div className='info-sec'>
      <Link href={"/"} className="info-logo">
        <Image
          src={`/wp-content/themes/sel/assets/img/logo/logo.png`}
          alt="brand-logo"
          width={5000}
          height={5000}
        />
      </Link>
      <div className="info-desc">SEL TIGER Roofing Sheets, a brand from Shyam Metalics, is a premium range of roofing sheets for commercial and residential use. The sheets are made of high-quality materials and are designed to provide maximum durability and performance.</div>
    </div>
  )
}

export default React.memo(Infosec)