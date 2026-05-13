"use client"
import React from 'react'

const Contactform = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    }

  return (
    <div className='contact-form'>
        <div className="form-group">
            <label htmlFor="firstName" className='form-label'>First Name*</label>
            <input type="text" name="firstName" id="firstName" className='form-control' placeholder='First Name' required />
        </div>
        <div className="form-group">
            <label htmlFor="lastName" className='form-label'>Last Name*</label>
            <input type="text" name="lastName" id="lastName" className='form-control' placeholder='Last Name' required />
        </div>
        <div className="form-group">
            <label htmlFor="email" className='form-label'>Email Address*</label>
            <input type="email" name="email" id="email" className='form-control' placeholder='Email Address' required />
        </div>
        <div className="form-group">
            <label htmlFor="phone" className='form-label'>Phone Number*</label>
            <input type="text" name="phone" id="phone" className='form-control' placeholder='Phone Number' required />
        </div>
        <div className="form-group full-width">
            <label htmlFor="message" className='form-label'>Message</label>
            <textarea name="message" id="message" cols={24} rows={5} className='form-control' placeholder='Your Message'></textarea>
        </div>

        <div className="form-btns">
            <button type="submit" onClick={handleSubmit}>Send Now</button>
        </div>
    </div>
  )
}

export default React.memo(Contactform)