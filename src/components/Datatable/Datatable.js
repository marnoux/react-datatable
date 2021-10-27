import React from 'react';

const Datatable = ({ data }) => {
	const columns = data[0] && Object.keys(data[0]);

	// This function will format headings by capitalizing each word
	const formatHeading = (heading) => {
		let separateWord = heading.toLowerCase().split(' ');

		for (let i = 0; i < separateWord.length; i++) {
			separateWord[i] =
				separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
		}
		return separateWord.join(' ');
	};

	return (
		<div className='table-responsive-sm'>
			<table className='table'>
				<thead className='table-dark'>
					<tr key={data.key}>
						{data[0] &&
							columns.map((heading) => <th>{formatHeading(heading)}</th>)}
					</tr>
				</thead>
				<tbody>
					{data.map((row) => (
						<tr key={row.key}>
							{columns.map((column) => (
								<td>{row[column]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Datatable;
