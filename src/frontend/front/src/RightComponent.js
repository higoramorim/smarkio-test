import React from 'react';

const RightComponent = () => {
  const back = 'http://localhost:3000/comments'
   const handleBack = async () => {
     const result = await((await fetch(back)).json());
     return result
   }
    console.log(handleBack());
   return (

     <div>
       <h1>Comentários</h1>
     </div>
   );
}

export default RightComponent;
