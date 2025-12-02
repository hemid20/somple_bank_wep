
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

const DATA = path.join(__dirname, "bank.txt");

function load(){
    if(!fs.existsSync(DATA)) return [];
    return fs.readFileSync(DATA,"utf8").trim().split("\n").filter(Boolean).map(l => JSON.parse(l));
}
function save(list){
    fs.writeFileSync(DATA, list.map(x=>JSON.stringify(x)).join("\n"));
}

app.post("/create",(req,res)=>{
    let {accountNumber,name,nationalID,balance,type}=req.body;
    let list = load();
    if(list.find(a=>a.accountNumber==accountNumber))
        return res.json({error:"Account already exists"});
    list.push({accountNumber,name,nationalID,balance:Number(balance),type});
    save(list);
    res.json({ok:true});
});

app.post("/login",(req,res)=>{
    let {accountNumber}=req.body;
    let list=load();
    let acc=list.find(a=>a.accountNumber==accountNumber);
    if(!acc) return res.json({error:"Account not found"});
    res.json(acc);
});

app.post("/deposit",(req,res)=>{
    let {accountNumber,amount}=req.body;
    let list=load();
    let acc=list.find(a=>a.accountNumber==accountNumber);
    if(!acc) return res.json({error:"Account not found"});
    acc.balance+=Number(amount);
    save(list);
    res.json({ok:true,balance:acc.balance});
});

app.post("/withdraw",(req,res)=>{
    let {accountNumber,amount}=req.body;
    let list=load();
    let acc=list.find(a=>a.accountNumber==accountNumber);
    if(!acc) return res.json({error:"Account not found"});
    if(acc.balance<amount) return res.json({error:"Insufficient"});
    acc.balance-=Number(amount);
    save(list);
    res.json({ok:true,balance:acc.balance});
});

app.post("/transfer",(req,res)=>{
    let {fromAcc,toAcc,amount}=req.body;
    let list=load();
    let a1=list.find(a=>a.accountNumber==fromAcc);
    let a2=list.find(a=>a.accountNumber==toAcc);
    if(!a1||!a2) return res.json({error:"Account missing"});
    if(a1.balance<amount) return res.json({error:"Insufficient"});
    a1.balance-=Number(amount);
    a2.balance+=Number(amount);
    save(list);
    res.json({ok:true});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log("Server running on", PORT));
