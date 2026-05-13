"use client";
import React from 'react'

const contList = [
    {
        header: 'Our Location',
        icon: '',
        info: 'P-19 (Plate No.: D-403), Taratala Road, Opposite Modern Industries, Kolkata - 700088'
    },
    {
        header: 'Office Number',
        icon: '',
        info: '+917604081418'
    },
    {
        header: 'Other Number',
        icon: '',
        info: '18002022233'
    },
    {
        header: 'Our Mail',
        icon: '',
        info: 'crm.lead@shyammetalics.com'
    },
]

const Contactlist = () => {
    const contactListItems = React.useMemo(() => [...contList], [])
  return (
    <div className='conatct-list'>
        <div className="contact-list-hdr">
            <div className="contact-list-top"></div>
            <div className="contact-list-hdng"></div>
        </div>
        <div className="contact-list-items">
            {contactListItems?.length>0 && contactListItems?.map((itm, i) => (
                <div className="list-item" key={i}>
                    {itm?.icon && <div className="list-item-icn">{itm.icon}</div>}
                    {itm?.header && <div className="list-item-hdr">{itm.header}</div>}
                    {itm?.info && <div className="list-item-info">{itm.info}</div>}
                </div>
            ))}
        </div>
    </div>
  )
}

export default React.memo(Contactlist)