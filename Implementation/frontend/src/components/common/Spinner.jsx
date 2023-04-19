import React from 'react'
import spinner from '../../assets/spin.gif'

const Spinner = () => {
  return (
<div class="w-full pl-auto flex justify-center items-center h-full">
  <img class="h-[150px] m-[200px]" src={spinner} alt="" />
</div>

  )
}

export default Spinner