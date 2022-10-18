import { update } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const AddressBook = {
  after_render: async ()=>{
    document
    .getElementById('address-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault();
      showLoading();
      const data = await update({
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
        document.location.hash ='/address-book'
      }
    });
  },
  render: async () => {
    const {deliveryAddress, additional, town, state, company, country } = getUserInfo()
    return `
            <div class="container">
        <!-- HERO SECTION-->
        <section class="py-5 bg-light">
        <div class="container">
          <div class="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div class="col-lg-6">
              <h1 class="h2 text-uppercase mb-0">Address Book</h1>
            </div>
            <div class="col-lg-6 text-lg-end">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                  <li class="breadcrumb-item"><a class="text-dark" href="/#/">Home</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Address Book</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>   
      <section class="py-5">
      <!-- BILLING ADDRESS-->
      <h2 class="h5 text-uppercase mb-4">Billing details</h2>
      <div class="row">
        <div class="col-lg-8">
          <form id="address-form">
            <div class="row gy-3">
             
              <div class="col-lg-12">
                <label class="form-label text-sm text-uppercase" for="address">Delivery Address  </label>
                <input value="${deliveryAddress}" class="form-control form-control-lg" type="text" id="address" placeholder="Enter your Address">
              </div>
              <div class="col-lg-12">
                <label class="form-label text-sm text-uppercase" for="addressalt">Additional Information </label>
                <input value="${additional}" class="form-control form-control-lg" type="text" id="additional" placeholder="Enter Additional Information (optional)">
              </div>
              
              <div class="col-lg-6">
                <label class="form-label text-sm text-uppercase" for="city">Town/City </label>
                <input value="${town}" class="form-control form-control-lg" type="text" id="town">
              </div>
              <div class="col-lg-6">
                <label class="form-label text-sm text-uppercase" for="state">State </label>
                <input value="${state}" class="form-control form-control-lg" type="text" id="state">
              </div>

              <div class="col-lg-6">
              <label class="form-label text-sm text-uppercase" for="company">Company name (optional) </label>
              <input value="${company}" class="form-control form-control-lg" type="text" id="company" placeholder="Your company name">
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
                <button class="btn btn-dark" type="submit">Save Address</button>
              </div>
            </div>
          </form>
        </div>
       
      </div>
    </section>     




      </div>




    `;
},
};

export default AddressBook;
