import React from 'react'
import "../styles/login.css";
// import axiosInstance from '../config/axiosInstance';
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

const initialState = { success:false, message:"", data:null, attempt:0 }

const Login = () => {
    const dispatch = useDispatch();
    const [showPass, setShowPass] = React.useState(false);

    const reducerAction = async (prevState, formData) => {
        const payload = Object.fromEntries(formData);

        try {
            const response = await dispatch(login(payload));
            console.log(response);
            if (response.payload.success) {
                return {
                    success: true,
                    message: response.data.message,
                    data: response.data.data,
                    attempt: 0
                }
            }
            else {
                return {
                    success: false,
                    message: response.data.message,
                    data: null,
                    attempt: prevState.attempt + 1
                }
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
                data: null,
                attempt: prevState.attempt + 1
            }
        }
    }

    const [stateValue, dispatchAction, isPending] = React.useActionState(reducerAction, initialState);

  return (
    <div className="login-layout">
        <div className="login-container">
            <div className="login-header">Admin Panel</div>
            <form action={dispatchAction} className="login-form">
                <div className="login-form-group">
                    <label htmlFor="username" className="login-form-label">Username</label>
                    <input type="text" name="username" id="username" className="login-form-input" />
                </div>
                <div className="login-form-group">
                    <label htmlFor="password" className="login-form-label">Password</label>
                    <input type={showPass ? "text" : "password"} name="password" id="password" className="login-form-input" />
                    <div className="show-hide-btn" onClick={() => setShowPass(!showPass)}>
                        {showPass ? "hide" : "show"}
                    </div>
                </div>

                <div className="login-form-btns">
                    <input type="submit" value={isPending ? "Signing In" : "Sign In"} disabled={isPending} className="submit-btn" />
                </div>
            </form>

            {stateValue.message!=="" && (
                stateValue.success
                ? <div className="login-message success-messsage">{stateValue.message}</div>
                : <div className="login-message error-messsage">{stateValue.message}</div>
            )}
        </div>
    </div>
  )
}

export default Login