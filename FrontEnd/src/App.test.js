import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import CustomerHome from './components/customerHome';
import CustomerSignUp from './components/Signup/customerSignUp.js';

it('renders without crashing', () => {
  render(<App />);
});

it('renders login form', () => {
  render(<App />);
  const linkElement = screen.getByText('Login');
  const emailAddressElement = screen.getByText('Email address *');
  const passwordElement = screen.getByText('Password *');
  const checkboxElement = screen.getByText('Check the box if you are a Restaurant');
  expect(linkElement).toBeInTheDocument();
  expect(emailAddressElement).toBeInTheDocument();
  expect(passwordElement).toBeInTheDocument();
  expect(checkboxElement).toBeInTheDocument();
})

it('renders customer signup page', () => {
  render(
          <BrowserRouter> 
              <CustomerSignUp /> 
          </BrowserRouter>
  );
  const emailAddressElement = screen.getByText('Email address *');
  expect(emailAddressElement).toBeInTheDocument();

  const customerSignupElement = screen.getByText('Customer Sign Up');
  expect(customerSignupElement).toBeInTheDocument();

  const submitButtonElement = screen.getByText('Submit');
  expect(submitButtonElement).toBeInTheDocument();
})

it('renders filter component with working buttons', () => {
  render(
          <BrowserRouter> 
              <CustomerHome /> 
          </BrowserRouter>
  );
  const filterElement = screen.getByText('Filters');
  expect(filterElement).toBeInTheDocument();

  const locationFilterElement = screen.getByText('By Nearest Location');
  userEvent.click(locationFilterElement);

  const vegFilterElement = screen.getByText('Veg');
  userEvent.click(vegFilterElement);

  const nonvegFilterElement = screen.getByText('Non-Veg');
  userEvent.click(nonvegFilterElement);

  const veganFilterElement = screen.getByText('Vegan');
  userEvent.click(veganFilterElement);

  const pickupFilterElement = screen.getByText('Pickup');
  userEvent.click(pickupFilterElement);

  const deliveryFilterElement = screen.getByText('Delivery');
  userEvent.click(deliveryFilterElement);

  const clearFilterButtonElement = screen.getByText('Clear All Filters')
  userEvent.click(clearFilterButtonElement);
})
