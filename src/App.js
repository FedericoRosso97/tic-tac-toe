import { useState } from 'react';


function Square({ value }){
  const [value, setValue] = useState(null);
  
  function handleClick(){
    console.log('click');
  }
  
  return (
    <button 
      className="square"
      onClick={handleClick}
    >
      { value }
    </button>);
}
export default function Board() {
  return (
  
  <>
      <div className="board-row">
        <Square  />
        <Square  />
        <Square  />
      </div>
      <div className="board-row">
        <Square  />
        <Square  />
        <Square  />
      </div>
      <div className="board-row">
        <Square  />
        <Square  />
        <Square  />
      </div>
    </>
  );
}


