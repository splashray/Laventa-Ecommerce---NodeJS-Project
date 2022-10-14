const AddressBook = {
  render: async () => {
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

              <div class="row gy-3">
              <div class="col-lg-12 form-group">
                <button id="logout-button" class="btn btn-danger" type="submit">Logout </button>
              </div>
            </div>


            </div>
          </div>
        </div>
      </section>   
      <section class="py-5">
      <!-- BILLING ADDRESS-->
      <h2 class="h5 text-uppercase mb-4">Billing details</h2>
      <div class="row">
        <div class="col-lg-8">
          <form action="#">
            <div class="row gy-3">
             
              <div class="col-lg-12">
                <label class="form-label text-sm text-uppercase" for="address">Delivery Address  </label>
                <input class="form-control form-control-lg" type="text" id="address" placeholder="Enter your Address">
              </div>
              <div class="col-lg-12">
                <label class="form-label text-sm text-uppercase" for="addressalt">Additional Information </label>
                <input class="form-control form-control-lg" type="text" id="addressalt" placeholder="Enter Additional Information (optional)">
              </div>
              
              <div class="col-lg-6">
                <label class="form-label text-sm text-uppercase" for="city">Town/City </label>
                <input class="form-control form-control-lg" type="text" id="city">
              </div>
              <div class="col-lg-6">
                <label class="form-label text-sm text-uppercase" for="state">State </label>
                <input class="form-control form-control-lg" type="text" id="state">
              </div>

              <div class="col-lg-6">
              <label class="form-label text-sm text-uppercase" for="company">Company name (optional) </label>
              <input class="form-control form-control-lg" type="text" id="company" placeholder="Your company name">
            </div>
            <div class="col-lg-6 form-group">
              <label class="form-label text-sm text-uppercase" for="country">Country</label>
              <select class="country" id="country" data-customclass="form-control form-control-lg rounded-0">
                <option value>Choose your country</option>

              </select>
            </div>

              <div class="col-lg-6">
                <button class="btn btn-link text-dark p-0 shadow-0" type="button" data-bs-toggle="collapse" data-bs-target="#alternateAddress">
                  <div class="form-check">
                    <input class="form-check-input" id="alternateAddressCheckbox" type="checkbox">
                    <label class="form-check-label" for="alternateAddressCheckbox">Alternate billing address</label>
                  </div>
                </button>
              </div>
              <div class="collapse" id="alternateAddress">
                <div class="row gy-3">
                  <div class="col-12 mt-4">
                    <h2 class="h4 text-uppercase mb-4">Alternative billing details</h2>
                  </div>
                  <div class="col-lg-6">
                    <label class="form-label text-sm text-uppercase" for="firstName2">First name </label>
                    <input class="form-control form-control-lg" type="text" id="firstName2" placeholder="Enter your first name">
                  </div>
                  <div class="col-lg-6">
                    <label class="form-label text-sm text-uppercase" for="lastName2">Last name </label>
                    <input class="form-control form-control-lg" type="text" id="lastName2" placeholder="Enter your last name">
                  </div>
                  <div class="col-lg-6">
                    <label class="form-label text-sm text-uppercase" for="email2">Email address </label>
                    <input class="form-control form-control-lg" type="email" id="email2" placeholder="e.g. Jason@example.com">
                  </div>
                  <div class="col-lg-6">
                    <label class="form-label text-sm text-uppercase" for="phone2">Phone number </label>
                    <input class="form-control form-control-lg" type="tel" id="phone2" placeholder="e.g. +02 245354745">
                  </div>
                  <div class="col-lg-6">
                    <label class="form-label text-sm text-uppercase" for="company2">Company name (optional) </label>
                    <input class="form-control form-control-lg" type="text" id="company2" placeholder="Your company name">
                  </div>
                  <div class="col-lg-6 form-group">
                    <label class="form-label text-sm text-uppercase" for="countryAlt">Country</label>
                    <select class="country" id="countryAlt" data-customclass="form-control form-control-lg rounded-0">
                      <option value>Choose your country</option>
                    </select>
                  </div>
                  <div class="col-lg-12">
                    <label class="form-label text-sm text-uppercase" for="address2">Address line 1 </label>
                    <input class="form-control form-control-lg" type="text" id="address2" placeholder="House number and street name">
                  </div>
                  <div class="col-lg-12">
                    <label class="form-label text-sm text-uppercase" for="addressalt2">Address line 2 </label>
                    <input class="form-control form-control-lg" type="text" id="addressalt2" placeholder="Apartment, Suite, Unit, etc (optional)">
                  </div>
                  <div class="col-lg-6">
                    <label class="form-label text-sm text-uppercase" for="city2">Town/City </label>
                    <input class="form-control form-control-lg" type="text" id="city2">
                  </div>
                  <div class="col-lg-6">
                    <label class="form-label text-sm text-uppercase" for="state2">State/County </label>
                    <input class="form-control form-control-lg" type="text" id="state2">
                  </div>
                </div>
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
