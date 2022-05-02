import React from 'react'
import { useParams } from 'react-router-dom';
const Redirect = () => {
    const { code } = useParams();
    console.log(code);
  return (
      <>
          <div>redirect</div>
          {code ? <text>{code}</text> : null}
      </>   
    
  )
}

export default Redirect