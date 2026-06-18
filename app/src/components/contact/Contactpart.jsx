"use client";
import React from 'react'
import Contactlist from './Contactlist'
import Contactform from './Contactform'
import Contactlocation from './Contactlocation'

const Contactpart = () => {
  return (
    <div className="contact-part">
        <Contactlist />
        <Contactform />
        <Contactlocation />
    </div>
  )
}

export default React.memo(Contactpart)