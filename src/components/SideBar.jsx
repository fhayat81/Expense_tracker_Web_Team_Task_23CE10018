import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({ side, setSettings, setSide }) => {
  return (
    <>
      {side && (
        <div className="bg-gray-50 w-[18rem] absolute right-0 h-full drop-shadow-xl z-10">
          <div className="my-2">
            <Link to="/">
              <p onClick={()=>{setSide(false)}} className="my-1 mx-1 text-md hover:bg-gray-200 rounded-md py-1 cursor-pointer px-2">
                DashBoard
              </p>
            </Link>
            <Link to="/transaction">
              <p onClick={()=>{setSide(false)}} className="my-1 mx-1 text-md hover:bg-gray-200 rounded-md py-1 cursor-pointer px-2">
                Transactions
              </p>
            </Link>
            <Link to="/searchtransaction">
              <p onClick={()=>{setSide(false)}} className="my-1 mx-1 text-md hover:bg-gray-200 rounded-md py-1 cursor-pointer px-2">
                Filter Transactions
              </p>
            </Link>
            <Link to="/categories">
              <p onClick={()=>{setSide(false)}} className="my-1 mx-1 text-md hover:bg-gray-200 rounded-md py-1 cursor-pointer px-2">
                Categories
              </p>
            </Link>
            <p onClick={()=>{setSettings(true); setSide(false)}} className="my-1 mx-1 text-md hover:bg-gray-200 rounded-md py-1 cursor-pointer px-2">
              Settings
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
