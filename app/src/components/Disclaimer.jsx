import React from 'react'
import moment from 'moment'

const Disclaimer = () => {
  return (
    <div className='disclaimer'>
        ©Copyright {moment().year()} SEL Tiger All rights reserved. Powered by Shyam Metalics IT Digital.
    </div>
  )
}

export default React.memo(Disclaimer)