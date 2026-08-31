import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { checkAuth } from './redux/slices/authSlice';
import Loader from './components/Loader';
import Router from "./routes/Router";

const App = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated]);

  if (loading) return <Loader />    
  return <Router />
}

export default App