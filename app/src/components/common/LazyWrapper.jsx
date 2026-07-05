import React from 'react'
import DefaultLoader from "@/components/common/DefaultLoader";

const LazyWrapper = ({ children, fallback }) => {
  return (
    <React.Suspense fallback={fallback || <DefaultLoader />}>
      {children}
    </React.Suspense>
  )
}

export default LazyWrapper