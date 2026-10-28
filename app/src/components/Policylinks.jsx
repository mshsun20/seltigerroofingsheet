"use client";
import Link from 'next/link'
import React from 'react'

const Policylinks = () => {
  return (
    <div className='policy-links'>
      <Link href="#/terms-and-conditions">Terms & Conditions</Link>
      <span>|</span>
      <Link href="#/privacy-policy">Privacy Policy</Link>
    </div>
  )
}

export default React.memo(Policylinks)