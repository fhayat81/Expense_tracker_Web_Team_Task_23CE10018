import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const Filter = ({
  currency,
  income,
  expense,
  newTransaction,
  record,
  deleteTransaction,
}) => {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [searchDate, setSearchDate] = useState(true);
  const [searchRange, setSearchRange] = useState(false);
  const [searchType, setSearchType] = useState(false);
  const [searchCategory, setSearchCategory] = useState(false);

  const [catTypeBut, setCatTypeBut] = useState("Income");
  const [incomeCategory, setIncomeCategory] = useState(income[0]);
  const [expenseCategory, setExpenseCategory] = useState(expense[0]);
  const [type, setType] = useState("Income");
  const [arr, setArr] = useState(record);
  const [range, setRange] = useState({ min: 0, max: 100 });
  const [date, setDate] = useState({ day: 0, month: 0, year: 0 });

  useEffect(() => setArr(record), [record]);

  useEffect(() => {
    if (searchCategory) {
      filterCategory();
    } else if (searchType) {
      filterType();
    } else if (searchRange) {
      filterRange();
    } else {
      setArr(record);
    }
  }, [
    searchCategory,
    catTypeBut,
    incomeCategory,
    expenseCategory,
    type,
    searchType,
    range,
    searchRange,
  ]);

  const filterType = () => {
    let updated = record.filter((data) => data.type === type);
    setArr(updated);
  };

  const filterCategory = () => {
    let updated = record.filter((data) => {
      if (catTypeBut === "Income") {
        return data.cat.id === incomeCategory.id && data.type === catTypeBut;
      } else {
        return data.cat.id === expenseCategory.id && data.type === catTypeBut;
      }
    });
    setArr(updated);
  };

  const filterRange = () => {
    let updated = record.filter(
      (data) =>
        parseFloat(data.amount) >= parseFloat(range.min) &&
        parseFloat(data.amount) <= parseFloat(range.max)
    );
    setArr(updated);
  };

  const filterdate = () => {
    let updated = record.filter(
      (data) =>(
        (parseInt(date.day) === 0 ||
          parseInt(data.time.date) === parseInt(date.day)) &&
        (parseInt(date.month) === 0 ||
          (parseInt(data.time.month) === parseInt(date.month) - parseInt(1))) &&
            (parseInt(date.year) === 0 ||
              parseInt(data.time.year) === parseInt(date.year)))
    );
    setArr(updated);
  };

  return (
    <div className="flex flex-col items-center justify-center my-2">
      <div className="bg-white drop-shadow-lg rounded-lg w-[300px] sm:w-[600px]">
        <div className="bg-slate-200 p-2 rounded-t-lg">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-500">
            Filter Transaction
          </h1>
        </div>
        <div className="mx-1 my-2">
          {/* buttons */}
          <div className="flex justify-around items-center my-2">
            <button
              onClick={() => {
                setSearchDate(true);
                setSearchRange(false);
                setSearchType(false);
                setSearchCategory(false);
              }}
              className={`${
                searchDate ? "bg-slate-400" : "bg-slate-200"
              }  p-1 rounded-lg border-2 border-slate-500 active:scale-95`}
            >
              Date
            </button>
            <button
              onClick={() => {
                setSearchDate(false);
                setSearchRange(true);
                setSearchType(false);
                setSearchCategory(false);
              }}
              className={`${
                searchRange ? "bg-slate-400" : "bg-slate-200"
              }  p-1 rounded-lg border-2 border-slate-500 active:scale-95`}
            >
              Range
            </button>
            <button
              onClick={() => {
                setSearchDate(false);
                setSearchRange(false);
                setSearchType(true);
                setSearchCategory(false);
              }}
              className={`${
                searchType ? "bg-slate-400" : "bg-slate-200"
              }  p-1 rounded-lg border-2 border-slate-500 active:scale-95`}
            >
              Type
            </button>
            <button
              onClick={() => {
                setSearchDate(false);
                setSearchRange(false);
                setSearchType(false);
                setSearchCategory(true);
              }}
              className={`${
                searchCategory ? "bg-slate-400" : "bg-slate-200"
              }  p-1 rounded-lg border-2 border-slate-500 active:scale-95`}
            >
              Category
            </button>
          </div>
          <div className="bg-gray-600 h-[2px] rounded-full my-2"></div>
          <div>
            {/* Date-Wise */}
            {searchDate && (
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-around mx-2">
                  <div className="flex items-center my-1">
                    <h1>Date:</h1>
                    <input
                      type="number"
                      className="bg-slate-200 w-[40px] mx-1 rounded-lg border-2 border-slate-500 text-right"
                      onChange={(e) => {
                        setDate({
                          day: e.target.value,
                          month: date.month,
                          year: date.year,
                        });
                      }}
                      value={date.day}
                    />
                  </div>
                  <div className="flex items-center my-1">
                    <h1>Month:</h1>
                    <input
                      type="number"
                      className="bg-slate-200 w-[40px] mx-1 rounded-lg border-2 border-slate-500 text-right"
                      onChange={(e) => {
                        setDate({
                          day: date.day,
                          month: e.target.value,
                          year: date.year,
                        });
                      }}
                      value={date.month}
                    />
                  </div>
                  <div className="flex items-center my-1">
                    <h1>year:</h1>
                    <input
                      type="number"
                      className="bg-slate-200 w-[80px] mx-1 rounded-lg border-2 border-slate-500 text-right"
                      onChange={(e) => {
                        setDate({
                          day: date.day,
                          month: date.month,
                          year: e.target.value,
                        });
                      }}
                      value={date.year}
                    />
                  </div>
                </div>
                <div className="flex justify-end mx-2 my-1">
                  <button
                    onClick={() => {
                      filterdate();
                    }}
                    className="mx-1 text-slate-500 font-semibold border-4 border-slate-500 rounded-lg border-double  px-2 py-1 active:scale-95"
                  >
                    SEARCH
                  </button>
                  <button
                    onClick={() => {
                      setArr(record);
                    }}
                    className="text-slate-500 font-semibold border-4 border-slate-500 rounded-lg border-double  px-2 py-1 active:scale-95"
                  >
                    <IoClose className="text-xl scale-105 active:scale-100 mx-1" />
                  </button>
                </div>
              </div>
            )}
            {/* Range-Wise */}
            {searchRange && (
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between mx-2">
                  <div className="flex items-center my-1">
                    <h1>Min:</h1>
                    <input
                      type="number"
                      className="bg-slate-200 w-[180px] mx-1 rounded-lg border-2 border-slate-500 text-right"
                      onChange={(e) => {
                        setRange({ min: e.target.value, max: range.max });
                      }}
                      value={range.min}
                    />
                    <p className="mx-2">{currency}</p>
                  </div>
                  <div className="flex items-center my-1">
                    <h1>Max:</h1>
                    <input
                      type="number"
                      className="bg-slate-200 w-[180px] mx-1 rounded-lg border-2 border-slate-500 text-right"
                      onChange={(e) => {
                        setRange({ min: range.min, max: e.target.value });
                      }}
                      value={range.max}
                    />
                    <p className="mx-2">{currency}</p>
                  </div>
                </div>
              </div>
            )}
            {/* Type-Wise */}
            {searchType && (
              <div className="my-4">
                <div className="flex justify-evenly">
                  <button
                    onClick={() => {
                      setType("Income");
                    }}
                    className="text-slate-500 font-semibold border-4 border-slate-500 rounded-lg border-double  px-2 py-1 active:scale-95"
                  >
                    Income
                  </button>
                  <button
                    onClick={() => {
                      setType("Expense");
                    }}
                    className="text-slate-500 font-semibold border-4 border-slate-500 rounded-lg border-double  px-2 py-1 active:scale-95"
                  >
                    Expense
                  </button>
                </div>
              </div>
            )}
            {/* Category-Wise */}
            {searchCategory && (
              <div className="mx-2">
                <div className="flex flex-col sm:flex-row sm:justify-evenly">
                  <div className="flex items-center my-2">
                    <h1>Type: </h1>
                    <button
                      onClick={() => {
                        setCatTypeBut(
                          catTypeBut === "Income" ? "Expense" : "Income"
                        );
                      }}
                      className="mx-2 bg-slate-200 px-2 py-1 rounded-lg border-2 border-slate-500 active:scale-95"
                    >
                      {catTypeBut}
                    </button>
                  </div>
                  <div className="flex items-center">
                    <h1 className="mr-2">Category:</h1>
                    <div>
                      {/* income category */}
                      {catTypeBut === "Income" && (
                        <div className="group">
                          <div className="flex items-center bg-slate-200 rounded-lg px-1 pr-4 border-slate-500 border-2 cursor-pointer active:scale-90">
                            <img
                              src={incomeCategory.img}
                              alt=""
                              className="w-7 m-2 rounded-full"
                            />
                            <h1>{incomeCategory.label}</h1>
                          </div>
                          <div className="hidden group-hover:block bg-slate-200 border-2 border-slate-500 rounded-lg mt-1 absolute bottom-0 h-[150px] overflow-y-scroll">
                            {income.map((data) => (
                              <div
                                onClick={() => {
                                  setIncomeCategory(data);
                                }}
                                key={data.id}
                                className="flex items-center hover:scale-90 rounded-lg hover:bg-slate-400 cursor-pointer pr-2"
                              >
                                <img
                                  src={data.img}
                                  alt=""
                                  className="w-7 m-2 rounded-full"
                                />
                                <h1>{data.label}</h1>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* expense category */}
                      {catTypeBut === "Expense" && (
                        <div className="group">
                          <div className="flex items-center bg-slate-200 rounded-lg px-1 pr-4 border-slate-500 border-2 cursor-pointer active:scale-90">
                            <img
                              src={expenseCategory.img}
                              alt=""
                              className="w-7 m-2 rounded-full"
                            />
                            <h1>{expenseCategory.label}</h1>
                          </div>
                          <div className="hidden group-hover:block bg-slate-200 border-2 border-slate-500 rounded-lg mt-1 absolute bottom-0 h-[150px] overflow-y-scroll">
                            {expense.map((data) => (
                              <div
                                onClick={() => {
                                  setExpenseCategory(data);
                                }}
                                key={data.id}
                                className="flex items-center hover:scale-90 rounded-lg hover:bg-slate-400 cursor-pointer pr-2"
                              >
                                <img
                                  src={data.img}
                                  alt=""
                                  className="w-7 m-2 rounded-full"
                                />
                                <h1>{data.label}</h1>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Transactions */}
      <div className="my-1">
        {arr.length !== 0 &&
          arr
            .slice()
            .reverse()
            .map((data) => (
              <div
                key={data.id}
                className="bg-white rounded-lg drop-shadow-lg w-[300px] sm:w-[600px]"
              >
                <div className="bg-slate-300 rounded-t-lg">
                  <h1 className="mx-2 my-1 text-lg font-semibold flex justify-between items-center">
                    <div className="flex gap-2">
                      <p>{data.time.date}</p>
                      <p>{month[data.time.month]}</p>
                      <p>{data.time.year},</p>
                      <p>{day[data.time.day]}</p>
                    </div>
                    <div
                      onClick={() => {
                        deleteTransaction(data);
                      }}
                      className="bg-red-500 text-white rounded-lg m-1 active:scale-95"
                    >
                      <MdDelete className="text-2xl sm:text-3xl m-1" />
                    </div>
                  </h1>
                </div>
                <div className="mx-2 my-1">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl">{data.title}</h1>
                    {data.type === "Income" && (
                      <h1 className="text-3xl mx-1 text-green-500 text-right">
                        {" "}
                        +{data.amount}
                      </h1>
                    )}
                    {data.type === "Expense" && (
                      <h1 className="text-3xl mx-1 text-red-500 text-right">
                        {" "}
                        -{data.amount}
                      </h1>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={data.cat.img}
                        alt=""
                        className="w-7 m-2 rounded-full"
                      />
                      <p>{data.cat.label}</p>
                    </div>
                    <div className="mx-2 group flex justify-end">
                      <p className="bg-slate-300 rounded-lg p-1 hover:scale-95 cursor-pointer">
                        Note
                      </p>
                      <p className="hidden group-hover:block absolute bottom-0 w-[280px] sm:w-[580px] bg-slate-200 p-2 rounded-lg drop-shadow-lg z-20 my-2">
                        {data.note}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        {arr.length === 0 && (
          <div className="bg-white drop-shadow-lg p-2 flex justify-center rounded-lg w-[300px] sm:w-[600px]">
            <p className="text-center text-xl sm:text-2xl text-slate-500 font-semibold">
              No Transactions
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
