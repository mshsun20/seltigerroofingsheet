"use client"
import React from 'react'

const Contactform = () => {
    const handleSubmit = () => {}
  return (
    <div className='contact-form'>
        <div className="form-group">
            <label htmlFor="firstName" className='form-label'>First Name*</label>
            <input type="text" name="firstName" id="firstName" className='form-control' />
        </div>
        <div className="form-group">
            <label htmlFor="lastName" className='form-label'>Last Name*</label>
            <input type="text" name="lastName" id="lastName" className='form-control' />
        </div>
        <div className="form-group">
            <label htmlFor="email" className='form-label'>Email Address*</label>
            <input type="text" name="email" id="email" className='form-control' />
        </div>
        <div className="form-group">
            <label htmlFor="phone" className='form-label'>Phone Number*</label>
            <input type="text" name="phone" id="phone" className='form-control' />
        </div>
        <div className="form-group">
            <label htmlFor="message" className='form-label'>Message</label>
            {/* <input type="text" name="message" id="message" className='form-control' /> */}
            <textarea name="message" id="message" rows={5} className='form-control'></textarea>
        </div>

        <div className="form-btns">
            <button onClick={handleSubmit}>Send Now</button>
        </div>
    </div>
  )
}

export default React.memo(Contactform)