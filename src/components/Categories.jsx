import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const Categories = ({ income, expense, setPopUp, deleteCategory}) => {
  return (
    <div>
      <div className="mx-4 my-3 flex flex-col items-center">
        {/* Income Categories */}
        <div className="bg-white rounded-lg drop-shadow-lg w-[300px] sm:w-[700px] my-3">
          <h1 className="text-xl sm:text-2xl font-semibold bg-slate-200 px-2 py-1 rounded-t-lg">
            Income Categories
          </h1>
          <div className="sm:grid grid-cols-2">
            {income.map((data) => (
              <div key={data.id} className="my-1 mx-3 flex items-center w-[280px] justify-between relative">
                <div className="flex items-center">
                  <img src={data.img} alt="" className="w-10 m-2 rounded-full" />
                  <h1>{data.label}</h1>
                </div>
                <div className="group relative">
                  <BsThreeDots className="text-xl sm:text-2xl mx-2 w-[35px] bg-slate-200 rounded-lg border-2 border-black group-hover:scale-95" />
                  <div className="hidden group-hover:block absolute right-0 z-50 bg-slate-200 rounded-lg border-2 border-black -translate-y-12">
                    <p onClick={() => { deleteCategory(data.id, "Income") }} className="my-1 hover:bg-slate-500 cursor-pointer px-2 mx-1 hover:text-white rounded-lg active:scale-95">Delete</p>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Expense Categories */}
        <div className="bg-white rounded-lg drop-shadow-lg w-[300px] sm:w-[700px] my-3">
          <h1 className="text-xl sm:text-2xl font-semibold bg-slate-200 px-2 py-1 rounded-t-lg">
            Expense Categories
          </h1>
          <div className="sm:grid grid-cols-2">
            {expense.map((data) => (
              <div key={data.id} className="my-1 mx-3 flex items-center w-[280px] justify-between relative">
                <div className="flex items-center">
                  <img src={data.img} alt="" className="w-10 m-2 rounded-full" />
                  <h1>{data.label}</h1>
                </div>
                <div className="group relative">
                  <BsThreeDots className="text-xl sm:text-2xl mx-2 w-[35px] bg-slate-200 rounded-lg border-2 border-black group-hover:scale-95" />
                  <div className="hidden group-hover:block absolute right-0 z-50 bg-slate-200 rounded-lg border-2 border-black -translate-y-12">
                    <p onClick={() => { deleteCategory(data.id, data.val, "Expense") }} className="my-1 hover:bg-slate-500 cursor-pointer px-2 mx-1 hover:text-white rounded-lg active:scale-95">Delete</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* add category button */}
        <div className="bg-white drop-shadow-lg px-4 py-2 rounded-lg">
          <button onClick={() => { setPopUp(true) }} className="border-2 border-slate-500 rounded-lg px-2 py-1 text-slate-500 font-bold active:scale-95">ADD CATEGORY</button>
        </div>
      </div>
    </div>
  );
};

export default Categories;