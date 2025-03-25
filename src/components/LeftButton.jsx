import React from 'react';

export default function LeftButton({ id, onClick, backgroundColor, letter, mt }){
  return (
    <button id={id} className={`btn letter-button${mt ? ' mt-3' : ''}`} style={{ backgroundColor }} onClick={onClick}>
      {letter}
    </button>
  );
};

