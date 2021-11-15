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

		formatDate(data);

		return rows.filter((row) =>
			searchColumn.some(
				(column) =>
					// Search text should be case insensitive
					row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
			)
		);
	};

	// Display dates in format dd.mm.yyyy
	const formatDate = (rows) => {
		const dateColumn = ['start date'];

		return rows.filter((row) =>
			dateColumn.some(
				(column) =>
					(row[column] = new Date(row[column])
						.toLocaleDateString('da-DK', {
							day: 'numeric',
							year: 'numeric',
							month: 'numeric',
						})
						.toString())
			)
		);
	};

	useEffect(() => {
		setData(sortedData);
	}, [sortedData]);

	useEffect(() => {
		// Fetch dataset from API on load
		fetch('https://sievo-react-assignment.azurewebsites.net/api/data')
			.then((response) => response.json())
			.then((json) => setData(json));
	}, []);

	return (
		<div className='container-fluid'>
			<MainHeader />
			<div className='col-4 mb-4'>
				<input
					className='form-control'
					placeholder='search'
					name='searchInput'
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
