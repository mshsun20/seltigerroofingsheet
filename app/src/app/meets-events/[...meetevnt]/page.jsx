import React from 'react'

const MeetAndEvent = async ({ params }) => {
  const { meetevnt } = await params
  console.log(meetevnt);
  return (
    <div className="content-layout">
      <div style={{padding:"5rem 0"}}>
        <table>
        <thead>
          <tr>
            <th>fecefv</th>
            <th>csdcw</th>
            <th>cfvwe</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>sqwsq</td>
            <td>sqwsqwd</td>
            <td>rwrrw</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default MeetAndEvent