import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store/index.js';
import App from './App';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const linkElement = screen.getByText(/pokemon/i);
  const linkElement2 = screen.getByText(/2021 Pablo Chaves/i);
 expect(linkElement).toBeInTheDocument();
 expect(linkElement2).toBeInTheDocument();
});
