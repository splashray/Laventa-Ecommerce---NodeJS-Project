import { getProduct } from "../api";
import { getcartItems, setCartItems } from "../localStorage";
import { parseRequestUrl, rerender } from "../utils";

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getcartItems();
    const existItem = cartItems.find((x) => x.product === item.product);
    if (existItem) {
      if (forceUpdate) {
        cartItems = cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      }
    } else {
      cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if (forceUpdate) {
      rerender(WishListScreen);
    }
};

const removeFromCart = (id) => {
  setCartItems(getcartItems().filter((x) => x.product !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = '/cart';
  } else {
    rerender(WishListScreen);
  }
};

const WishListScreen = {
    
    after_render:()=>{
      const qtySelects = document.getElementsByClassName('qty-select');
      Array.from(qtySelects).forEach((qtySelect) => {
        qtySelect.addEventListener('change', (e) => {
          const item = getcartItems().find((x) => x.product === qtySelect.id);
          addToCart({ ...item, qty: Number(e.target.value) }, true);
        });
      });

      const deleteButtons = document.getElementsByClassName('delete-button');
      Array.from(deleteButtons).forEach((deleteButton) => {
        deleteButton.addEventListener('click', () => {
          removeFromCart(deleteButton.id);
        });
      });

      document.getElementById('checkout-button').addEventListener('click', () => {
        document.location.hash = '/signin';
      });

    },
    render: async()=>{
        const request = parseRequestUrl();
        if (request.id) {
          const product = await getProduct(request.id);
          addToCart({
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty: 1,
          });
        }
         const cartItems = getcartItems()
        return `

        <div class="container">
        <!-- HERO SECTION-->
        <section class="py-5 bg-light">
          <div class="container">
            <div class="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div class="col-lg-6">
                <h1 class="h2 text-uppercase mb-0">WishList</h1>
              </div>
              <div class="col-lg-6 text-lg-end">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                    <li class="breadcrumb-item"><a class="text-dark" href="/#/">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">WishList</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section class="py-5">
          <h2 class="h5 text-uppercase mb-4">Wishlist Items</h2>
          <div class="row">
            <div class="col-lg-8 mb-4 mb-lg-0">
              <!-- CART TABLE-->
              <div class="table-responsive mb-4">
                <table class="table text-nowrap">
                  <thead class="bg-light">
                    <tr>
                      <th class="border-0 p-3" scope="col"> <strong class="text-sm text-uppercase">Product</strong></th>
                      <th class="border-0 p-3" scope="col"> <strong class="text-sm text-uppercase">Price</strong></th>
                      <th class="border-0 p-3" scope="col"> <strong class="text-sm text-uppercase">Total</strong></th>
                      <th class="border-0 p-3" scope="col"> <strong class="text-sm text-uppercase"></strong></th>
                    </tr>
                  </thead>
                  <tbody class="border-0">
                  ${
                    cartItems.length === 0
                      ? `   `
                      : cartItems
                          .map(
                            (item) => `
                            <tr>
                            <th class="ps-0 py-3 border-light" scope="row">
                              <div class="d-flex align-items-center"><a class="reset-anchor d-block animsition-link" href="/#/product/${item.product}"><img src="${item.image}" alt="${item.name}" width="70"/></a>
                                <div class="ms-3"><strong class="h6"><a class="reset-anchor animsition-link" href="/#/product/${item.product}">${item.name}</a></strong></div>
                              </div>
                            </th>
                            <td class="p-3 align-middle border-light">
                              <p class="mb-0 small">$${item.price}</p>
                            </td>
                       
                            <td id="${item.product}" class="delete-button p-3 align-middle border-light"><i class="fas fa-trash-alt small text-muted"></i></td>
                          </tr>
                    `
                    )
                    .join('\n')
              }
                  </tbody>
                </table>
              </div>
              ${
                cartItems.length === 0
                  ? `
                  <h3> No item in wish-list</h3> 

                  <div class="bg-light px-4 py-3">
                  <div class="row align-items-center text-center">
                    <div class="col-md-6 mb-3 mb-md-0 text-md-start"><a class="btn btn-link p-0 text-dark btn-sm" href="/#/shop"><i class="fas fa-long-arrow-alt-left me-2"> </i>Continue shopping</a></div>

                    <div class="col-md-6 text-md-end"><a id="checkout-button" class="btn btn-outline-dark btn-sm" href="/#/signin">Procceed to Login<i class="fas fa-long-arrow-alt-right ms-2"></i></a></div>
                    </div>
                    
                </div> `
                  : `
              <!-- CART NAV-->
              <div class="bg-light px-4 py-3">
                <div class="row align-items-center text-center">
                  <div class="col-md-6 mb-3 mb-md-0 text-md-start"><a class="btn btn-link p-0 text-dark btn-sm" href="/#/shop"><i class="fas fa-long-arrow-alt-left me-2"> </i>Continue shopping</a></div>
                  <div class="col-md-6 text-md-end"><a id="checkout-button" class="btn btn-outline-dark btn-sm" href="/#/signin">Procceed to Checkout<i class="fas fa-long-arrow-alt-right ms-2"></i></a></div>
                </div>
              </div>
            </div>
            `
            
        }
            </div>
          </div>
        </section>
      </div>
    

        `
        

    },
}

export default WishListScreen