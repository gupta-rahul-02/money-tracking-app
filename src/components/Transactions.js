import React from 'react'
import useTransaction from '../utils/useTransaction'

const Transactions = () => {
  const{transactions} = useTransaction()
  // useEffect(() =>{
  //   getTransactions().then(setTransactions)
  // },[transactions])
  return (
    <>
    <div className="transactions">
          {transactions.length > 0 && transactions.map((transaction, i) =>(
              <div className="transaction" key={i}>
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
    </>
  )
}

export default Transactions