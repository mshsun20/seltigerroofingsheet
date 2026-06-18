import React from 'react'

const MeetAndEvent = async ({ params }) => {
  const { meetevnt } = await params
  console.log(meetevnt);
  return (
    <div>Meet And Event</div>
  )
}

export default MeetAndEvent