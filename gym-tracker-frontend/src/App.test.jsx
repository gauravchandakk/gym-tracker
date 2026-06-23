import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders sidebar and dashboard heading', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByText(/Gym Tracker/i)).toBeInTheDocument();
  expect(screen.getByText(/Good Morning/i)).toBeInTheDocument();
});