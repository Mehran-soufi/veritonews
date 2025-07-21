import React from 'react'
import Time from './Time'

function HeaderTop() {
  return (
     <div className="w-full flex items-center justify-center bg-accent sticky top-0">
        <Time/>
     </div>
  )
}

export default HeaderTop