const {Web3} = require('web3');
const fs = require('fs');


const web3 = new Web3('http://localhost:8545');


const abi = JSON.parse(fs.readFileSync('C:/Users/Abhi/Desktop/MedChain/artifacts/contracts/DoctorPatient.sol/DoctorPatient.json').toString()).abi;
console.log(abi);


const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contract = new web3.eth.Contract(abi, contractAddress);


async function sayHello() {
    try {
        const result = await contract.methods.sayHello().call(); 
        return result;  
    } catch (error) {
        return error.toString(); 
    }
}

async function addPatient(patient_name){
    try{
        contract.methods.addPatient(patient_name).call()
    }catch(e){
        console.log(e);
        
    }
}

module.exports = { sayHello };
