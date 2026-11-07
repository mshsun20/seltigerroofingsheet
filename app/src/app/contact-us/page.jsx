import React from 'react'
import '@/styles/contact.css'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { contactBanner } from "@/data/contactBanner";
const Banner = dynamic(() => import('@/components/common/Banner'));
// const Contactpart = dynamic(() => import('@/components/contact/ContactMap'));
const Contactlist = dynamic(() => import('@/components/contact/Contactlist'));
const Contactform = dynamic(() => import('@/components/contact/Contactform'));
const Contactlocation = dynamic(() => import('@/components/contact/Contactlocation'));

const Contact = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data="Contact Us" info={contactBanner} /></LazyWrapper>
      <LazyWrapper><Contactlist /></LazyWrapper>
      <LazyWrapper><Contactform /></LazyWrapper>
      <LazyWrapper><Contactlocation /></LazyWrapper>
    </div>
  )
}

export default Contact