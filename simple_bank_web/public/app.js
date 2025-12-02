
let current=null;
async function post(url,data){
    let r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
    return await r.json();
}
async function createAcc(){
    let r=await post("/create",{accountNumber:c1.value,name:c2.value,nationalID:c3.value,balance:c4.value,type:c5.value});
    msg1.innerText=r.error||"Created!";
}
async function login(){
    let r=await post("/login",{accountNumber:l1.value});
    if(r.error){msg2.innerText=r.error;return;}
    current=r;
    dash.style.display="block";
    dname.innerText=r.name;
    dbal.innerText=r.balance;
}
async function deposit(){
    let r=await post("/deposit",{accountNumber:current.accountNumber,amount:amt.value});
    if(r.error){msg3.innerText=r.error;return;}
    dbal.innerText=r.balance;
}
async function withdraw(){
    let r=await post("/withdraw",{accountNumber:current.accountNumber,amount:amt.value});
    if(r.error){msg3.innerText=r.error;return;}
    dbal.innerText=r.balance;
}
async function transfer(){
    let r=await post("/transfer",{fromAcc:current.accountNumber,toAcc:tacc.value,amount:tamt.value});
    msg3.innerText=r.error||"Transferred";
}
function logout(){ current=null; dash.style.display="none"; msg2.innerText="Logged out"; }
