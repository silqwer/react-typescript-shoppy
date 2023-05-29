import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AllProducts from '../pages/AllProducts';
import Home from '../pages/Home';
import MyCart from '../pages/MyCart';
import NewProduct from '../pages/NewProduct';
import NotFound from '../pages/NotFound';
import ProductDetail from '../pages/ProductDetail';
import ProtectedRoute from '../pages/ProtectedRoute';
const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/products', element: <AllProducts /> },
      {
        path: '/products/new',
        element: (
          <ProtectedRoute requireAdmin>
            <NewProduct />
          </ProtectedRoute>
        )
      },
      { path: '/products/:id', element: <ProductDetail /> },
      {
        path: '/cart',
        element: (
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

export default routes;
