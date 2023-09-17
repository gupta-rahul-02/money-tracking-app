const express = require('express')
const cors = require('cors')
const app = express()

const Transaction = require('./models/transaction')
const { default: mongoose } = require('mongoose')

app.use(cors())
app.use(express.json())

app.get('/api/test', (req,res) =>{
    res.json('test ok')
})

app.post('/api/transaction',async(req,res)=>{
    await mongoose.connect('mongodb+srv://rahulguptaslg20:India11@cluster0.nivdtho.mongodb.net/?retryWrites=true&w=majority')
    const {price,name,description,datetime} = req.body
    const transaction =  await Transaction.create({price,name,description,datetime})
    res.json(transaction)
})

app.get('/api/transactions',async (req,res) =>{
    await mongoose.connect('mongodb+srv://rahulguptaslg20:India11@cluster0.nivdtho.mongodb.net/?retryWrites=true&w=majority')
    const transactions = await Transaction.find();
    res.json(transactions)
})

app.listen(4000,()=>{
    console.log("connected to 4000")
})