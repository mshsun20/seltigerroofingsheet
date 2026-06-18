"use client";
import React from 'react'

const BoardOfCommittee = ({ committeeData, isOpen, toggle }) => {
  return (
    <div className={`committee-item ${isOpen ? 'active' : ''}`} key={committeeData?.committeeIndex} onClick={toggle}>
        <div className="committee-item-heading">
            <div className="committee-heading-part">{committeeData.type}</div>
            <div className="committee-toggler">
                {isOpen ? <span>-</span> : <span>+</span>}
            </div>
        </div>

        <div className="committee-item-content">
            {
                committeeData.members?.map((elm, i) => (
                    <div className="committee-item-details" key={i}>
                        {`${elm?.name}, ${elm?.position}, ${elm?.role}`}
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default React.memo(BoardOfCommittee)