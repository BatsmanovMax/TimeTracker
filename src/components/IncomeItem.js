import React from 'react';

function IncomeItem({income, index, removeUser, markFaw}) {

  const removeHandle = i => {
    removeUser(i);
  }

  const markFawHandle = (i, state) => {
    markFaw(i, state)
  }

  return (
    <div className="income-item">
      <button className="remove-item" onClick={() => removeHandle(index)}>x</button>
      {!income.isFaw ? 
      <button className="remove-item" onClick={() => markFawHandle(index, true)}>Faw</button>
      :
      <button className="remove-item" onClick={() => markFawHandle(index, false)}>Remove Faw</button>
      }
      <div className="desc">Name: {income.choosedUser}</div>
      <div className="project">Project: {income.project}</div>
      <div className="desc">Description of task: {income.desc}</div>
      <div className="date">Working time: {((income.spentTime / 1000) / 60).toFixed(2)}min</div>
    </div>
  )
}

export default IncomeItem;