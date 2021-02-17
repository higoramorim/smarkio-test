import React from 'react';

const leftComponent = (props) => {
  
  return (
    <div>
      <h1>Comentário</h1>
      <form>
        <textarea name="comment-area" />
        <button>Cadastrar</button>
      </form>
    </div>
  );
}

export default leftComponent;
