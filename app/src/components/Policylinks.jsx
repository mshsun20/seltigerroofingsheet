"use client";
import Link from 'next/link'
import React from 'react'

const Policylinks = () => {
  return (
    <div className='policy-links'>
        <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
    </div>
  )
}

export default React.memo(Policylinks)