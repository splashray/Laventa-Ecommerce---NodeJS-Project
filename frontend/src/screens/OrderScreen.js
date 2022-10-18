import { canPay, deliverOrder, getOrder, getPaypalClientId, getPaystackClientId, payOrder } from '../api';
import { getUserInfo } from '../localStorage';
import {parseRequestUrl,showLoading, hideLoading,showMessage,rerender,showGoodMessage,} from '../utils';

// paypal add payment button
const addPaypalSdk = async (totalPrice) => {
  const clientId = await getPaypalClientId();
  showLoading();
  if (!window.paypal) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.paypalobjects.com/api/checkout.js';
    script.async = true;
    script.onload = () => handlePayment(clientId, totalPrice);
    document.body.appendChild(script);
  } else {
    handlePayment(clientId, totalPrice);
  }
};

// paypal handle payment function
const handlePayment = (clientId, totalPrice) => {
  window.paypal.Button.render(
    {
      env: 'sandbox',
      client: {
        sandbox: clientId,
        production: '',
      },
      locale: 'en_US',
      style: {
        size: 'responsive',
        color: 'gold',
        shape: 'pill',
      },

      commit: true,
      payment(data, actions) {
        return actions.payment.create({
          transactions: [
            {
              amount: {
                total: totalPrice,
                currency: 'USD',
              },
            },
          ],
        });
      },
      onAuthorize(data, actions) {
        return actions.payment.execute().then(async () => {
          showLoading();
          
          await payOrder(parseRequestUrl().id, {
            orderID: data.orderID,
            payerID: data.payerID,
            paymentID: data.paymentID,
          });

          hideLoading();
          showGoodMessage('Payment was successful.', () => {
            rerender(OrderScreen);
          });
        });
      },
    },
    '#paypal-button'
  ).then(() => {
    hideLoading();
  });
};


const OrderScreen ={
    
    render: async()=>{
      const { isAdmin } = getUserInfo();
      const request = parseRequestUrl();
      const {
        _id,
        userInfo,
        payment,
        orderItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        isDelivered,
        deliveredAt,
        isPaid,
        paidAt,
      } = await getOrder(request.id);
      if(!orderItems){
        document.location.hash ='/order-details'
      }
      if(!isPaid){
        if(payment.paymentMethod === 'Paypal'){ addPaypalSdk(totalPrice);}
      
      }
        return `
        <div class="container">

  <section class="py-5">
  <!-- BILLING ADDRESS-->
  <h2 class="h5 text-uppercase mb-4">Order-ID: ${request.id}</h2> 
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

              ${
                isDelivered
                ?`<li class="successed d-flex align-items-center justify-content-between"><strong class="small fw-bold">Delivery Status</strong>
                <span class="text-muted small"><p class="successed">Delivered at ${deliveredAt} </p
                ></span>
                </li>`
                :`<li class="d-flex align-items-center justify-content-between"><strong class="small fw-bold">Delivery Status</strong> 
                <span class="text-muted small" > <p class="errored"> Not Delivered </p> </span> 
                </li>`
                }

               <li class="border-bottom my-2"></li>
             </ul> <br>

             <h5 class="text-uppercase mb-4">Payment </h5>
             <ul class="list-unstyled mb-0">
             <li class="d-flex align-items-center justify-content-between"><strong class="small fw-bold">Payment Method</strong><span class="text-muted small">${payment.paymentMethod}</span></li>
            <li class="border-bottom my-2"></li>

            ${
              isPaid
              ?`<li class="successed d-flex align-items-center justify-content-between"><strong class="small fw-bold">Payment Status</strong>
              <span class="text-muted small"><p class="successed">Paid at ${paidAt} </p
              ></span>
              </li>`
              :`<li class="d-flex align-items-center justify-content-between"><strong class="small fw-bold">Payment Status</strong> 
              <span class="text-muted small" > <p class="errored"> Not Paid </p> </span> 
              </li>`
              }


             <li class="border-bottom my-2"></li>
             </ul> <br>

             <h5 class="text-uppercase mb-4">Shopping Cart </h5>
             <ul class="list-unstyled mb-0">
             ${orderItems
              .map(
                (item) => `
             <li class="d-flex align-items-center justify-content-between"><strong class="small fw-bold">${item.name}    -(${item.qty})</strong><span class="text-muted small">$${item.price} <strong class="small fw-bold">--($${item.price*item.qty})</strong></span></li>
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
              
                ${payment.paymentMethod === "Paypal"?
                  `<div class="fw" id="paypal-button"></div>`
                  : payment.paymentMethod === "Card Payment"? 
                  `<button id="card" class="btn btn-lg btn-dark" type="submit" onClick="alert('Available soon!  Use other payment option')">Pay Now</button>`
                  :`<button id="pay" class="btn btn-lg btn-dark" type="submit">Pay</button>` 
                  }
                  
               

                  ${
                    isPaid && !isDelivered && isAdmin
                      ? `<button id="deliver-order-button" class="btn btn-lg btn-dark fw">Deliver Order</button>`
                      : ''
                  }

                </div>
        
           </div>
         </div>
       </div><small style="color:red;"> Don't reload the payment page to avoid multiple deductions! </small>
  </div>
</section>     




  </div>




`;
    },
    after_render: async () => {
      const request = parseRequestUrl();
      if (document.getElementById('deliver-order-button')) {
        document.addEventListener('click', async () => {
          showLoading();
          await deliverOrder(request.id);
          hideLoading();
          showGoodMessage('Order Delivered')
          // rerender(OrderScreen);
          document.location.hash='/orders-lists'
        });
      }

  
      },
}

export default  OrderScreen
