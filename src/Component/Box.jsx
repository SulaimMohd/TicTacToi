import React, { useState } from 'react'

export default function Box({id, currentText, isSelected, isWin ,handleClick}) {
  return (
    <div className={`box`} style={isWin ? {backgroundColor:'#2d414b'}:{}} onClick={()=> !isSelected ?  handleClick(id):null}>
        {
          currentText
        }
    </div>
  )
}
