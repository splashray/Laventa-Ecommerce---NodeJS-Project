/* eslint-disable no-unused-vars */
import { createReview, getProduct, getProductHome } from '../api';
import {hideLoading, parseRequestUrl, rerender, showErrMessage, showGoodMessage, showLoading } from '../utils'
import Rating from '../components/Rating';
import { getUserInfo } from '../localStorage';

const ProductScreen = {
  after_render: ()=>{
    const request = parseRequestUrl()
    document.getElementById("add-button").addEventListener('click',
    ()=>{
        document.location.hash = `/cart/${request.id}`
    })


    if (document.getElementById('review-form')) {
      document
        .getElementById('review-form')
        .addEventListener('submit', async (e) => {
          e.preventDefault();
          showLoading();
          const data = await createReview(request.id, {
            comment: document.getElementById('comment').value,
            rating: document.getElementById('rating').value,
          });
          hideLoading();
          if (data.error) {
            showErrMessage(data.error);
          } else {
            showGoodMessage('Review Added Successfully', () => {
              rerender(ProductScreen);
            });
          }
        });
    }

},

    render: async ()=> {
    const products = await getProductHome();
    const request = parseRequestUrl();
    const product = await getProduct(request.id)
    const userInfo = getUserInfo()
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
              ${product.reviews.length === 0 ? `<div>There is no review.</div>` : ''}  
              ${product.reviews
                .map(
                  (review) =>
                    `
                <div class="d-flex mb-3">
                  <div class="flex-shrink-0"><img class="rounded-circle" src="img/avatar.png" alt="" width="50"/></div>
                  <div class="ms-3 flex-shrink-1">
                    <h6 class="mb-0 text-uppercase">${review.name}</h6>
                    <p class="small text-muted mb-0 text-uppercase"> ${review.createdAt.substring(0, 10)}</p>
                    <ul class="list-inline mb-1 text-xs">
                    ${Rating.render({
                      value: review.rating,
                    })}
                    </ul>
                    <p class="text-sm mb-0 text-muted"> ${review.comment}.</p>
                  </div>
                </div>`
                )
                .join('\n')}


            <!-- review details--> <br> <br> <br>
            ${
              userInfo.name
                ? `
            <div class="row">
              <div class="col-lg-8">
                <form id="review-form">
                  <div class="row gy-3">
                    <div class="col-lg-12">
                    <label class="form-label text-sm text-uppercase" for="rating">Choose Rating</label>
                      <select  class="form-control form-control-lg" required name="rating" id="rating">
                          <option value="">Select</option>
                          <option value="1">1 = Poor</option>
                          <option value="2">2 = Fair</option>
                          <option value="3">3 = Good</option>
                          <option value="4">4 = Very Good</option>
                          <option value="5">5 = Excellent</option>
                      </select>
                      </div>
                    <div class="col-lg-12">
                        <label class="form-label text-sm text-uppercase" for="comment">Write Review</label>
                        <textarea class="form-control form-control-lg" type="text" id="comment" required></textarea>
                    </div>
                    <div class="col-lg-12 form-group">
                      <button class="btn btn-dark" type="submit"> Save Review</button>
                    </div>
                  </div>
                </form>
             ` : ` <div> Please <a href="/#/signin">Signin</a> to write a review.</div>`
              }

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
        ${products.map(
          (productr) => `
        <!-- PRODUCT-->
        <div class="col-xl-3 col-lg-4 col-sm-6">
          <div class="product text-center">
            <div class="position-relative mb-3">

            ${productr.tags === "Sale"?
              `<div class="badge text-white bg-primary">Sale</div>`
              : productr.tags === "Sold" ?`<div class="badge text-white bg-danger">Sold</div>`
              : productr.tags === "New" ? `<div class="badge text-white bg-info">New</div>`
              :`<div class="badge text-white bg-"></div>`}

              <a class="d-block" href="/#/product/${productr._id}"><img class="img-fluid w-100" src="${productr.image}" alt="{productr.name}"></a>
              <div class="product-overlay">
                <ul class="mb-0 list-inline">
                  <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark" href="/wishlist"><i class="far fa-heart"></i></a></li>
                  <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark" href="/#/product/${productr._id}">Add to cart</a></li>
                  <li class="list-inline-item me-0"><a class="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i class="fas fa-expand"></i></a></li>
                </ul>
              </div>
            </div>
            <h6> <a class="reset-anchor" href="/#/product/${productr._id}">${productr.name}</a></h6>
            <p class="small text-muted">$${productr.price}</p>
          </div>
        </div>
        `,
        )
      .join('\n')}


    </div>
  </section>
      `
      
    },
    
}

export default ProductScreen