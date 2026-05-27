import { render, screen } from '@testing-library/react';
import App from './App';

test('renders GymTracker branding', () => {
  render(<App />);
  expect(screen.getByText(/GymTracker/i)).toBeInTheDocument();
});