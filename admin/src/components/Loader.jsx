import React from 'react'

const Loader = () => {
  return (
    <div className="loader">
        <img src="/loader.svg" width={200}  alt="loader" />
    </div>
  )
}

export default React.memo(Loader)