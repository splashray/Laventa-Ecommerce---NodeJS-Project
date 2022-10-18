
import { deleteOrder, getOrders } from "../api";
import { getUserInfo } from "../localStorage";
import { hideLoading, rerender, showErrMessage, showLoading } from "../utils";

const OrderListScreen ={
    after_render: () => {
          const deleteButtons = document.getElementsByClassName('delete-button');
          Array.from(deleteButtons).forEach((deleteButton) => {
              deleteButton.addEventListener('click', async () => {
                  if(confirm('Are you sure want to delete this order?')){
                  showLoading();
                  const data = await deleteOrder(deleteButton.id);
                  if (data.error) {
                    showErrMessage(data.error);
                  } else {
                    rerender(OrderListScreen);
                  }
                  hideLoading();
                }

              });
              
          });
          const editButtons = document.getElementsByClassName('edit-button');
          Array.from(editButtons).forEach((editButton) => {
            editButton.addEventListener('click', async () => {
              document.location.hash = `/order/${editButton.id}`;
            });
          });

      },
    render: async()=>{
      // const {admin} = await getUserInfo()
      // if (!admin) {
      //   document.location.hash ='/'
      //  }
       const orders = await getOrders()
       
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
          <th>USER</th>
          <th>PAID AT</th> 
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
          <td>${order.createdAt.substring(0, 10)}</td>
          <td>$${order.totalPrice}</td>
          <td>${order.userInfo.email}</td>
          <td>${order.paidAt || 'No'}</td>
          <td>${order.deliveredAt || 'No'}</td>
          <td>
          <button id="${order._id}" class="btn btn-lg btn-dark edit-button">Edit</button> <br> <br>
          <button id="${order._id}" class="delete-button btn btn-danger"> Delete</button>
          </td>
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

export default  OrderListScreen
