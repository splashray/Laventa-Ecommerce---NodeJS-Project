import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { hideLoading, parseRequestUrl, showLoading } from './utils';
import Error404Screen from './screens/Error404Screen';
import ShopScreen from './screens/ShopScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import Header from './components/Header';
import RegisterScreen from './screens/RegisterScreen';
import Footer from './components/footer';
import AccountManage from './screens/AccountManage';
import AddressBook from './screens/AddressBook';
import CloseAccount from './screens/CloseAccount';
import WishListScreen from './screens/WishList';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import DashboardScreen from './screens/DashboardScreen';
import OrderListScreen from './screens/OrderListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import UserListScreen from './screens/UserListScreen';

const routes = {
  '/': HomeScreen,
  '/shop': ShopScreen, 
  '/wishlist': WishListScreen,
  '/cart': CartScreen,
  '/product/:id/edit': ProductEditScreen,
  '/product/:id': ProductScreen,
  '/cart/:id': CartScreen,
  '/shipping': ShippingScreen,
  '/order/:id': OrderScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/account-management': AccountManage,
  '/address-book': AddressBook,
  '/close-account': CloseAccount,
  '/order-details': OrderDetailsScreen,
  '/payment': PaymentScreen,
  '/placeorder': PlaceOrderScreen,
  '/dashboard': DashboardScreen,
  '/orders-lists': OrderListScreen,
  '/products-lists': ProductListScreen,
  '/users-lists': UserListScreen,




};

const router = async () => {
  showLoading()
  const request = parseRequestUrl();

  const parseUrl = (request.resource ? `/${request.resource}` : '/')
    + (request.id ? '/:id' : '')
    + (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  if (Header.after_render) await Header.after_render();

  const footer = document.getElementById('footer-container');
  footer.innerHTML = await Footer.render();
  if (Footer.after_render) await Footer.after_render();

  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
  hideLoading()
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
