import React from 'react';
import './App.css';
import Transaction from './Components/Transaction';
import FormComponent from "./Components/formComponent";
import { useState,useEffect,useReducer } from 'react'
import DataContext from './data/DataContext';
import ReportComponent from './Components/ReportComponent';
// import { BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";

// import { element } from 'prop-types';


// const Title = ()=> <h1>โปรแกรมบัญชีรายรับ - รายจ่าย</h1>
// const Description = ()=> <p>บันทึกข้อมูลบัญชีในแต่ละวัน</p>

// const Items = ()=> <li>ค่าเดินทาง <span>-200</span></li>
// const Transaction = ()=> {
//   return (
//     <ul>
//       <Items />
//     </ul>
//   );
// }

function App() {
  const design = {color:'red',textAlign:'center'}
  // const initState = [
  //   {id:1,title:"ค่าเช่าบ้าน",amount:-2000},
  //   {id:2,title:"เงินเดือน",amount:12000},
  //   {id:3,title:"ค่าเดินทาง",amount:-500},
  //   {id:4,title:"ขายของ",amount:2000}
  // ]
  const [items,setItems] = useState([])
  const [reportIncome,setReportIncome] = useState(0)
  const [reportExpense,setReportExpense] = useState(0)
  
  const onAddNewItem = (newItem)=>{
    setItems((prevItem)=>{
      return [newItem,...prevItem]
    })
  }

  useEffect(()=>{
    const amounts = items.map(items=>items.amount)
    const income = amounts.filter(element=>element>0).reduce((total,element)=>total+=element,0)
    const expense = (amounts.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1
    setReportIncome(income)
    setReportExpense(expense)
  },[items,reportIncome,reportExpense])

  const [showReport,setShowReport]=useState()
  const reducer = (state,action)=>{
        switch(action.type){
          case "SHOW":
            return setShowReport(true)
          case "HIDE":
            return setShowReport(false)
        }
  }

  const [result,dispatch] = useReducer(reducer,showReport)

  return (
    <DataContext.Provider value={{income : reportIncome,expense : reportExpense}}>
      <div className='contrainer'>
      <div className='Box'>
          <h1 style={design}>บัญชีรายรับ - รายจ่าย : สุทธิดา</h1>
          {showReport && <ReportComponent/>}
          {/* <ReportComponent/> */}
          <FormComponent onAddItem={onAddNewItem}/>
          <Transaction items = {items} />
            <h1>{result}</h1>
            <button onClick={()=>dispatch({type:"SHOW"})}>แสดง</button>
            <button onClick={()=>dispatch({type:"HIDE"})}>ซ่อน</button>
            {/* <Router>
            <div>
              <ul className='horizontal-menu'>
                <li>
                  <Link to="/">ข้อมูลบัญชี</Link>
                </li>
                <li>
                  <Link to="/Insert">บันทึกข้อมูล</Link>
                </li>
              </ul>
              <Routes>
                <Route path='/' element={<ReportComponent/>} /> 
                <Route path='/Insert' element={<FormComponent onAddItem={onAddNewItem}/>}/>
              </Routes>
            </div>
            </Router> */}
        </div>
      </div>
    </DataContext.Provider>
  );
}

export default App;
