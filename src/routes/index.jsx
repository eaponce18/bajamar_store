import { createBrowserRouter } from 'react-router-dom';
import {
  HomePage,
  CategoryPage,
  ProductDetailPage,
  ShoppingCartPage,
  PaymentMethodPage,
  Login,
  AddProductsPage,
  UnauthorizedPage,
  CatalogPage
} from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/catalog',
    element: <CatalogPage />,
  },
  {
    path: '/category',
    element: <CategoryPage />,
  },
  {
    path: '/product/:id',
    element: <ProductDetailPage />,
  },
  {
    path: '/cart',
    element: <ShoppingCartPage />,
  },
  {
    path: '/payment',
    element: <PaymentMethodPage />,
  },
  {
    path: '/add-product',
    element: <AddProductsPage />,
  },
]); 