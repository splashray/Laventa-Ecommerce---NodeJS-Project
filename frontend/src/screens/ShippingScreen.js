import { update } from "../api";
import { clearUser, getcartItems, getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

const ShippingScreen ={
    after_render: () => {
        document
        .getElementById('signout-button')
        .addEventListener("click",()=>{
            clearUser()
            document.location.hash ='/'
        })

        document
        .getElementById('profile-form')
        .addEventListener('submit', async (e) => {
          e.preventDefault();
          showLoading();
          const data = await update({
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            phone: document.getElementById('phone').value,
            deliveryAddress: document.getElementById('address').value,   
            additional: document.getElementById('additional').value,
            town: document.getElementById('town').value,  
            state: document.getElementById('state').value,
            company: document.getElementById('company').value,   
            country: document.getElementById('country').value,
          });
          hideLoading();
          if (data.error) {
            showMessage(data.error);
          } else {
            setUserInfo(data);
            // redirectUser();
            document.location.hash ='/payment'
          }
        });


      },
    render: async()=>{
      const {name, firstName, lastName, email, phone,deliveryAddress, additional, town, state, company, country } = getUserInfo()
      if (!name) {
        document.location.hash ='/'
      }   
      const orderItems = getcartItems();
      if (orderItems.length === 0) {
        document.location.hash = '/shop';
      }

        return `
        <div class="container">
    <!-- HERO SECTION-->
    <section class="py-5 bg-light">
    <div class="container">
      <div class="row px-4 px-lg-5 py-lg-4 align-items-center">
        <div class="col-lg-6">
          <h1 class="h2 text-uppercase mb-0">Shipping</h1>
        </div>
        <div class="col-lg-6 text-lg-end">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
              <li class="breadcrumb-item"><a class="text-dark" href="/#/">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Shipping</li>
            </ol>
          </nav>

          <div class="row gy-3">
          <div class="col-lg-12 form-group">
            <button id="signout-button" class="btn btn-danger" type="submit">Logout </button>
          </div>
        </div>


        </div>
      </div>
    </div>
  </section>   
  <section class="py-5">
  <!-- BILLING ADDRESS-->
  <h2 class="h5 text-uppercase mb-4">Complete the details to confirm the order</h2>
  <div class="row">
    <div class="col-lg-8">
      <form  id="profile-form">
        <div class="row gy-3">
         
        <div class="col-lg-6">
        <label class="form-label text-sm text-uppercase" for="firstName">First name </label>
        <input value="${firstName}"  class="form-control form-control-lg" type="text" id="firstName" placeholder="Enter your first name" required>
        </div>
        <div class="col-lg-6">
            <label class="form-label text-sm text-uppercase" for="lastName">Last name </label>
            <input value="${lastName}" class="form-control form-control-lg" type="text" id="lastName" placeholder="Enter your last name" required>
        </div>
        <div class="col-lg-6">
            <label class="form-label text-sm text-uppercase" for="email">Email address </label>
            <input class="form-control form-control-lg" type="email" id="email" placeholder="e.g. Jason@example.com" value="${email}" readonly>
        </div>
        <div class="col-lg-6">
            <label class="form-label text-sm text-uppercase" for="phone">Phone number </label>
            <input value="${phone}" class="form-control form-control-lg" type="tel" id="phone" placeholder="e.g. +234 9053215745" required>
        </div>

          <div class="col-lg-12">
            <label class="form-label text-sm text-uppercase" for="address">Delivery Address  </label>
            <input value="${deliveryAddress}" class="form-control form-control-lg" type="text" id="address" placeholder="Enter your Address" required>
          </div>
          <div class="col-lg-12">
            <label class="form-label text-sm text-uppercase" for="addressalt">Additional Information </label>
            <input value="${additional}" class="form-control form-control-lg" type="text" id="additional" placeholder="Enter Additional Information (optional)" >
          </div>
          <div class="col-lg-6">
          <label class="form-label text-sm text-uppercase" for="company">Company name (optional) </label>
          <input value="${company}" class="form-control form-control-lg" type="text" id="company" placeholder="Your company name">
        </div>
          <div class="col-lg-6">
            <label class="form-label text-sm text-uppercase" for="city">Town/City </label>
            <input value="${town}" class="form-control form-control-lg" type="text" id="town" required>
          </div>
          <div class="col-lg-6">
            <label class="form-label text-sm text-uppercase" for="state">State </label>
            <input value="${state}" class="form-control form-control-lg" type="text" id="state" required>
          </div>
        <div class="col-lg-6 form-group">
          <label class="form-label text-sm text-uppercase" for="country">Country</label>
          <select  class="form-control form-control-lg rounded-0" id="country" required>
            <option value="">Choose your country</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niger">Niger</option>
            <option value="Ghana">Ghana</option>
            <option value="Nigeria">Nigeria</option>
            <option value="South-Africa">South Africa</option>
            <option value="Togo">Togo</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Uganda">Uganda</option>
            <option value="United States">United States</option>
          </select>
        </div>
          <div class="col-lg-12 form-group">
            <button class="btn btn-dark" type="submit">Continue</button>
          </div>
        </div>
      </form>
    </div>
   
  </div>
</section>     




  </div>




`;
    }
}

export default ShippingScreen