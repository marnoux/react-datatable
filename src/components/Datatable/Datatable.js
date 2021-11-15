import React, { useState } from 'react';

const Datatable = ({ data, sortData }) => {
	const [order, setOrder] = useState(true);

	let columns = data[0] && Object.keys(data[0]);

	// The formatHeading function will pretty up the header values by capitilizing every letter
	const formatHeading = (heading) => {
		let separateWord = heading.toLowerCase().split(' ');

		for (let i = 0; i < separateWord.length; i++) {
			separateWord[i] =
				separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
		}
		return separateWord.join(' ');
	};

	// User should be able to sort by start date.
	const sort = (col) => {
		// If the Start Date header is clicked, any other headers will do nothing
		if (!col.match(/start date*/)) return;

		// Here I used the ternary operator to sort
		const sortedData = order
			? // Sort ascending
			  [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1))
			: // Sort descending
			  [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));

		// Toggle the order
		setOrder(!order);

		// The sortData function will return the sorted values back to the parent component
		sortData(sortedData);
	};

	return (
		<div className='table-responsive'>
			<table className='table' id='datatable' name='datatable' role='datatable'>
				<thead className='table-dark'>
					<tr>
						{data[0] &&
							columns.map((heading) => (
								<th key={Math.random()} onClick={() => sort(heading)}>
									{formatHeading(heading)}
								</th>
							))}
					</tr>
				</thead>
				<tbody>
					{data.map((row) => (
						<tr key={Math.random()}>
							{columns.map((column) => (
								<td key={Math.random()}>
									{/* Null values (including the string "NULL") are displayed as empty cells */}
									{row[column] === 'NULL' ? '' : row[column]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Datatable;
