import React from 'react'
import Infosec from './Infosec'
import Quicklinks from './Quicklinks'
import Productlinks from './Productlinks'
import Subscription from './Subscription'
import Disclaimer from './Disclaimer'
import Policylinks from './Policylinks'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-container container">
            <div className="footer-top">
                <Infosec />
                <Quicklinks />
            </div>
            <div className="footer-middle">
                <Productlinks />
                <Subscription />
            </div>
            <div className="footer-bottom">
                <Disclaimer />
                <Policylinks />
            </div>
        </div>
    </div>
  )
}

export default Footer