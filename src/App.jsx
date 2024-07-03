import "./App.css";
import { BrowserRouter as Router, Route, Routes, json } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Settings from "./components/Settings";
import Categories from "./components/Categories";
import CategoryPopUp from "./components/CategoryPopUp";
import Filter from "./components/Filter";
import EditCategory from "./components/EditCategory";
// income categories
import awards from "./assets/awards.png";
import coupon from "./assets/coupon.png";
import grants from "./assets/grants.png";
import lottery from "./assets/lottery.png";
import refund from "./assets/refund.jpg";
import rent from "./assets/rent.jpg";
import salary from "./assets/salary.png";
import sale from "./assets/sale.jpg";
// expense categories
import Baby from "./assets/baby.webp";
import Beauty from "./assets/beauty.jpg";
import Bill from "./assets/bills.jpg";
import Car from "./assets/car.jpg";
import Clothing from "./assets/clothing.jpg";
import Education from "./assets/education.jpg";
import Electronics from "./assets/electronics.jpg";
import Entertainment from "./assets/entertainment.jpg";
import Food from "./assets/food.jpg";
import Health from "./assets/health.jpg";
import Home from "./assets/home.jpg";
import Insurance from "./assets/insurance.jpg";
import Shopping from "./assets/shopping.jpg";
import Social from "./assets/social.jpg";
import Sports from "./assets/sports.jpg";
import Tax from "./assets/tax.jpg";
import Telephone from "./assets/telephone.jpg";
import Transportation from "./assets/transportation.jpg";
import Unknown from "./assets/unknown.jpg";
import ResetPopUp from "./components/ResetPopUp";

