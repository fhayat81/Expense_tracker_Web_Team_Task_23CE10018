import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const Transactions = ({
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

  const [type, setType] = useState("Income");
  const [title, setTitle] = useState("Untitled");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [incomeCategory, setIncomeCategory] = useState(income[0]);
  const [expenseCategory, setExpenseCategory] = useState(expense[0]);
  const [category, setCategory] = useState(incomeCategory);
  const [date, setDate] = useState(null);
  const [dte, setDte] = useState(new Date());

  useEffect(() => {
    const time = new Date(date);
    setDte(time);
  }, [date]);

  return (
    <div className="my-3 mx-4">
      <div className="flex flex-col items-center justify-center ">
        {/* set transaction */}
        <div className="bg-white rounded-lg drop-shadow-lg w-[300px] sm:w-[600px]">
          <div className="bg-slate-300 rounded-t-lg">
            <h1 className="mx-2 my-1 text-xl sm:text-2xl font-semibold">
              Set Transaction
            </h1>
          </div>
          <div className="my-2 mx-2">
            {/* Title */}
            <div className="flex items-center my-2">
              <h1>Title:</h1>
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="bg-slate-200 border-2 border-slate-600 rounded-lg px-2 py-1 mx-2 w-[240px] sm:w-[540px] text-right"
                type="text"
                value={title}
              />
            </div>
            {/* Amount */}
            <div className="flex items-center">
              <h1>Enter Amount: </h1>
              <input
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                className="bg-slate-200 border-2 border-slate-600 rounded-lg px-2 py-1 mx-4 w-[120px] sm:w-[400px] text-right"
                type="number"
                value={amount}
              />
              <h1>{currency}</h1>
            </div>
            <div className="flex items-center my-2">
              <h1>Type:</h1>
              <p className="mx-1 w-[60px]">{type}</p>
              <div className="mx-1">
                <button
                  onClick={() => {
                    setType("Income");
                    setCategory(incomeCategory);
                  }}
                  className="mx-1 bg-slate-300 rounded-lg px-2 py-1 border-slate-500 border-2 active:scale-90"
                >
                  Income
                </button>
                <button
                  onClick={() => {
                    setType("Expense");
                    setCategory(expenseCategory);
                  }}
                  className="mx-1 bg-slate-300 rounded-lg px-2 py-1 border-slate-500 border-2 active:scale-90"
                >
                  Expense
                </button>
              </div>
            </div>
            {/* date*/}
            <div className="my-2">
              <div className="flex items-center gap-1">
                <h1>Date:</h1>
                <input
                  type="date"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  className="bg-slate-200 border-2 border-slate-600 rounded-lg px-2 py-1 w-[140px] text-right"
                />
              </div>
            </div>
            {/* Category */}
            <div className="flex items-center">
              <h1 className="mr-2">Category:</h1>
              <div>
                {/* income category */}
                {type === "Income" && (
                  <div className="group">
                    <div className="flex items-center bg-slate-200 rounded-lg px-1 pr-4 border-slate-500 border-2 cursor-pointer active:scale-90">
                      <img
                        src={incomeCategory.img}
                        alt=""
                        className="w-7 m-2 rounded-full"
                      />
                      <h1>{incomeCategory.label}</h1>
                    </div>
                    <div className="hidden group-hover:block bg-slate-200 border-2 border-slate-500 rounded-lg mt-1 absolute h-[150px] overflow-y-scroll">
                      {income.map((data) => (
                        <div
                          onClick={() => {
                            setIncomeCategory(data);
                            setCategory(data);
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
                {type === "Expense" && (
                  <div className="group">
                    <div className="flex items-center bg-slate-200 rounded-lg px-1 pr-4 border-slate-500 border-2 cursor-pointer active:scale-90">
                      <img
                        src={expenseCategory.img}
                        alt=""
                        className="w-7 m-2 rounded-full"
                      />
                      <h1>{expenseCategory.label}</h1>
                    </div>
                    <div className="hidden group-hover:block bg-slate-200 border-2 border-slate-500 rounded-lg mt-1 absolute h-[150px] overflow-y-scroll">
                      {expense.map((data) => (
                        <div
                          onClick={() => {
                            setExpenseCategory(data);
                            setCategory(data);
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
            {/* Note */}
            <div className="my-2 flex">
              <h1>Note:</h1>
              <textarea
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                type="text"
                placeholder="Details of the transaction"
                className="bg-slate-300 rounded-lg border-2 border-slate-500 px-2 py-1 h-24 w-[230px] sm:w-[530px] mx-2"
                value={note}
              />
            </div>
            {/* set button */}
            <div className="flex justify-center items-center">
              <button
                onClick={() => {
                  newTransaction(title, amount, category, note, type, dte);
                  setTitle("Untitled");
                  setAmount(0);
                  setCategory(incomeCategory);
                  setNote("");
                  setType("Income");
                }}
                className="border-4 border-double border-slate-500 rounded-lg px-2 py-1 text-slate-500 font-bold active:scale-95"
              >
                SET TRANSACTION
              </button>
            </div>
          </div>
        </div>
        {/* Transactions */}
        <div className="my-1">
          {record.length !== 0 &&
            record
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
          {record.length === 0 && (
            <div className="bg-white drop-shadow-lg p-2 flex justify-center rounded-lg w-[300px] sm:w-[600px]">
              <p className="text-center text-xl sm:text-2xl text-slate-500 font-semibold">
                No Transactions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
