import React, { useState, useEffect } from 'react';

import MainHeader from './components/UI/MainHeader/MainHeader';
import Datatable from './components/Datatable/Datatable';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const App = () => {
	const [data, setData] = useState([]);
	const [q, setQ] = useState('');
	const [searchColumns, setSearchColumns] = useState(['description']);

	const search = (rows) => {
		return rows.filter((row) =>
			searchColumns.some(
				(column) =>
					row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
			)
		);
	};

	useEffect(() => {
		fetch('https://sievo-react-assignment.azurewebsites.net/api/data')
			.then((response) => response.json())
			.then((json) => setData(json));
	}, []);

	return (
		<div className='container-fluid'>
			<MainHeader />
			<div className='col'>
				<input
					className='form-control'
					type='text'
					value={q}
					onChange={(e) => setQ(e.target.value)}
				/>
			</div>
			<div className='col'>
				<Datatable data={search(data)} />
			</div>
		</div>
	);
};

export default App;
