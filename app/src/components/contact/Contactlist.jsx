"use client";
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const contList = [
    {
        header: 'Our Location',
        icon: '',
        path: 'https://google.com/maps?q=',
        info: 'P-19 (Plate No.: D-403), Taratala Road, Opposite Modern Industries, Kolkata - 700088'
    },
    {
        header: 'Office Number',
        icon: '',
        path: 'tel:',
        info: '+917604081418'
    },
    {
        header: 'Other Number',
        icon: '',
        path: 'tel:',
        info: '18002022233'
    },
    {
        header: 'Our Mail',
        icon: '',
        path: 'mailto:',
        info: 'crm.lead@shyammetalics.com'
    },
]

const Contactlist = () => {
    const contactListItems = React.useMemo(() => [...contList], [])
  return (
    <div className='contact-list-layout'>
        <div className="contact-list-hdr">
            <div className="contact-list-top">
                <span className="topper-icon">
                    <Image
                        src="/wp-content/themes/sel/assets/img/icons/sub-logo3.svg"
                        alt="sub logo3"
                        width={20}
                        height={20}
                    />
                </span>
                <span className="topper-text">Get In Touch</span>
            </div>
            <div className="contact-list-hdng">Let Connect With Us</div>
        </div>
        <div className="contact-list-container">
            <div className="contact-list-items">
                {contactListItems?.length>0 && contactListItems?.map((itm, i) => (
                    <div className="list-item" key={i}>
                        {itm?.icon && <div className="list-item-icn">{itm.icon}</div>}
                        <div className="list-item-details">
                            {itm?.header && <div className="list-item-hdr">{itm.header}</div>}
                            {itm?.info && <Link href={`${itm.path}${itm.info}`} className="list-item-info" target="_blank" rel="noopener noreferrer">{itm.info}</Link>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default React.memo(Contactlist)