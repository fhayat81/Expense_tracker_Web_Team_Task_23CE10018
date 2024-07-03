import React from "react";
import { IoClose } from "react-icons/io5";

const Settings = ({ setReset, currency, setCurrency, settings, setSettings }) => {
  return (
    <>{settings && (<div className="h-screen w-screen fixed top-0 left-0 backdrop-blur-sm bg-black/40 flex justify-center items-center">
      <div className="flex flex-col items-center bg-white drop-shadow-lg w-[200px] rounded-lg m-2 pb-2">
        <div className="flex items-center justify-between gap-20 bg-slate-200 w-[200px] h-[40px] rounded-t-lg p-2 py-3">
          <h1 className="text-xl font-semibold">Settings</h1>
          <IoClose onClick={()=>{setSettings(false)}} className="text-xl scale-105 active:scale-100"/>
        </div>
        <div className="flex gap-4 items-center mx-2 my-3">
          <h1>Currency:</h1>
          <div className="relative group">
            <p className="bg-slate-200 py-1 px-2 rounded-md drop-shadow-lg border-2 border-black cursor-pointer hover:scale-95">
              {currency}
            </p>
            <div className="hidden group-hover:block absolute top-full mt-1 bg-slate-300  py-1 px-1 rounded-md drop-shadow-lg border-2 border-black z-10 w-52 -translate-x-16">
              <p
                onClick={() => {
                  setCurrency("INR");
                }}
                className="cursor-pointer hover:bg-slate-500 px-1 rounded-md hover:text-white hover:scale-105"
              >
                INR (India Rupee)
              </p>
              <p
                onClick={() => {
                  setCurrency("GBP");
                }}
                className="cursor-pointer hover:bg-slate-500 px-1 rounded-md hover:text-white hover:scale-105"
              >
                GBP (Great Britain Pound)
              </p>
              <p
                onClick={() => {
                  setCurrency("EUR");
                }}
                className="cursor-pointer hover:bg-slate-500 px-1 rounded-md hover:text-white hover:scale-105"
              >
                EUR (Euro)
              </p>
              <p
                onClick={() => {
                  setCurrency("USD");
                }}
                className="cursor-pointer hover:bg-slate-500 px-1 rounded-md hover:text-white hover:scale-105"
              >
                USD (USA Dollars)
              </p>
              <p
                onClick={() => {
                  setCurrency("JPY");
                }}
                className="cursor-pointer hover:bg-slate-500 px-1 rounded-md hover:text-white hover:scale-105"
              >
                JPY (Japan Yen)
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={()=>{setReset(true)}} className="mx-2 bg-slate-200 py-1 px-2 rounded-md drop-shadow-lg border-2 border-black cursor-pointer active:scale-95 active:text-white">Reset</button>
        </div>
      </div>
    </div>)}
    </>
  );
};

export default Settings;
