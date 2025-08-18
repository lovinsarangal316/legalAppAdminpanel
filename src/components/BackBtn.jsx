import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <div className="back_button">
      <IoMdArrowRoundBack size={25} onClick={() => navigate(-1)} />
    </div>
  );
};

export default BackBtn;
