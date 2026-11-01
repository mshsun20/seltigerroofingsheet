"use client";
import React from 'react';
import Contactlist from './Contactlist';
import Contactform from './Contactform';
import Contactlocation from './Contactlocation';
// const GoogleMap = React.lazy(() => import('@/components/common/GoogleMap'));

const Contactpart = () => {
  return (
    <div className="contact-part">
      <Contactlist />
      <Contactform />
      <Contactlocation />
      {/* <GoogleMap
        name="Shyam Metals & Energy Limited"
        address="P-19, Plate D, 403, Taratala Road, Kolkata 700088"
        rating={4.1}
        reviewCount={54}
        zoom={16}
        height="445px"
      /> */}
    </div>
  )
}

export default React.memo(Contactpart)