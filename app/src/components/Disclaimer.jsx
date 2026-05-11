import React from 'react'
import moment from 'moment'

const Disclaimer = () => {
  return (
    <div className='disclaimer'>
        ©Copyright {moment().year()} SEL Tiger All rights reserved. Powered by Brrandom
    </div>
  )
}

export default React.memo(Disclaimer)