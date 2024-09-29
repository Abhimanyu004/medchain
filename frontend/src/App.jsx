import { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './HomePage';
import DoctorDashboard from './DoctorDaashboard';
import PatientDashboard from './PatientDashboard';
import Profile from './Profile';
import { ReportProvider } from './ReportContext';

function App() {

  const [web3, setWeb3] = useState(null);

  useEffect(()=>{
    const provider = window.ethereum;
    if(provider){
      setWeb3(new Web3(provider));
      provider.request({method: 'eth_requestAccounts'})
      .then((account)=>{
        console.log(account);
      })
      .catch((error)=>{
        console.log(error)
      })
    }else{
      console.log("install metamask");
    }
  }, []);

  const [text, setText] = useState(""); 

  const handleClick = async (event) => {
    event.preventDefault(); 


    try {
      const response = await fetch('http://localhost:3000/sayHello');
      const data = await response.json();
      setText(data); 
    } catch (error) {
      setText("Error: " + error.toString());
    }
  };

  return (
    <>
      {/* <form>
        <button type='submit' onClick={handleClick}>sayHello</button>
        <h1 className='text-3xl font-bold underline'>{text}</h1> 
      </form> */}
      <ReportProvider>
      <Router>
      <div className="bg-gray-500">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  </ReportProvider>
    </>
  );
}

export default App;
