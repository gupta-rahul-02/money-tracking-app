import { useEffect } from "react";
import "./App.css";
import ClearTransaction from "./components/ClearTransaction";
import TransactionForm from "./components/TransactionForm";
import Transactions from "./components/Transactions";
import useTransaction from "./utils/useTransaction";
//import { useState } from "react";

function App() {
  const { transactions,getTransactions } = useTransaction();
  useEffect(()=>{
    getTransactions()
  })

  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];
  return (
    <>
      <main>
        <h1>
          {balance}.<span>{fraction}</span>
        </h1>
        <TransactionForm />

        <Transactions />
        <ClearTransaction />
      </main>
    </>
  );
}

export default App;
