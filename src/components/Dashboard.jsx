import React, { useState } from "react";
import { useEffect } from "react";

const Dashboard = ({
  income,
  expense,
  balance,
  currency,
  expenseCategories,
  incomeCategories,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(windowWidth >= 640? 580:280);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWidth(getMaxWidth(windowWidth))

    window.addEventListener("resize", handleResize);
    
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };

    
  }, []);

  const calculateWidth = (value, total, maxWidth) => {
    if (total === 0) return 0; // Avoid division by zero
    return Math.floor(maxWidth * (value / total));
  };
  const getMaxWidth = (innerWidth) => {
    if (innerWidth >= 640) {
      return 580;
    }
    return 280;
  };
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 my-2 gap-4">
        <div className="bg-white p-2 rounded-md drop-shadow-xl text-right w-[300px] sm:w-[200px] overflow-x-scroll">
          <h1 className="font-bold text-xl sm:text-2xl text-gray-600">
            Total Income:
          </h1>
          <p className="text-xl sm:text-2xl text-green-500  mx-1">
            {income} {currency}
          </p>
        </div>
        <div className="bg-white p-2 rounded-md drop-shadow-xl text-right w-[300px] sm:w-[200px] overflow-x-scroll">
          <h1 className="font-bold text-xl sm:text-2xl  text-gray-600">
            Total Expenses:
          </h1>
          <p className="text-xl sm:text-2xl text-red-500 mx-1">
            {expense} {currency}
          </p>
        </div>
        <div className="bg-white p-2 rounded-md drop-shadow-xl text-right w-[300px] sm:w-[200px] overflow-x-scroll">
          <h1 className="font-bold text-xl sm:text-2xl  text-gray-600">
            Balance:
          </h1>
          <p className="text-xl sm:text-2xl text-green-500 mx-1">
            {balance} {currency}
          </p>
        </div>
        {/* Income Category */}
        <div className="bg-white rounded-md w-[300px] sm:w-[630px] sm:col-span-3  drop-shadow-xl my-1">
          <div className="bg-slate-200 rounded-t-lg px-2 py-1">
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-500">
              Income Category
            </h1>
          </div>
          {income !== 0 && (
            <div className="mx-1 my-2">
              {incomeCategories.map(
                (data) =>
                  data.value !== 0 && (
                    <div key={data.id} className="my-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={data.img}
                            alt=""
                            className="w-7 m-2 rounded-full"
                          />
                          <h1>{data.label}</h1>
                        </div>

                        <div className="m-2 text-right">
                          <p className="text-green-500">
                            {data.value} {currency}
                          </p>
                          <p>{((data.value / income) * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                      <div className="flex justify-center items-center hover:scale-105 duration-200 ease-in-out">
                        <div className="bg-gray-200 h-3 w-[280px] sm:w-[580px] rounded-full">
                          <div
                            className="bg-green-500 h-3 rounded-full"
                            style={{
                              width: `${calculateWidth(
                                data.value,
                                income,
                                width,
                              )}px`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
          {income === 0 && (
            <div className="flex justify-center my-2">
              <p className="text-xl sm:text-2xl">No Income Yet</p>
            </div>
          )}
        </div>
        {/* Expense category */}
        <div className="bg-white rounded-md w-[300px] sm:w-[630px] sm:col-span-3  drop-shadow-xl my-1">
          <div className="bg-slate-200 rounded-t-lg px-2 py-1">
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-500">
              Expense Category
            </h1>
          </div>
          {expense !== 0 && (
            <div className="mx-1 my-2">
              {expenseCategories.map(
                (data) =>
                  data.value !== 0 && (
                    <div key={data.id} className="my-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={data.img}
                            alt=""
                            className="w-7 m-2 rounded-full"
                          />
                          <h1>{data.label}</h1>
                        </div>
                        <div className="m-2 text-right">
                          <p className="text-red-500">
                            {data.value} {currency}
                          </p>
                          <p>{((data.value / expense) * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                      <div className="flex justify-center items-center hover:scale-105 duration-200 ease-in-out">
                        <div className="bg-gray-200 h-3 w-[280px] sm:w-[580px] rounded-full">
                          <div
                            className="bg-red-500 h-3 rounded-full"
                            style={{
                              width: `${calculateWidth(
                                data.value,
                                expense,
                                width
                              )}px`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
          {expense === 0 && (
            <div className="flex justify-center my-2">
              <p className="text-xl sm:text-2xl">No expenses Yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
