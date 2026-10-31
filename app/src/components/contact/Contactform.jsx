"use client"
import axiosInstance from '@/configs/axiosInstance';
import React from 'react'
// import { redirect } from "next/navigation"; // this has been used in Server Side Componenet
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/redux/slices/snackbar";

const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
}

const Contactform = () => {
    const dispatch = useDispatch();
    const [form, setForm] = React.useState(initialData);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]:value }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        // console.log(form);

        try {
            const response = await axiosInstance.post('/api/enquiries', form);
            if (response.status === 201) {
                router.push("/thank-you");
            }
            else {
                dispatch(showSnackbar({ message: response.data?.message, severity: "error" }))
            }
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className='contact-form'>
        <div className="form-group">
            <label htmlFor="firstName" className='form-label'>First Name*</label>
            <input
                type="text"
                name="firstName"
                id="firstName"
                className='form-control'
                placeholder='First Name'
                value={form.firstName}
                onChange={handleChange}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="lastName" className='form-label'>Last Name*</label>
            <input
                type="text"
                name="lastName"
                id="lastName"
                className='form-control'
                placeholder='Last Name'
                value={form.lastName}
                onChange={handleChange}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="email" className='form-label'>Email Address*</label>
            <input
                type="email"
                name="email"
                id="email"
                className='form-control'
                placeholder='Email Address'
                value={form.email}
                onChange={handleChange}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="phone" className='form-label'>Phone Number*</label>
            <input
                type="text"
                name="phone"
                id="phone"
                className='form-control'
                placeholder='Phone Number'
                value={form.phone}
                onChange={handleChange}
                required
            />
        </div>
        <div className="form-group full-width">
            <label htmlFor="message" className='form-label'>Message</label>
            <textarea
                name="message"
                id="message"
                cols={24}
                rows={5}
                className='form-control'
                placeholder='Your Message'
                value={form.message}
                onChange={handleChange}
            ></textarea>
        </div>

        <div className="form-btns">
            <button type="submit" onClick={handleSubmit}>Send Now</button>
        </div>
    </div>
  )
}

export default React.memo(Contactform)