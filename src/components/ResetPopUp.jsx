import React from "react";

const ResetPopUp = ({ reset, setReset, resetData }) => {
  return (
    <>
      {reset && (
        <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center">
          <div className="bg-white drop-shadow-lg rounded-lg">
            <div className="p-2 bg-slate-200 rounded-t-lg">
              <h1 className="text-xl sm:text-2xl font-semibold">Reset</h1>
            </div>
            <div className="p-1 flex flex-col items-center">
              <p className="w-[250px] text-center">
                Are you sure you want to reset your data?
              </p>
              <div className="flex justify-evenly w-[250px] my-2">
                <button
                  onClick={() => {
                    resetData();
                    setReset(false);
                  }}
                  className="bg-slate-200 px-2 py-1 rounded-lg border-2 border-slate-500 active:scale-95"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setReset(false);
                  }}
                  className="bg-slate-200 px-2 py-1 rounded-lg border-2 border-slate-500 active:scale-95"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPopUp;
