import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('test datatable', () => {
	render(<App />);

	// find an element with a role of button and test of 'Change to blue'
	const datatable = screen.getByRole('table', { name: 'datatable' });
	const searchInput = screen.getByRole('input', { name: 'searchInput' });

	// expect input to be form-control
	expect(searchInput).toHaveClass('form-control');

	// focus on input
	userEvent.click(searchInput, {});

	// type into input
	userEvent.type('Decrease ');

	// expect the background color to be blue
	expect(datatable).toHaveValue('Harmonize');
});
