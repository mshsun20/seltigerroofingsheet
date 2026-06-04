"use client";
import React from 'react'
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer"
import Image from 'next/image';
import moment from "moment";

const Blogcontent = ({ data }) => {
  console.log(data);
  const [blocks] = React.useState([...data?.blocks])

  return (
    <div className="blog-details">
      <div className="blog-poster">
        <div className="blog-image">
          <Image src={data?.mediaLink} alt="blog image" width={1000} height={800} unoptimized />
        </div>
        <div className="blog-date">{`${moment(data?.createdAt).format("Do MMM, YYYY")} - by Shyam Metalics`} </div>
      </div>
      <div className="blog-info">
        <div className="blog-hdr">{data?.title}</div>
        <div className="blog-content">
          {blocks?.length>0 && blocks?.map((block, i) => (
            <div className="block-details" key={i}>
              { block?.blockType==="snippet" && <SafeHtmlRenderer content={block?.blockSnippet} /> }
              { block?.blockType==="tag" && <SafeHtmlRenderer content={`<${block?.blockTags}>${block?.blockContent}</${block?.blockTags}>`} /> }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Blogcontent)