import { parseRequestUrl } from '../utils';
import {  clearUser, getUserInfo, } from '../localStorage';

const Header = {
  render: () => {
    const { name, isAdmin } = getUserInfo();
    const { value } = parseRequestUrl();
    return ` 
    <div class="container px-lg-3">
    <nav class="navbar navbar-expand-lg navbar-light py-3 px-lg-0"><a class="navbar-brand" href="/#/"><span class="fw-bold text-uppercase text-dark">Laventa | Boutique</span></a>
      <button class="navbar-toggler navbar-toggler-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <!-- Link--><a class="nav-link active" href="/#/"><i class="fa fa-home" aria-hidden="true"></i>
 Home</a>
          </li>
          <li class="nav-item">
            <!-- Link--><a class="nav-link" href="/#/shop"><i class="fa fa-shopping-basket" aria-hidden="true"></i> Shop</a>
          </li>
          ${name?`
           <li class="nav-item">
             <!-- Link--><a class="nav-link" href="/#/order-details"><i class="fa fa-cart-arrow-down" aria-hidden="true"></i> Orders</a>
            </li>
           `:``}
            <li class="nav-item">
                <a class="nav-link" href="/#/cart"> <i class="fas fa-dolly-flatbed me-1 text-gray"></i>Cart<small class="text-gray fw-normal">(
                  )</small></a>
            </li>    

        </ul>
        <ul class="navbar-nav ms-auto">               
          <li class="nav-item"><a class="nav-link" href="/#/wishlist"> <i class="far fa-heart me-1"></i>WishList<small class="text-gray fw-normal"> (0)</small></a></li>
          ${name?`
          <li class="nav-item dropdown"><a style="text-transform:capitalize;" class="nav-link dropdown-toggle" id="pagesDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user me-1 text-gray fw-normal"></i>${name}</a>

          <div class="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown">
          ${isAdmin?`
          <a class="dropdown-item border-0 transition-link" href="/#/dashboard"><i class="fa fa-houzz" aria-hidden="true"></i> Business Overview</a>
          <a class="dropdown-item border-0 transition-link" href="/#/orders-lists"><i class="fa fa-houzz" aria-hidden="true"></i> Orders Overview</a>
          <a class="dropdown-item border-0 transition-link" href="/#/products-lists"><i class="fa fa-houzz" aria-hidden="true"></i> Products Overview</a>
         `
          :``
          }
          <a class="dropdown-item border-0 transition-link" href="/#/account-management"><i class="fa fa-server" aria-hidden="true"></i> Account Management</a>
          <a class="dropdown-item border-0 transition-link" href="/#/address-book"><i class="fa fa-address-book" aria-hidden="true"></i> Address Book</a>
          <a class="dropdown-item border-0 transition-link" href="/#/close-account"><i class="fa fa-user-secret" aria-hidden="true"></i> Close Account</a> 
        </li>`
          :`<li class="nav-item"><a class="nav-link" href="/#/signin"> <i class="fa fa-sign-in" aria-hidden="true"></i> Login</a></li>`
         }

      

         ${name?`
         <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="pagesDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-bars"></i> Others</a>

         <div class="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown"><a class="dropdown-item border-0 transition-link" href="/#/inbox"><i class="fa fa-inbox" aria-hidden="true"></i>  Inbox</a>
         <a class="dropdown-item border-0 transition-link" href="/#/reviews"><i class="fa fa-commenting-o" aria-hidden="true"></i>  Pending Reviews</a>
         <a class="dropdown-item border-0 transition-link" href="/#/vouchers"><i class="fa fa-hourglass-end" aria-hidden="true"></i>  Vouchers</a> 
       </li>`
         :``
        }

        
         
        </ul>
      </div>
    </nav>
  </div>
`;
  },
  after_render:()=>{

  },

};
export default Header;
