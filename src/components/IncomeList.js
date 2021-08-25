import React, { useState } from 'react';
import IncomeItem from './IncomeItem';

function IncomeList({ income, setIncome }) {
  
  const sortByDate = (a, b) => {
    return a.date - b.date;
  }

  const fawFilter = (state) => {
    return income.filter((item, index) => {
      item.id = index
      return item.isFaw === state }).sort(sortByDate)
  }

  const [listItems, setListItems] = useState(fawFilter(false))

  const removeUser = i => {
    let temp = income.filter((v, index) => index !== i);
    setIncome(temp);
  }

  const markFaw = (i, state) => {
    income[i].isFaw = state
    setListItems(fawFilter(!state))
  }
  
  return (
  <>
  {/* {listItems.length > 0 ? */}
    <div className="income-list">
      <button onClick={() => setListItems(() => fawFilter(true))}>favourite posts</button>
      <button onClick={() => setListItems(() => fawFilter(false))}>normal posts</button>
      {
        listItems.map((value, index) => (
          <IncomeItem
            key={index} 
            income={value} 
            index={value.id} 
            removeUser={removeUser}
            markFaw={markFaw}
          />
        ))
      }
    </div>
    {/* : <h2>No tracked time</h2> */}
{/* } */}
  </>
  )
}

export default IncomeList;