/* eslint-disable no-unused-vars */
import { getProduct } from '../api';
import {hideLoading, parseRequestUrl, showLoading } from '../utils'
import Rating from '../components/Rating';

const ProductScreen = {
  after_render: ()=>{
    const request = parseRequestUrl()
    document.getElementById("add-button").addEventListener('click',
    ()=>{
        document.location.hash = `/cart/${request.id}`
    })



},

    render: async ()=> {
    const request = parseRequestUrl();
    const product = await getProduct(request.id)
      if(product.error){
            return `
                <section class="py-5 bg-light">
                <div class="container">
                  <div class="row  gy-3">
                          <h1 style="color:red;font-size:46px;"> ${product.error}</h1> 
                          <h4 text-align="center" > We have alot for you, <br> Check out other Related Products </h4>
                  </div>
                </div>
              </section>

                    <!-- RELATED PRODUCTS-->
            
            <h2  class="h5 text-uppercase mb-4 text-center" >Related products</h2>
            <div class="row">
                <!-- PRODUCT-->
                <div class="col-lg-3 col-sm-6">
                <div class="product text-center skel-loader">
                    <div class="d-block mb-3 position-relative"><a class="d-block" href="detail.html"><img class="img-fluid w-100" src="img/product-1.jpg" alt="..."></a>
                    <div class="product-overlay">
                        <ul class="mb-0 list-inline">
                        <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark" href="#!"><i class="far fa-heart"></i></a></li>
                        <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark" href="#!">Add to cart</a></li>
                        <li class="list-inline-item mr-0"><a class="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i class="fas fa-expand"></i></a></li>
                        </ul>
                    </div>
                    </div>
                    <h6> <a class="reset-anchor" href="detail.html">Kui Ye Chen’s AirPods</a></h6>
                    <p class="small text-muted">$250</p>
                </div>
                </div>
            
            </div>
            </div>
        </section>
    `
  }
        return `
    <section class="py-5">
    <div class="container">
      <div class="row mb-5">
        <div class="col-lg-6">
          <!-- PRODUCT SLIDER-->
          <div class="row m-sm-0">
            <div class="col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0 px-xl-2">
              <div class="swiper product-slider-thumbs">
                
              </div>
            </div>
            <div class="col-sm-10 order-1 order-sm-2">
              <div class="swiper product-slider">
                <div class="swiper-wrapper">
                  <div class="swiper-slide h-auto"><img class="img-fluid" src="${product.image}" alt="${product.name}"></div>
               
                </div>
              </div>
            </div>
          </div>
        </div>


        
        <!-- PRODUCT DETAILS-->
        <div class="col-lg-6">

        <!--  Reviews  -->
          <ul class="list-inline mb-2 text-sm">
           
            ${Rating.render({
              value: product.rating,
              text: `${product.numReviews} - Reviews by Verified Customers`
            })} 
          </ul> 

          <h1>${product.name} </h1>
          <p class="text-muted lead">$ ${product.price}</p>
          <p class="text-sm mb-4">${product.desc}</p>
          <div class="row align-items-stretch mb-4">
           
            <div class="col-sm-3 pl-sm-0">
            ${
              product.countInStock > 0 
              ? ` <button id="add-button" class="btn btn-dark btn-lg btn-block h-100  d-flex align-items-center justify-content-center px-20" > Add to cart </button> `
              : `
              <button  class="btn btn-disabled btn-dark btn-lg btn-block h-100  d-flex align-items-center justify-content-center px-20" > Unavailable </button> `
              }

                  
            </div>
          </div><a class="text-dark p-0 mb-4 d-inline-block" href="#!"><i class="far fa-heart me-2"></i>Add to wish list</a><br>
          <ul class="list-unstyled small d-inline-block">
          <li class="px-3 py-2 mb-1 bg-white" style="color:red">14 hrs Remaining for promo to end</li>
            <li class="px-3 py-2 mb-1 bg-white"><strong class="text-uppercase">In Stock:</strong><span class="ms-2 text-muted">
            ${
              product.countInStock > 0 
              ? `<span class="successstn">${product.countInStock} in Stock </span>`
              : `<span class="errorstn">Unavailable </span>`
              }
            </span></li>
            <li class="px-3 py-2 mb-1 bg-white"><strong class="text-uppercase">Brand:</strong><span class="ms-2 text-muted">${product.brand}</span></li>
            <li class="px-3 py-2 mb-1 bg-white text-muted"><strong class="text-uppercase text-dark">Category:</strong><a class="reset-anchor ms-2" href="#!">${product.category}</a></li>
            <li class="px-3 py-2 mb-1 bg-white text-muted"><strong class="text-uppercase text-dark">Tags:</strong><a class="reset-anchor ms-2" href="#!">${product.tags}</a></li>
          </ul>
        </div>
      </div>
      <!-- DETAILS TABS-->
      <ul class="nav nav-tabs border-0" id="myTab" role="tablist">
        <li class="nav-item"><a class="nav-link text-uppercase active" id="description-tab" data-bs-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a></li>
        <li class="nav-item"><a class="nav-link text-uppercase" id="reviews-tab" data-bs-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews</a></li>
      </ul>
      <div class="tab-content mb-5" id="myTabContent">
        <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
          <div class="p-4 p-lg-5 bg-white">
            <h6 class="text-uppercase">Product description </h6>
            <p class="text-muted text-sm mb-0">${product.desc}</p>
          </div>
        </div>
        <div class="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
          <div class="p-4 p-lg-5 bg-white">
            <div class="row">
              <!-- Reviews -->
              <div class="col-lg-8">
                <div class="d-flex mb-3">
                  <div class="flex-shrink-0"><img class="rounded-circle" src="img/customer-1.png" alt="" width="50"/></div>
                  <div class="ms-3 flex-shrink-1">
                    <h6 class="mb-0 text-uppercase">Jason Doe</h6>
                    <p class="small text-muted mb-0 text-uppercase">20 May 2020</p>
                    <ul class="list-inline mb-1 text-xs">
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star-half-alt text-warning"></i></li>
                    </ul>
                    <p class="text-sm mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>
                <div class="d-flex">
                  <div class="flex-shrink-0"><img class="rounded-circle" src="img/customer-2.png" alt="" width="50"/></div>
                  <div class="ms-3 flex-shrink-1">
                    <h6 class="mb-0 text-uppercase">Jane Doe</h6>
                    <p class="small text-muted mb-0 text-uppercase">20 May 2020</p>
                    <ul class="list-inline mb-1 text-xs">
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star-half-alt text-warning"></i></li>
                    </ul>
                    <p class="text-sm mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- RELATED PRODUCTS-->
      <h2 class="h5 text-uppercase mb-4">Related products</h2>
      <div class="row">
        <!-- PRODUCT-->
        <div class="col-lg-3 col-sm-6">
          <div class="product text-center skel-loader">
            <div class="d-block mb-3 position-relative"><a class="d-block" href="detail.html"><img class="img-fluid w-100" src="img/product-1.jpg" alt="..."></a>
              <div class="product-overlay">
                <ul class="mb-0 list-inline">
                  <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark" href="#!"><i class="far fa-heart"></i></a></li>
                  <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark" href="#!">Add to cart</a></li>
                  <li class="list-inline-item mr-0"><a class="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i class="fas fa-expand"></i></a></li>
                </ul>
              </div>
            </div>
            <h6> <a class="reset-anchor" href="detail.html">Kui Ye Chen’s AirPods</a></h6>
            <p class="small text-muted">$250</p>
          </div>
        </div>
       
      </div>
    </div>
  </section>
      `
      
    },
    
}

export default ProductScreen