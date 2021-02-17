import React, { useState, useEffect } from 'react';
const axios = require('axios');

const LeftComponent = () => {
  const [text, setText] = useState('');

  const handleFetch = () => {
    axios 
    .post('http://localhost:3000/comments', {
      comment: text
    })
    .then(res => {
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
    })
    .catch(error => {
      console.error(error)
    })
  };

  const handleForm = (event) => {
    event.preventDefault()
    handleFetch()
  }
  
  useEffect (() => {
    // handleFetch()
  },[text]);

  return (
    <div>
      <h1>Comentário</h1>
       <form>
        <textarea name="comment-area" onChange={event => setText(event.target.value)} value={text}>{text}</textarea>
        <button onClick={event => handleForm(event)}>Cadastrar</button>
      </form>
    </div>
  );
}

export default LeftComponent;