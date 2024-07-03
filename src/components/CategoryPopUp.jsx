import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const CategoryPopUp = ({ popUp, setPopUp, Icon, newCategoryInsert }) => {
  const [icon, setIcon] = useState(Icon[0].img);
  const [type, setType] = useState("Income");
  const [name, setName] = useState("");
  return (
    <>
      {popUp && (
        <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-sm bg-black/40 overflow-y-scroll">
          <div className="bg-white drop-shadow-lg rounded-lg w-[300px] sm:w-[620px] my-1">
            <div className="bg-slate-200 rounded-t-lg px-4 py-2 flex justify-between items-center">
              <h1 className="text-xl sm:text-2xl font-semibold">
                Add Category
              </h1>
              <IoClose
                onClick={() => {
                  setPopUp(false);
                }}
                className="text-3xl sm:text-4xl active:scale-95"
              />
            </div>
            <div className="mx-2 my-3">
              <div className="flex items-center">
                <p className="font-medium">Category Name:</p>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="w-[150px] sm:w-[300px] mx-2 border-2 px-2 py-1 border-slate-500 rounded-lg"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="mt-2 flex items-center">
                <p className="font-medium">Type:</p>
                <p className="mx-2 text-slate-600 font-semibold w-[70px]">
                  {type}
                </p>
                <div className="flex mx-auto my-1 gap-3">
                  <p
                    onClick={() => {
                      setType("Income");
                    }}
                    className="bg-slate-200 px-2 py-1 rounded-lg border-2 border-slate-500 text-slate-700 active:scale-90 cursor-pointer"
                  >
                    Income
                  </p>
                  <p
                    onClick={() => {
                      setType("Expense");
                    }}
                    className="bg-slate-200 px-2 py-1 rounded-lg border-2 border-slate-500 text-slate-700 active:scale-90 cursor-pointer"
                  >
                    Expense
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-center">
                  <p className="font-medium">Icon:</p>
                  <img
                    src={icon}
                    alt=""
                    className="w-10 m-2 rounded-full border-2 border-slate-500 p-1"
                  />
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-10 bg-slate-100 rounded-lg border-2 border-slate-500 ">
                  {Icon.map((data) => (
                    <img key={data.id}
                      onClick={() => {
                        setIcon(data.img);
                      }}
                      src={data.img}
                      alt=""
                      className="w-10 m-2 rounded-full border-2 border-slate-500 p-1 active:scale-90 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => {
                    newCategoryInsert(icon, name, type);
                    setPopUp(false);
                  }}
                  className="border-2 border-slate-500 rounded-lg px-2 py-1 text-slate-500 font-bold active:scale-95"
                >
                  SET CATEGORY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryPopUp;
