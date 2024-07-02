import React from "react";
import logo from "../assets/logo.png";
import { IoMenu } from "react-icons/io5";
const Navbar = ({setSide, side}) => {
  return (
    <div className="bg-violet-400 text-white">
      <div className="px-2 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <img className="py-2 w-[50px] sm:w-[75px]" src={logo} alt="logo" />
          <h1 className="text-2xl sm:text-4xl font-bold">Expense Tracker</h1>
        </div>
        <div>
          <button onClick={()=>{setSide(!side);}} className="mx-4 text-4xl sm:text-5xl"><IoMenu className="active:border-2 border-white rounded-md"/></button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
