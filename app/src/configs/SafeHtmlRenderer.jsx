"use client";
import React from 'react'
import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";

const SafeHtmlRenderer = ({ content }) => {
    // Sanitize html
    const cleanHtml = DOMPurify.sanitize(content, {
        USE_PROFILES: { html: true },
        ALLOWED_TAGS: [
            "h1",
            "h2",
            "h3",
            "h4",
            "p",
            "span",
            "strong",
            "em",
            "ul",
            "ol",
            "li",
            "a",
            "img",
            "blockquote",
            "pre",
            "code",
            "table",
            "thead",
            "tbody",
            "tr",
            "th",
            "td",
            "br",
            "hr",
            "div",
        ],
        ALLOWED_ATTR: [
            "href",
            "src",
            "alt",
            "title",
            "target",
            "class",
            "style"
        ]
    })
    // Convert html to react
    const parsedContent = parse(cleanHtml)
    return parsedContent;
}

export default React.memo(SafeHtmlRenderer)