function App() {
  const savedDataString = localStorage.getItem("appData");
  const savedData = savedDataString ? JSON.parse(savedDataString) : null;

  const [side, setSide] = useState(false);
  const [reset, setReset] = useState(false);
  const [income, setIncome] = useState(savedData?.income || 0);
  const [currency, setCurrency] = useState(savedData?.currency || "INR");
  const [expense, setExpense] = useState(savedData?.expense || 0);
  const [balance, setBalance] = useState(savedData?.balance || 0);
  const [settings, setSettings] = useState(false);
  const [categoryPopUp, setCategoryPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  

  const [record, setRecord] = useState(savedData?.record || []);
  const [dummy, setDummy] = useState(savedData?.record || []);

  const resetData = () => {
    setIncome(0);
    setExpense(0);
    setBalance(0);
    setCurrency("INR");
    setRecord([]);
    setIncomeCategories([
      { id: 1, img: awards, label: "Awards", value: 0 },
      { id: 2, img: coupon, label: "Coupon", value: 0 },
      { id: 3, img: grants, label: "Grants", value: 0 },
      { id: 4, img: lottery, label: "Lottery", value: 0 },
      { id: 5, img: refund, label: "Refund", value: 0 },
      { id: 6, img: rent, label: "Rent", value: 0 },
      { id: 7, img: salary, label: "Salary", value: 0 },
      { id: 8, img: sale, label: "Sale", value: 0 },
    ]);
    setExpenseCategories([
      { id: 1, img: Baby, label: "Baby", value: 0 },
      { id: 2, img: Beauty, label: "Beauty", value: 0 },
      { id: 3, img: Bill, label: "Bill", value: 0 },
      { id: 4, img: Car, label: "Car", value: 0 },
      { id: 5, img: Clothing, label: "Clothing", value: 0 },
      { id: 6, img: Education, label: "Education", value: 0 },
      { id: 7, img: Electronics, label: "Electronics", value: 0 },
      { id: 8, img: Entertainment, label: "Entertainment", value: 0 },
      { id: 9, img: Food, label: "Food", value: 0 },
      { id: 10, img: Health, label: "Health", value: 0 },
      { id: 11, img: Home, label: "Home", value: 0 },
      { id: 12, img: Insurance, label: "Insurance", value: 0 },
      { id: 13, img: Shopping, label: "Shopping", value: 0 },
      { id: 14, img: Social, label: "Social", value: 0 },
      { id: 15, img: Sports, label: "Sports", value: 0 },
      { id: 16, img: Tax, label: "Tax", value: 0 },
      { id: 17, img: Telephone, label: "Telephone", value: 0 },
      { id: 18, img: Transportation, label: "Transportation", value: 0 },
    ]);
  };

  useEffect(()=>{
    const sortedRecord = [...dummy].sort((a, b) => {
      const dateA = [a.time.year, a.time.month, a.time.date];
      const dateB = [b.time.year, b.time.month, b.time.date];
      if(parseInt(dateA[0]) !== parseInt(dateB[0])){
        return parseInt(dateA[0]) - parseInt(dateB[0]);
      } else if(parseInt(dateA[1]) !== parseInt(dateB[1])){
        return parseInt(dateA[1]) - parseInt(dateB[1]);
      } else if(parseInt(dateA[2]) !== parseInt(dateB[2])){
        return parseInt(dateA[2]) - parseInt(dateB[2]);
      } else {
        return 0;
      }
    });
    setRecord(sortedRecord);
  }, [dummy])

  const newTransaction = (title, amount, category, note, type, date) => {
    if (parseFloat(amount) >= 0 &&
      (type === "Income" ||
      (type === "Expense" && parseFloat(balance) - parseFloat(amount) >= 0))
    ) {
      const Amount = parseFloat(amount);
      const Balance = parseFloat(balance);
      if (type === "Income") {
        const Income = parseFloat(income);
        setIncome(Income + Amount);
        setBalance(balance + Amount);
        let updatedCategories = incomeCategories.map((data) =>
          data.id === category.id
            ? { ...data, value: parseFloat(data.value) + Amount }
            : data
        );
        setIncomeCategories(updatedCategories);
      } else {
        const Expense = parseFloat(expense);
        setExpense(expense + Amount);
        setBalance(balance - Amount);
        let updatedCategories = expenseCategories.map((data) =>
          data.id === category.id
            ? { ...data, value: parseFloat(data.value) + Amount }
            : data
        );
        setExpenseCategories(updatedCategories);
      }
      if (amount !== null && amount > 0) {
        const t = new Date();
        const newTrans = {
          id: record.length + 1,
          title: title,
          amount: amount,
          cat: category,
          type: type,
          note: note,
          time: {       
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            day: date.getDay(),
          },
        };
        setDummy([...record, newTrans]);
        
      }
    } else {
      alert("Expense is exceeding balance or your amount is invalid!");
    }
  };

  const deleteTransaction = (trans) => {
    if (trans.type === "Income") {
      setIncome(parseFloat(income) - parseFloat(trans.amount));
      setBalance(parseFloat(balance) - parseFloat(trans.amount));
      let updatedCategories = incomeCategories.map((data) =>
        data.id === trans.cat.id
          ? {
              ...data,
              value: parseFloat(data.value) - parseFloat(trans.amount),
            }
          : data
      );

      setIncomeCategories(updatedCategories);
    } else {
      setExpense(parseFloat(expense) - parseFloat(trans.amount));
      setBalance(parseFloat(balance) + parseFloat(trans.amount));
      let updatedCategories = expenseCategories.map((data) =>
        data.id === trans.cat.id
          ? {
              ...data,
              value: parseFloat(data.value) - parseFloat(trans.amount),
            }
          : data
      );

      setExpenseCategories(updatedCategories);
    }

    let updatedRecord = record.filter((data) => data.id !== trans.id);
    updatedRecord = updatedRecord.map((data, index) => ({
      ...data,
      id: index + 1,
    }));
    setRecord(updatedRecord);
  };

  const [incomeCategories, setIncomeCategories] = useState(
    savedData?.incomeCategories || [
      { id: 1, img: awards, label: "Awards", value: 0 },
      { id: 2, img: coupon, label: "Coupon", value: 0 },
      { id: 3, img: grants, label: "Grants", value: 0 },
      { id: 4, img: lottery, label: "Lottery", value: 0 },
      { id: 5, img: refund, label: "Refund", value: 0 },
      { id: 6, img: rent, label: "Rent", value: 0 },
      { id: 7, img: salary, label: "Salary", value: 0 },
      { id: 8, img: sale, label: "Sale", value: 0 },
    ]
  );

  const [expenseCategories, setExpenseCategories] = useState(
    savedData?.expenseCategories || [
      { id: 1, img: Baby, label: "Baby", value: 0 },
      { id: 2, img: Beauty, label: "Beauty", value: 0 },
      { id: 3, img: Bill, label: "Bill", value: 0 },
      { id: 4, img: Car, label: "Car", value: 0 },
      { id: 5, img: Clothing, label: "Clothing", value: 0 },
      { id: 6, img: Education, label: "Education", value: 0 },
      { id: 7, img: Electronics, label: "Electronics", value: 0 },
      { id: 8, img: Entertainment, label: "Entertainment", value: 0 },
      { id: 9, img: Food, label: "Food", value: 0 },
      { id: 10, img: Health, label: "Health", value: 0 },
      { id: 11, img: Home, label: "Home", value: 0 },
      { id: 12, img: Insurance, label: "Insurance", value: 0 },
      { id: 13, img: Shopping, label: "Shopping", value: 0 },
      { id: 14, img: Social, label: "Social", value: 0 },
      { id: 15, img: Sports, label: "Sports", value: 0 },
      { id: 16, img: Tax, label: "Tax", value: 0 },
      { id: 17, img: Telephone, label: "Telephone", value: 0 },
      { id: 18, img: Transportation, label: "Transportation", value: 0 },
    ]
  );

  const [cat, setCat] = useState(incomeCategories[0]);
  const [catType, setCatType] = useState("Income");

  const newCategoryInsert = (icon, name, type) => {
    if (name) {
      if (type === "Income") {
        const newIncomeCategory = {
          id: incomeCategories.length + 1,
          img: icon,
          label: name,
          value: 0,
        };
        setIncomeCategories([...incomeCategories, newIncomeCategory]);
      } else {
        const newExpenseCategory = {
          id: expenseCategories.length + 1,
          img: icon,
          label: name,
          value: 0,
        };
        setExpenseCategories([...expenseCategories, newExpenseCategory]);
      }
    }
  };

  const deleteCategory = (key, type) => {
    if (type === "Income") {
      let updatedCategories = incomeCategories.filter(
        (data) => data.id !== key
      );
      updatedCategories = updatedCategories.map((data, index) => ({
        ...data,
        id: index + 1,
      }));
      setIncomeCategories(updatedCategories);
    } else {
      let updatedCategories = expenseCategories.filter(
        (data) => data.id !== key
      );
      updatedCategories = updatedCategories.map((data, index) => ({
        ...data,
        id: index + 1,
      }));
      setExpenseCategories(updatedCategories);
    }
  };

  let Icon = [
    { id: 1, img: awards },
    { id: 2, img: coupon },
    { id: 3, img: grants },
    { id: 4, img: lottery },
    { id: 5, img: refund },
    { id: 6, img: rent },
    { id: 7, img: salary },
    { id: 8, img: sale },
    { id: 9, img: Baby },
    { id: 10, img: Beauty },
    { id: 11, img: Bill },
    { id: 12, img: Car },
    { id: 13, img: Clothing },
    { id: 14, img: Education },
    { id: 15, img: Electronics },
    { id: 16, img: Entertainment },
    { id: 17, img: Food },
    { id: 18, img: Health },
    { id: 19, img: Home },
    { id: 20, img: Insurance },
    { id: 21, img: Shopping },
    { id: 22, img: Social },
    { id: 23, img: Sports },
    { id: 24, img: Tax },
    { id: 25, img: Telephone },
    { id: 26, img: Transportation },
    { id: 27, img: Unknown },
  ];

  useEffect(() => {
    if (savedData) {
      setIncome(savedData.income);
      setExpense(savedData.expense);
      setBalance(savedData.balance);
      setCurrency(savedData.currency);
      setIncomeCategories(savedData.incomeCategories);
      setExpenseCategories(savedData.expenseCategories);
      setRecord(savedData.record);
    }
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        const dataToSave = {
          income,
          expense,
          balance,
          currency,
          incomeCategories,
          expenseCategories,
          record,
        };

        localStorage.setItem("appData", JSON.stringify(dataToSave));
      } catch (error) {
        console.error("Error saving data to localStorage:", error);
      }
    };

    saveData();
  }, [
    income,
    expense,
    balance,
    currency,
    incomeCategories,
    expenseCategories,
    record,
  ]);

  const editCategoryPopUp = (category, type) => {
    setCat(category);
    setCatType(type);   
    setEditPopUp(true);
  }

  const editCategory = (id, icon, name, type) => {
    if(type === "Income"){
      let updated = incomeCategories.map((data)=>(id===data.id?{...data, img: icon, label: name} : data));
      setIncomeCategories(updated);
    } else {
      let updated = expenseCategories.map((data)=>(id===data.id?{...data, img: icon, label: name} : data));
      setExpenseCategories(updated);
    }
  }

  return (
    <Router>
      <Navbar setSide={setSide} side={side} />
      <SideBar side={side} setSettings={setSettings} setSide={setSide} />
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              income={income}
              expense={expense}
              balance={balance}
              currency={currency}
              expenseCategories={expenseCategories}
              incomeCategories={incomeCategories}
            />
          }
        />
        <Route
          path="/transaction"
          element={
            <Transactions
              currency={currency}
              income={incomeCategories}
              expense={expenseCategories}
              newTransaction={newTransaction}
              record={record}
              deleteTransaction={deleteTransaction}
            />
          }
        />
        <Route
          path="/searchtransaction"
          element={
            <Filter
              currency={currency}
              income={incomeCategories}
              expense={expenseCategories}
              newTransaction={newTransaction}
              record={record}
              deleteTransaction={deleteTransaction}
            />
          }
        />
        <Route
          path="/categories"
          element={
            <Categories
              income={incomeCategories}
              expense={expenseCategories}
              setPopUp={setCategoryPopUp}
              editCategoryPopUp={editCategoryPopUp}
              deleteCategory={deleteCategory}
            />
          }
        />
      </Routes>
      <Settings
        setReset={setReset}
        currency={currency}
        setCurrency={setCurrency}
        settings={settings}
        setSettings={setSettings}
      />
      <CategoryPopUp
        popUp={categoryPopUp}
        setPopUp={setCategoryPopUp}
        newCategoryInsert={newCategoryInsert}
        Icon={Icon}
      />
      <ResetPopUp reset={reset} setReset={setReset} resetData={resetData} />
      <EditCategory
        editPopUp={editPopUp}
        setEditPopUp={setEditPopUp}
        newCategoryInsert={newCategoryInsert}
        Icon={Icon}
        cat={cat}
        catType={catType}
        editCategory={editCategory}
      />
    </Router>
  );
}

export default App;
