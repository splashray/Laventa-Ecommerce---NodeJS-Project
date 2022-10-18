import { getProduct, updateProduct, uploadProductImage } from "../api"
import { getUserInfo } from "../localStorage";
import { hideLoading, parseRequestUrl, showErrMessage, showGoodMessage, showLoading } from "../utils"

const ProductEditScreen = {
    after_render:() =>{
        const request = parseRequestUrl();
        document
          .getElementById('edit-product-form')
          .addEventListener('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await updateProduct({
              _id: request.id,
              name: document.getElementById('name').value,
              price: document.getElementById('price').value,
              image: document.getElementById('image').value,
              brand: document.getElementById('brand').value,
              category: document.getElementById('category').value,
              countInStock: document.getElementById('countInStock').value,
              desc: document.getElementById('desc').value,
              tags: document.getElementById('tags').value,

            });
            hideLoading();
            if (data.error) {
              showErrMessage(data.error);
            } else {
              document.location.hash = '/products-lists';
            }
          });

          document
          .getElementById('image-file')
          .addEventListener('change', async (e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image', file);
            showLoading();
            const data = await uploadProductImage(formData);
            hideLoading();
            if (data.error) {
              showErrMessage(data.error);
            } else {
              showGoodMessage('Image uploaded successfully.');
              document.getElementById('image').value = data.image;
            }
          });
        },

    render: async() =>{
       
        const request = parseRequestUrl()
        const product = await getProduct(request.id)
        return `
        <div class="container">
        <!-- HERO SECTION-->
        <section class="py-5 bg-light">
        <div class="container">
          <div class="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div class="col-lg-6">
              <h1 class="h2 text-uppercase mb-0">Admin Product</h1>
            </div>
            <div class="col-lg-6 text-lg-end">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                  <li class="breadcrumb-item"><a class="text-dark" href="/#/">Home</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Edit Product</li>
                </ol>
              </nav>
    
             
    
    
            </div>
          </div>
        </div>
      </section>   
      <section class="py-5">
      <!-- BILLING ADDRESS-->
      <h1 class="h2 text-uppercase mb-0">Product-Id -  ${product._id.substring(0, 8)}</h1>
      <div class="row">
        <div class="col-lg-8">
          <form  id="edit-product-form">
            <div class="row gy-3">
             
            <div class="col-lg-6">
            <label class="form-label text-sm text-uppercase" for="name">Name </label>
            <input  class="form-control form-control-lg" type="text" id="name" placeholder="Enter your product name" required value="${product.name}">
            </div>
            <div class="col-lg-6 form-group">
            <label class="form-label text-sm text-uppercase" for="category">Category</label>
            <select  class="form-control form-control-lg rounded-0" id="category" value="${product.category}" required>
              <option value="">Choose your category</option>
                  <option value="women's-T-Shirts">Women's T-Shirts</option>
                  <option value="men's-T-Shirts">Men's T-Shirts</option>
                  <option value="dresses">Dresses</option>
                  <option value="novelty-socks">Novelty socks</option>
                  <option value="women's-sunglasses">Women's sunglasses</option>
                  <option value="men's-sunglasses">Men's sunglasses</option>
                  <option value="shavers">Shavers</option>
                  <option value="bags">bags</option>
                  <option value="cosmetic">Cosmetic</option>
                  <option value="nail-Art">Nail Art</option>
                  <option value="skin-Masks-&-Peels">Skin Masks & Peels</option>
                  <option value="korean-cosmetics">Korean cosmetics</option>
                  <option value="electronics">Electronics</option>
                  <option value="uSB-Flash-drives">USB Flash drives</option>
                  <option value="headphones">Headphones</option>
                  <option value="portable-speakers">Portable speakers</option>
                  <option value="cell-Phone-bluetooth-headsets">Cell Phone bluetooth headsets</option>
                  <option value="keyboards">Keyboards</option>
            </select>
          </div>
            <div class="col-lg-6">
                <label class="form-label text-sm text-uppercase" for="price">Price</label>
                <input class="form-control form-control-lg" type="number" id="price" placeholder="Enter your price" value="${product.price}" required>
            </div>

            <div class="col-lg-6">
                <label class="form-label text-sm text-uppercase" for="brand">Brand </label>
                <input class="form-control form-control-lg" type="text" id="brand" placeholder="Enter your brand" value="${product.brand}" required>
            </div>
    

              <div class="col-lg-6">
                <label class="form-label text-sm text-uppercase" for="countInStock">Count in Stock </label>
                <input class="form-control form-control-lg" type="text" id="countInStock" placeholder="Enter the Numbers in stock" value="${product.countInStock}">
              </div>

            <div class="col-lg-6 form-group">
            <label class="form-label text-sm text-uppercase" for="tags">Tags</label>
            <select  class="form-control form-control-lg rounded-0" id="tags" value="${product.tags}" required>
              <option value="">Choose your Tag</option>
                  <option value="Sale">Sale</option>
                  <option value="Sold">Sold</option>
                  <option value="New">New</option>
                  <option value="Laventa">Laventa</option>
            </select>
          </div>

            <div class="col-lg-6">
            <label class="form-label text-sm text-uppercase" for="image">Image </label>
            <input class="form-control form-control-lg" type="text" id="image" value="${product.image}"  required>
            <input type="file" class="form-control form-control-lg" name="image-file" id="image-file" />

            </div>

              <div class="col-lg-6">
                <label class="form-label text-sm text-uppercase" for="desc">Description</label>
                <textarea class="form-control form-control-lg" type="text" id="desc" required>${product.desc} </textarea>
              </div>
             

           
              <div class="col-lg-12 form-group">
                <button class="btn btn-dark" type="submit">Update</button>
              </div>
            </div>
          </form> <br>
          <h2 class="h5 text mb-4" style="color:red;">Carefully update each products details before submitting</h2>

        </div>
       
      </div>
    </section>     
    
    
    
    
      </div>    
        `
    }
}

export default ProductEditScreen