import { createOrder } from "../api";
import { cleanCart, getcartItems, getPayment, getUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";


const convertCartToOrder = () => {
  const orderItems = getcartItems();
  if (orderItems.length === 0) {
    document.location.hash = '/order-details';
  }
  const userInfo = getUserInfo ()
    if((!userInfo.name) && (!userInfo.deliveryAddress)){
      document.location.hash = '/';
    }
  
  const payment = getPayment();
  if (!payment.paymentMethod) {
    document.location.hash = '/payment';
  }
  const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice < 50 ? 0 : 10;
  const taxPrice = Math.round(0.15 * itemsPrice * 100) / 500;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  return {
    orderItems,
    userInfo,
    payment,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};



const PlaceOrderScreen ={
      after_render: async () => {
        document
          .getElementById('placeorder-button')
          .addEventListener('click', async () => {
            const order = convertCartToOrder();
            showLoading();
            const data = await createOrder(order);
            hideLoading();
            if (data.error) {
              showMessage(data.error);
            } else {
              cleanCart();
              document.location.hash = `/order/${data.order._id}`;
            }
          });

      },
    render: ()=>{
      const {
        orderItems,
        userInfo,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      } = convertCartToOrder();

        return `
        <div class="container">
    <!-- HERO SECTION-->
    <section class="py-5 bg-light">
    <div class="container">
      <div class="row px-4 px-lg-5 py-lg-4 align-items-center">
        <div class="col-lg-6">
          <h1 class="h2 text-uppercase mb-0">Place Order</h1>
        </div>
        <div class="col-lg-6 text-lg-end">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
              <li class="breadcrumb-item"><a class="text-dark" href="/#/">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Place Order</li>
            </ol>
          </nav>

        </div>
      </div>
    </div>
  </section>   
  <section class="py-5">
  <!-- BILLING ADDRESS-->
  <h2 class="h5 text-uppercase mb-4">Order Summary</h2> 
  <div class="row">
  

 <!-- shipping SUMMARY-->
        <div class="col-lg-8">
         <div class="card border-0 rounded-0 p-lg-4 bg-light">
           <div class="card-body">
             <h5 class="text-uppercase mb-4">Shipping</h5>
             <ul class="list-unstyled mb-0">
             <li class="d-flex align-items-center justify-content-between"><strong class="small fw-bold">Name</strong><span class="text-muted small" style="text-transform:capitalize;">${userInfo.firstName}  ${userInfo.lastName}</span></li>
             <li class="border-bottom my-2"></li>
             <li class="d-flex align-items-center justify-content-between"><strong class="small fw-bold">Email</strong><span class="text-muted small" >${userInfo.email}</span></li>
             <li class="border-bottom my-2"></li>
             <li class="d-flex align-items-center justify-content-between"><strong class="small fw-bold">Contact Number</strong><span class="text-muted small" style="text-transform:capitalize;">${userInfo.phone}</span></li>
             <li class="border-bottom my-2"></li>
               <li class="d-flex align-items-center justify-content-between"><strong class="small fw-bold">Delivery Address</strong><span class="text-muted small" style="text-transform:capitalize;">${userInfo.deliveryAddress}</span></li>
               <li class="border-bottom my-2"></li>
               <li class="d-flex align-items-center justify-content-between"><strong class="small fw-bold">Additional Info</strong><span class="text-muted small" style="text-transform:capitalize;">${userInfo.additional?`${userInfo.additional}`:"None"}</span></li>
               <li class="border-bottom my-2"></li>
               <li class="d-flex align-items-center justify-content-between"><strong class="small fw-bold">Town/State</strong><span class="text-muted small" style="text-transform:capitalize;">${userInfo.town}/${userInfo.state}</span></li>
               <li class="border-bottom my-2"></li>
               <li class="d-flex align-items-center justify-content-between"><strong class="small fw-bold">Country</strong><span class="text-muted small">${userInfo.country}</span></li>
               <li class="border-bottom my-2"></li>
             </ul> <br>

             <h5 class="text-uppercase mb-4">Payment </h5>
             <ul class="list-unstyled mb-0">
             <li class="d-flex align-items-center justify-content-between"><strong class="small fw-bold">Payment Method</strong><span class="text-muted small"> ${payment.paymentMethod}</span></li>
             <li class="border-bottom my-2"></li>
             </ul> <br>

             <h5 class="text-uppercase mb-4">Shopping Cart </h5>
             <ul class="list-unstyled mb-0">
             ${orderItems
              .map(
                (item) => `
             <li class="d-flex align-items-center justify-content-between"> <a href="/#/product/${item.product}"><strong class="small fw-bold">${item.name}    -(${item.qty})</strong></a><span class="text-muted small">$${item.price} <strong class="small fw-bold">--($${item.price*item.qty})</strong></span></li>
             <li class="border-bottom my-2"></li>
             `
             )
             .join('\n')}

             </ul>
           </div>
         </div>
       </div>


   
         <!-- ORDER SUMMARY-->
         <div class="col-lg-4">
         <div class="card border-0 rounded-0 p-lg-4 bg-light">
           <div class="card-body">
             <h5 class="text-uppercase mb-4">Your order</h5>
             <ul class="list-unstyled mb-0">
               <li class="d-flex align-items-center justify-content-between"><strong class="small fw-bold">Total Items</strong><span class="text-muted small">$${itemsPrice}</span></li>
               <li class="border-bottom my-2"></li>
               <li class="d-flex align-items-center justify-content-between"><strong class="small fw-bold">Shipping Fee</strong><span class="text-muted small">$${shippingPrice}</span></li>
               <li class="border-bottom my-2"></li>
               <li class="d-flex align-items-center justify-content-between"><strong class="small fw-bold">Tax</strong><span class="text-muted small">$${taxPrice}</span></li>
               <li class="border-bottom my-2"></li>

               <li class="d-flex align-items-center justify-content-between"><strong class="text-uppercase small fw-bold">Total</strong><span>$${totalPrice}</span></li>
             </ul>
             
             <br>
                <div class="col-lg-12 form-group align-items-center">
                <button  id="placeorder-button" class="btn btn-lg btn-dark" type="submit">Place order</button>
                </div>
        
           </div>
         </div>
       </div><small style="color:red;"> Click place order to continue to payment </small>
  </div>
</section>     




  </div>




`;
    }
}

export default  PlaceOrderScreen
