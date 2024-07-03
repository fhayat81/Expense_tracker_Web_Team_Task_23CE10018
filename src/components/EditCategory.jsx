import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const EditCategory = ({ editPopUp, setEditPopUp, Icon, newCategoryInsert, cat, catType, editCategory }) => {
  const [icon, setIcon] = useState(cat.img);
  const [name, setName] = useState(cat.label);
  const [id, setId] = useState(cat.id);
  useEffect(() => {
    setIcon(cat.img);
    setName(cat.label);
    setId(cat.id);
  }, [cat]);
  return (
    <>
      {editPopUp && (
        <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-sm bg-black/40 overflow-y-scroll">
          <div className="bg-white drop-shadow-lg rounded-lg w-[300px] sm:w-[620px] my-1">
            <div className="bg-slate-200 rounded-t-lg px-4 py-2 flex justify-between items-center">
              <h1 className="text-xl sm:text-2xl font-semibold">
                Edit Category
              </h1>
              <IoClose
                onClick={() => {
                  setEditPopUp(false);
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
                  value={name}
                />
              </div>
              <div className="mt-2 flex items-center">
                <p className="font-medium">Type:</p>
                <p className="mx-2 text-slate-600 font-semibold w-[70px]">
                  {catType}
                </p>
                
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
                    <img
                      key={data.id}
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
                    editCategory(cat.id, icon, name, catType);
                    console.log(cat)
                    setEditPopUp(false);
                  }}
                  className="border-2 border-slate-500 rounded-lg px-2 py-1 text-slate-500 font-bold active:scale-95"
                >
                  EDIT CATEGORY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategory;
