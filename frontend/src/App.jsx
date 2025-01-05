import React, { useState } from 'react'
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { FaDollarSign, FaCoins, FaWallet, FaRegCreditCard, FaMoneyBillWave, FaRupeeSign } from 'react-icons/fa'
import './App.css';

const App = () => {

  const [auth, setAuth] = useState(!!localStorage.getItem('token'));
  
  return (
    <div>
      <div className='animated-background'>
        <div className='icon'>
          <i><FaDollarSign /></i>
        </div>
        <div className='icon'>
          <i><FaCoins /></i>
        </div>
        <div className='icon'>
          <i><FaWallet /></i>
        </div>
        <div className='icon'>
          <i><FaRupeeSign /></i>
        </div>
        <div className='icon'>
          <i><FaRegCreditCard /></i>
        </div>
        <div className='icon'>
          <i><FaMoneyBillWave /></i>
        </div>
      </div>

        {!auth && <h2 className='main-title'>EXPENSE &nbsp;T₹ACKER</h2>}
        
        {auth ? <Dashboard setAuth={setAuth}/> : <Auth setAuth={setAuth}/>}

        <div className='bottom-credits'>
          <p className='credits'> 
            Made with <span>&#129505;</span> by <a href='https://github.com/HetMamtora'>Het Mamtora</a>
          </p>
        </div>
    </div>
  )
}

export default App