import React, { useState, useEffect } from 'react';

import Datatable from './components/Datatable/Datatable';
import MainHeader from './components/UI/MainHeader/MainHeader';

const App = () => {
	const [data, setData] = useState([]);
	const [sortedData, setSortedData] = useState([]);
	const [query, setQuery] = useState('');

	// User should be able to search by description. E.g. if "Kryptonite" is written to search box, only rows
	const search = (rows) => {
		const searchColumn = ['description'];

		return rows.filter((row) =>
			searchColumn.some(
				(column) =>
					row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
			)
		);
	};

	useEffect(() => {
		setData(sortedData);
	}, [sortedData]);

	useEffect(() => {
		fetch('https://sievo-react-assignment.azurewebsites.net/api/data')
			.then((response) => response.json())
			.then((json) => setData(json));
	}, []);

	return (
		<div className='container-fluid'>
			<MainHeader />
			<div className='col-4 mb-4'>
				<input
					className='form-control input-sm'
					placeholder='search'
					type='text'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>
			<div className='col'>
				<Datatable
					data={search(data)}
					sortData={(sortedData) => setSortedData(sortedData)}
				/>
			</div>
		</div>
	);
};

export default App;
