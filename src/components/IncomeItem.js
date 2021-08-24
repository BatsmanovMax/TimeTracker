import React from 'react';

function IncomeItem({income, index, removeUser}) {
  let date = new Date(income.date);

  const removeHandle = i => {
    removeUser(i);
  }

  return (
    <div className="income-item">
      <button className="remove-item" onClick={() => removeHandle(index)}>x</button>
      <div className="desc">Name: {income.choosedUser}</div>
      <div className="project">Project: {income.project}</div>
      <div className="desc">Description of task: {income.desc}</div>
      <div className="date">Working time: {((income.spentTime / 1000) / 60).toFixed(2)}min</div>
    </div>
  )
}

export default IncomeItem;