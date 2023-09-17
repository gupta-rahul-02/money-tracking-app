import React from 'react'
import useTransaction from '../utils/useTransaction'


function ClearTransaction() {
    const{setTransactions,getTransactions} = useTransaction()
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
  return (
    <>
    <button className="clear-btn" onClick={()=>clearAllTransactions()}>Clear all transactions</button></>
  )
}

export default ClearTransaction