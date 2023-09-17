import React, { useEffect } from 'react'
import { useState } from 'react';
import useTransaction from '../utils/useTransaction';
const TransactionForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [datetime, setDatetime] = useState("");
    const{setTransactions,getTransactions} = useTransaction()
    
    useEffect(() =>{
      getTransactions()
    })

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
  return (
    <>
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
    </>
  )
}

export default TransactionForm