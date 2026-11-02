import React from 'react'
import loader from "../assets/loader.svg"

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} width={200} alt="loader" />
    </div>
  )
}

export default React.memo(Loader)