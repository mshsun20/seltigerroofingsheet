"use client";
import Image from 'next/image';
import React from 'react'

const ChooseGallery = ({ data }) => {
    const [tabIndex, setTabIndex] = React.useState(0)

    const handleTab = (e, i) => {
        e.preventDefault();
        setTabIndex(i)
    }

  return (
    <div className={data.className} id={`id${data.containerIndex}`}>
        <div className="gallery-poster">
            <Image
                src={data?.chooseImages[tabIndex]?.imageUrl}
                alt={data?.chooseImages[tabIndex]?.alt}
                width={data?.chooseImages[tabIndex]?.width}
                height={data?.chooseImages[tabIndex]?.height}
            />
        </div>
        <div className="gallery-tab">
            {
                data?.chooseImages?.length>0 && data?.chooseImages?.map(elm => (
                    <div
                        className={elm.className}
                        key={elm.tabIndex}
                        style={{backgroundColor:String(elm.color)}}
                        onClick={(e) => handleTab(e, elm.tabIndex)}
                    >
                        {/* {elm?.tabName} */}
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default React.memo(ChooseGallery)