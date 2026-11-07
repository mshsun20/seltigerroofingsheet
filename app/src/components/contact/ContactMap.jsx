"use client";
import React from 'react';
const GoogleMap = React.lazy(() => import('@/components/common/GoogleMap'));

const ContactMap = () => {
  return (
    <div className="contact-part">
      <GoogleMap
        name="Shyam Metals & Energy Limited"
        address="P-19, Plate D, 403, Taratala Road, Kolkata 700088"
        rating={4.1}
        reviewCount={54}
        zoom={16}
        height="445px"
      />
    </div>
  )
}

export default React.memo(ContactMap)