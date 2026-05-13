import React from 'react'
import Contactlist from './Contactlist'
import Contactform from './Contactform'

const Contactpart = () => {
  return (
    <div className="contact-part">
        <Contactlist />
        <Contactform />
    </div>
  )
}

export default React.memo(Contactpart)