"use client";
import React from 'react'
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer"
import Image from 'next/image';
import moment from "moment";
import BlogFaqs from "@/components/blog/BlogFaqs";
import Link from 'next/link';
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

const Blogcontent = ({ data }) => {
  console.log(data.tags.length);

  return (
    <div className="blog-item-layout">
      <div className="blog-item-poster">
        <div className="blog-item-image">
          <Image src={data?.mediaLink} alt="blog image" width={1000} height={800} unoptimized />
        </div>
        <div className="blog-item-date">{`${moment(data?.createdAt).format("Do MMM, YYYY")} - by ${data?.author?.name}`} </div>
      </div>
      <div className="blog-item-info">
        {/* <div className="blog-item-hdr">{data?.title}</div> */}
        <div className="blog-item-description">
          <SafeHtmlRenderer content={data?.description} />
        </div>
        {data?.blocks?.length>0 && (
          <div className="blog-item-content">
            {data?.blocks?.map((block, i) => (
              <div className="block-details" key={i}>
                { block?.blockType==="snippet" && <SafeHtmlRenderer content={block?.blockSnippet} /> }
                { block?.blockType==="tag" && <SafeHtmlRenderer content={`<${block?.blockTags}>${block?.blockContent}</${block?.blockTags}>`} /> }
              </div>
            ))}
          </div>
        )}
        {data?.blocks?.length>0 && <div className="blog-divider"></div>}

        {data?.author?.name && (
          <div className="blog-item-author">
            <div className="blog-item-author-hdr">Written and Verified by:</div>
            <div className="blog-item-author-info">
              <div className="blog-item-author-icon">
                <Image
                  src={`/wp-content/themes/sel/assets/img/logo/logo.png`}
                  alt="roofing sheet icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className="blog-item-author-details">
                <div className="blog-item-author-title">{data?.author?.name}</div>
                <div className="blog-item-author-description">
                  <span className="blog-item-author-description-caption">Bio:&nbsp;</span>
                  <span className="blog-item-author-description-data">{data?.author?.bio}</span>
                </div>
                {data?.author?.socials?.length>0
                && (
                  <div className="blog-item-author-links">
                    {data?.author?.socials?.map((itm, i) => (
                      <Link href={itm?.link} key={i} target="_blank" className="social-link">
                        {String(itm?.provider).toLowerCase()==="facebook" && <FaFacebookF className="social-icon" />}
                        {String(itm?.provider).toLowerCase()==="instagram" && <BsInstagram className="social-icon" />}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {data?.author?.name && <div className="blog-divider"></div>}
        
        {data?.faqs?.length>0 && (
          <div className="blog-item-faqs">
            <BlogFaqs dataSet={data?.faqs} />
          </div>
        )}
        {data?.faqs?.length>0 && <div className="blog-divider"></div>}
        
        {data?.tags?.length>0 && (
          <div className="blog-item-tags">
            <span className="blog-item-tags-hdr">Tags:</span>
            <div className="blog-item-tags-info">
              {data?.tags?.map((elm, i) => (
                <div className="blog-item-tags-link" key={i}>
                  <Link href={elm?.url || '#'} target="_blank">{elm?.info}</Link>
                </div>
              ))}
            </div>
          </div>
        )}
        {data?.tags?.length>0 && <div className="blog-divider"></div>}
      </div>
    </div>
  )
}

export default React.memo(Blogcontent)