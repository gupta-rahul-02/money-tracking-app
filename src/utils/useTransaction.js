import { useState , useEffect } from "react"

const useTransaction = () =>{
    const[transactions, setTransactions] = useState('')

    useEffect(()=>{
        getTransactions().then(setTransactions)
       },[])
     
       async function getTransactions (){
         const apiurl = "http://localhost:4000/api"
         const response = await fetch(apiurl+"/transactions")
         return await response.json()
       }
    return {transactions,setTransactions, getTransactions}
}

export default useTransaction