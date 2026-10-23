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
        <div className="footer-container">
            <div className="contnr">
                <div className="footer-top">
                    <Infosec />
                    <Quicklinks />
                    <Productlinks />
                    <Subscription />
                </div>
                <div className="footer-bottom">
                    <Disclaimer />
                    <Policylinks />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer