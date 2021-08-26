  
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import IncomeForm from './components/IncomeForm';
import IncomeList from './components/IncomeList';

function App() {
	const [income, setIncome] = useState([]);
	const [totalIncome, setTotalIncome] = useState(0);
	const [trackerVisible, setTrackerVisible] = useState(true)

	useEffect(() => {
		let temp = 0;
		for(let i = 0; i < income.length; i++) {
			temp += parseInt(income[i].price);
		}
		setTotalIncome(temp);
	}, [income]);
	

	return (
		<div className="App">
			<Header totalIncome={totalIncome} />
			<button className="navbar" onClick={() => setTrackerVisible(true)}>Tracker</button>
			<button className="navbar" onClick={() => setTrackerVisible(false)}>Time List</button>
			{trackerVisible ?
			(<IncomeForm income={income} setIncome={setIncome} />)
			:
			(<IncomeList income={income} setIncome={setIncome} />)
}
		</div>
	);
}

export default App;