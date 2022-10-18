import { getProducts } from "../api";
import { parseRequestUrl } from "../utils";

const ShopScreen = {
  render: async () => {
    const { value } = parseRequestUrl();
    const products = await getProducts({ searchKeyword: value });
    return `
    <div class="container">
    <!-- HERO SECTION-->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row px-4 px-lg-5 py-lg-4 align-items-center">
          <div class="col-lg-6">
            <h1 class="h2 text-uppercase mb-0">Shop</h1>
          </div>
          <div class="col-lg-6 text-lg-end">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                <li class="breadcrumb-item"><a class="text-dark" href="index.html">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Shop</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
    <section class="py-5">
      <div class="container p-0">

      <div class="row mb-3 align-items-center">
      <form class="search-form"  id="search-form">
      <div class="col-lg-3">
      <input type="text" name="q" id="q" value="${value || ''}" class="form-control form-control-lg"  required placeholder="Enter your search"><button type="submit"><i class="fa fa-search"></i></button>
      </div>
      </form>
       </div>

        <div class="row">
          <!-- SHOP SIDEBAR-->
          <div class="col-lg-3 order-2 order-lg-1">
      
            <h5 class="text-uppercase mb-4">Categories</h5>
            <div class="py-2 px-4 bg-dark text-white mb-3"><strong class="small text-uppercase fw-bold">Fashion &amp; Acc</strong></div>
            <ul class="list-unstyled small text-muted ps-lg-4 font-weight-normal">
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=women's-shirts">Women's T-Shirts</a></li>
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=bags">Men's T-Shirts</a></li>
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=dresses">Dresses</a></li>
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=novelty-socks">Novelty socks</a></li>
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=women's-sunglasses">Women's sunglasses</a></li>
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=men's-sunglasses">Men's sunglasses</a></li>
            </ul>
            <div class="py-2 px-4 bg-light mb-3"><strong class="small text-uppercase fw-bold">Health &amp; Beauty</strong></div>
            <ul class="list-unstyled small text-muted ps-lg-4 font-weight-normal">
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=shavers">Shavers</a></li>
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=bags">bags</a></li>
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=cosmetic">Cosmetic</a></li>
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=nail-Art">Nail Art</a></li>
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=skin-Masks-&-Peels">Skin Masks &amp; Peels</a></li>
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=korean-cosmetics">Korean cosmetics</a></li>
            </ul>
            <div class="py-2 px-4 bg-light mb-3"><strong class="small text-uppercase fw-bold">Electronics</strong></div>
            <ul class="list-unstyled small text-muted ps-lg-4 font-weight-normal mb-5">
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=electronics">Electronics</a></li>
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=uSB-Flash-drives">USB Flash drives</a></li>
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=headphones">Headphones</a></li>
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=portable-speakers">Portable speakers</a></li>
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=cell-Phone-bluetooth-headsets">Cell Phone bluetooth headsets</a></li>
              <li class="mb-2"><a class="reset-anchor" href="/#/shop/?q=keyboards">Keyboards</a></li>
            </ul>
          </div>
          <!-- SHOP LISTING-->
          <div class="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
       

            <div class="row">
              <!-- PRODUCT-->


              ${products.map(
                  (product) => `
                <!-- PRODUCT-->
                <div class="col-xl-3 col-lg-4 col-sm-6">
                  <div class="product text-center">
                    <div class="position-relative mb-3">
      
                    ${product.tags === "Sale"?
                      `<div class="badge text-white bg-primary">Sale</div>`
                      : product.tags === "Sold" ?`<div class="badge text-white bg-danger">Sold</div>`
                      : product.tags === "New" ? `<div class="badge text-white bg-info">New</div>`
                      :`<div class="badge text-white bg-"></div>`}
      
                      <a class="d-block" href="/#/product/${product._id}"><img class="img-fluid w-100" src="${product.image}" alt="{Product.name}"></a>
                      <div class="product-overlay">
                        <ul class="mb-0 list-inline">
                          <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark" href="/wishlist"><i class="far fa-heart"></i></a></li>
                          <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark" href="/#/product/${product._id}">Add to cart</a></li>
                          <li class="list-inline-item me-0"><a class="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i class="fas fa-expand"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <h6> <a class="reset-anchor" href="/#/product/${product._id}">${product.name}</a></h6>
                    <p class="small text-muted">$${product.price}</p>
                  </div>
                </div>
                `,
                )
              .join('\n')}
      
              </div>
            </section>
          
              <!-- PRODUCT-->
              
            </div>
            <!-- PAGINATION-->
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center justify-content-lg-end">
                <li class="page-item mx-1"><a class="page-link" href="/#/shop" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                <li class="page-item mx-1 active"><a class="page-link" href="/#/shop">1</a></li>
                <li class="page-item mx-1"><a class="page-link" href="/#/shop">2</a></li>
                <li class="page-item mx-1"><a class="page-link" href="/#/shop">3</a></li>
                <li class="page-item ms-1"><a class="page-link" href="/#/shop" aria-label="Next"><span aria-hidden="true">»</span></a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  </div>     
  `
  },
  after_render:() =>{
    document
    .getElementById('search-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault();
      const searchKeyword = document.getElementById('q').value;
      document.location.hash = `/shop/?q=${searchKeyword}`;
    });
  }
  
}
export default ShopScreen