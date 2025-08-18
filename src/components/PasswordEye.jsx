import React from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordEye = ({ openEye, setEye }) => {
  const clickHandler = () => {
    setEye(!openEye)
  }
  return (
    <div className='cursor'>
      {
        !openEye ? <FaEyeSlash onClick={clickHandler} /> : <FaEye onClick={clickHandler} />
      }
    </div>
  )
}

export default PasswordEye