import React from 'react'

const LazyWrapper = ({ children, fallback }) => {
  return (
    <React.Suspense fallback={fallback || <div>Loading...</div>}>
      {children}
    </React.Suspense>
  )
}

export default LazyWrapper