import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState("");
  const [transactions, setTransactions] = useState("")

  useEffect(()=>{
   getTransactions().then(setTransactions)
  },[])

  async function getTransactions (){
    const apiurl = "http://localhost:4000/api"
    const response = await fetch(apiurl+"/transactions")
    const r = await response.json()
    return r
  }

  const clearAllTransactions = async() =>{
    const apiurl = "http://localhost:4000/api"
    await fetch(apiurl+"/cleartransactions",{
      method:'PUT'
    }).then(
      response=>{
        response.json().then(json=>{
          setTransactions('')
          getTransactions().then(setTransactions)
        })
      }
    )

  }

  const addNewTransaction = async(e) =>{
    e.preventDefault();
    const apiurl = "http://localhost:4000/api"
    const price = name.split(' ')[0]
    await fetch(apiurl+"/transaction",{
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({
        price,
        name:name.substring(price.length+1),
        description,
        datetime
      }),
    }).then(response =>{
      response.json().then(json =>{
        getTransactions().then(setTransactions)
        setName('');
        setDescription('');
        setDatetime('');
      })
    })
  }

  let balance = 0;
  for(const transaction of transactions){
    balance += transaction.price
  }

  balance = balance.toFixed(2)
  const fraction = balance.split('.')[1]
  balance = balance.split('.')[0]
  return (
    <>
      <main>
        <h1>
          {balance}.<span>{fraction}</span>
        </h1>
        <form onSubmit={addNewTransaction}>
          <div className="basic">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="+200 new samsung tv"
            ></input>
            <input
              type="date"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
            ></input>
          </div>
          <div className="description">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description"
            ></input>
          </div>
          <button type="submit">Add new transaction</button>
        </form>

        <div className="transactions">
          {transactions.length > 0 && transactions.map(transaction =>(
              <div className="transaction">
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                <div className={"price "+ (transaction.price<0? 'red' : 'green')}>{transaction.price}</div>
                <div className="datetime">{transaction.datetime}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="clear-btn" onClick={()=>clearAllTransactions()}>Clear all transactions</button>
      </main>
    </>
  );
}

export default App;
