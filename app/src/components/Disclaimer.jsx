"use client";
import React from 'react'
import moment from 'moment'

const Disclaimer = () => {
  return (
    <div className='disclaimer'>
      © Copyright {moment().year()} SEL Tiger All rights reserved & Protected.
    </div>
  )
}

export default React.memo(Disclaimer)