import React from 'react'

export default function RightButton({ id, onClick, word}) {
  return (
    <button id={`rbutton${id}`} className="btn btn-lg word-button" onClick={() => onClick(word)}>
      {word}
    </button>
  )
}
