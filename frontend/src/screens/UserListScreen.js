
import {  getAllUser } from "../api";
import { hideLoading, rerender, showErrMessage, showLoading } from "../utils";

const UserListScreen ={
    after_render: () => {
        //   const deleteButtons = document.getElementsByClassName('delete-button');
        //   Array.from(deleteButtons).forEach((deleteButton) => {
        //       deleteButton.addEventListener('click', async () => {
        //           if(confirm('Are you sure want to delete this order?')){
        //           showLoading();
        //           const data = await deleteOrder(deleteButton.id);
        //           if (data.error) {
        //             showErrMessage(data.error);
        //           } else {
        //             rerender(UserListScreen);
        //           }
        //           hideLoading();
        //         }

        //       });
              
        //   });
        //   const editButtons = document.getElementsByClassName('edit-button');
        //   Array.from(editButtons).forEach((editButton) => {
        //     editButton.addEventListener('click', async () => {
        //       document.location.hash = `/order/${editButton.id}`;
        //     });
        //   });

      },
    render: async()=>{
       const users = await getAllUser()
        return `
        <div class="container">

  <section class="py-5">
  <!-- BILLING ADDRESS-->
  <h2 class="h5 text-uppercase mb-4">Users List</h2> 
  <div class="row">
  <div class="card mb-4" id="tables">
  <div class="card-body">
  <div class="table-responsive mb-4">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>USER ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>TYPE</th>
          <th>ACCESS</th> 
        </tr>
        
      </thead>
      <tbody>
      ${ 
        users.length === 0
          ? `<tr><td colspan="8">No User is  Found.</td></tr>`
          : users
              .map(
                (user) =>
       `
       <tr>
          <td>${user._id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.isAdmin}</td>
          <td>
          <button id="${user._id}" class="delete-button btn btn-danger"> Access</button>
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

export default  UserListScreen
