"use client";
import React from 'react'
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer"
import Image from 'next/image';
import moment from "moment";
import BlogFaqs from "@/components/blog/BlogFaqs";
import Link from 'next/link';

const Blogcontent = ({ data }) => {
  console.log(data.tags.length);

  return (
    <div className="blog-details">
      <div className="blog-poster">
        <div className="blog-image">
          <Image src={data?.mediaLink} alt="blog image" width={1000} height={800} unoptimized />
        </div>
        <div className="blog-date">{`${moment(data?.createdAt).format("Do MMM, YYYY")} - by ${data?.author?.name}`} </div>
      </div>
      <div className="blog-info">
        {/* <div className="blog-hdr">{data?.title}</div> */}
        <div className="blog-description">
          <SafeHtmlRenderer content={data?.description} />
        </div>
        {data?.blocks?.length>0 && (
          <div className="blog-content">
            {data?.blocks?.map((block, i) => (
              <div className="block-details" key={i}>
                { block?.blockType==="snippet" && <SafeHtmlRenderer content={block?.blockSnippet} /> }
                { block?.blockType==="tag" && <SafeHtmlRenderer content={`<${block?.blockTags}>${block?.blockContent}</${block?.blockTags}>`} /> }
              </div>
            ))}
          </div>
        )}
        {data?.blocks?.length>0 && <div style={{background:"grey", width:"100%", height:"0.1rem", margin:"1rem 0"}}></div>}

        {data?.author?.name && (
          <div className="blog-author">
            <div className="blog-author-hdr">Written and Verified by:</div>
            <div className="blog-author-info">
              <div className="blog-author-icon">
                <Image
                  src={`/wp-content/themes/sel/assets/img/logo/logo.png`}
                  alt="roofing sheet icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className="blog-author-details">
                <div className="blog-author-title">{data?.author?.name}</div>
                <div className="blog-author-description">
                  <span>Bio:</span>
                  <span>{data?.author?.bio}</span>
                </div>
                <div className="blog-author-links"></div>
              </div>
            </div>
          </div>
        )}
        {data?.author?.name && <div style={{background:"grey", width:"100%", height:"0.1rem", margin:"1rem 0"}}></div>}
        
        {data?.faqs?.length>0 && (
          <div className="blog-faqs">
            <BlogFaqs dataSet={data?.faqs} />
          </div>
        )}
        {data?.faqs?.length>0 && <div style={{background:"grey", width:"100%", height:"0.1rem", margin:"1rem 0"}}></div>}
        
        {data?.tags?.length>0 ? (
          <div className="blog-tags">
            <span className="blog-tags-hdr">Tags:</span>
            {data?.tags?.map((elm, i) => (
              <div className="blog-tags-link" key={i}>
                <Link href={elm?.url || '#'} target="_blank">{elm?.info}</Link>
              </div>
            ))}
          </div>
        ) : <div></div>}
      </div>
    </div>
  )
}

export default React.memo(Blogcontent)