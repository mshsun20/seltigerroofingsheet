import React from 'react'
import "@/styles/components/card.css"

const Card = ({ poster, title, shortInfo }) => {
  return (
    <div className='card'>
        <div className="card-poster">
            {poster === "" ? <h3>{title || ""}</h3> : <img src={poster} alt={title} />}
        </div>
        <div className='card-info'>{shortInfo}</div>
    </div>
  )
}

export default Card