import React, { useState, useEffect, useCallback } from 'react';
const fn = require('./textToSpeech');

const RightComponent = () => {
  const [data, setData] = useState([]) 
  const handleFetch = useCallback(async () => {
    const endpoint = 'http://localhost:3000/comments';
    const response = await fetch(endpoint)
    const result = await response.json();
    
    const newResult = result.map((element) => [
      element.id,
      element.comment,
    ])
    setData(newResult)
  },[setData])

   useEffect(() => {
      handleFetch()
    },[]);
  
  useEffect(() => {
  
  },[data])

   const handleListen = (event) => {
     console.log(event.target.previousSibling.data);
     const speechTarget = event.target.previousSibling.data;
     fn.speak(speechTarget);
   }
   
   return (
      <div>
       <h1>Comentários</h1>
       {data.map((comment, index) => {
         return <ul style={{listStyle: "none"}}>
           <li key={index}>{comment[1]}
           <button onClick={event => handleListen(event)}>Ouvir</button>
           </li>
         </ul>
       })}
       
     </div>
   );
}

export default RightComponent;





