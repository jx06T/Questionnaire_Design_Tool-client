import React from 'react';

function Block(props) {
  return (
    <div className='block'>
      {props.children}
    </div>
  );
}

export default Block;
