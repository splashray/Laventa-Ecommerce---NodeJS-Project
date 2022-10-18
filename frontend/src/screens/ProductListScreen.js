import { createProduct, deleteProduct, getAdminProducts,  } from "../api";
import { getUserInfo } from "../localStorage";
import { hideLoading, rerender, showErrMessage, showLoading, showMessage } from "../utils";

const ProductListScreen ={
  after_render: () => {
    document
    .getElementById('create-product-button')
    .addEventListener('click', async () => {
      const data = await createProduct();
      document.location.hash = `/product/${data.product._id}/edit`;
    });

    const editButtons = document.getElementsByClassName('edit-button');
    Array.from(editButtons).forEach((editButton) => {
      editButton.addEventListener('click', () => {
        document.location.hash = `/product/${editButton.id}/edit`;
      });
    });
    
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', async () => {
        if (confirm('Are you sure to delete this product?')) {
          showLoading();
          const data = await deleteProduct(deleteButton.id);
          if (data.error) {
            showMessage(data.error);
          } else {
            rerender(ProductListScreen);
          }
          hideLoading();
        }
      });
    });

},
render: async()=>{

  const products = await getAdminProducts();
  return `
  <div class="container">

<section class="py-5">
<!-- BILLING ADDRESS-->
<h2 class="h5 text-uppercase mb-4">Products List</h2> 
<div class="col-lg-12 form-group align-items-left">
<button id="create-product-button" class="btn btn-lg btn-dark">Create Product</button> 
</div><br>

<div class="row">
<div class="card mb-4" id="tables">
<div class="card-body">
<div class="table-responsive mb-4">
<table class="table table-bordered">
<thead>
  <tr>
    <th>PRODUCT ID</th>
    <th>NAME</th>
    <th>PRICE</th>
    <th>CATEGORY</th>
    <th>BRAND</th> 
    <th>IN STOCK</th>
    <th>ACTIONS</th> 
  </tr>
  
</thead>
<tbody>
${ 
  products.length === 0
    ? `<tr><td colspan="8">No Product Found.</td></tr>`
    : products
        .map(
          (product) => `
  <tr>
    <td>${product._id}</td>
    <td>${product.name}</td>
    <td>$${product.price}</td>
    <td>${product.category}</td>
    <td>${product.brand}</td>
    <td>${product.countInStock}</td>
    <td>
    <button id="${product._id}" class="btn btn-lg btn-dark edit-button">Edit</button> <br> <br>
    <button id="${product._id}" class="delete-button btn btn-danger"> Delete</button>
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

export default  ProductListScreen
