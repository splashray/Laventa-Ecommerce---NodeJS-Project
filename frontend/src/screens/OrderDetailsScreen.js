/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
import { getMyOrders } from "../api";

const OrderDetailsScreen ={
    after_render: () => {
    
      },
    render: async()=>{
  
       const orders = await getMyOrders()
        return `
        <div class="container">

  <section class="py-5">
  <!-- BILLING ADDRESS-->
  <h2 class="h5 text-uppercase mb-4">Orders List</h2> 
  <div class="row">
  <div class="card mb-4" id="tables">
  <div class="card-body">
  <div class="table-responsive mb-4">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ORDER ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th> 
          <th>DELIVERED</th>
          <th>ACTIONS</th> 
        </tr>
        
      </thead>
      <tbody>
      ${ 
        orders.length === 0
          ? `<tr><td colspan="8">No Order Found.</td></tr>`
          : orders
              .map(
                (order) => `
        <tr>
          <td>${order._id}</td>
          <td>${order.createdAt}</td>
          <td>$${order.totalPrice}</td>
          <td>${order.paidAt || 'No'}</td>
          <td>${order.deliveryAt || 'No'}</td>
          <td><a href="/#/order/${order._id}">Details</a> </td>
        </tr>  
          `
          )
          .join('\n')
       } 
   
      </tbody>
    </table>
    </div>
  </div>
</div>
  </div>
</section>     

<br><br><br><br><br><br><br><br><br>


  </div>




`;
    }
}

export default  OrderDetailsScreen
