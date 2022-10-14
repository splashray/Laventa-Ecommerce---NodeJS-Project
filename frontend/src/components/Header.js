import { parseRequestUrl } from '../utils';
import {  clearUser, getUserInfo, } from '../localStorage';

const Header = {
  after_render:()=>{
    // document
    // .getElementById('signout-button')
    // .addEventListener("click",()=>{
    //     clearUser()
    //     document.location.hash ='/'
    // })

  },
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
            <!-- Link--><a class="nav-link active" href="/#/">Home</a>
          </li>
          <li class="nav-item">
            <!-- Link--><a class="nav-link" href="/#/shop">Shop</a>
          </li>
          ${name?`
           <li class="nav-item">
             <!-- Link--><a class="nav-link" href="/#/order-details">Orders</a>
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

          <div class="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown"><a class="dropdown-item border-0 transition-link" href="/#/account-management">Account Management</a>
          <a class="dropdown-item border-0 transition-link" href="/#/address-book">Address Book</a>
          <a class="dropdown-item border-0 transition-link" href="/#/close-account">Close Account</a> 
        </li>`
          :`<li class="nav-item"><a class="nav-link" href="/#/signin"> <i class="fas fa-user me-1 text-gray fw-normal"></i>Login</a></li>`
         }

         ${name?`
         <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="pagesDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user me-1 text-gray fw-normal"></i>Others</a>

         <div class="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown"><a class="dropdown-item border-0 transition-link" href="/#/inbox"><i class="fa-solid fa-inbox"></i>Inbox</a>
         <a class="dropdown-item border-0 transition-link" href="/#/reviews">Pending Reviews</a>
         <a class="dropdown-item border-0 transition-link" href="/#/vouchers">Vouchers</a> 
       </li>`
         :``
        }

      

      
         
        </ul>
      </div>
    </nav>
  </div>
`;
  },

};
export default Header;
