import { update, updatepass } from "../api";
import { clearUser, getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showErrMessage, showGoodMessage, showLoading, showMessage } from "../utils";

const AccountManage = {
    after_render: async ()=>{
      document
      .getElementById('signout-button')
      .addEventListener("click",()=>{
          clearUser()
          document.location.hash ='/'
      })

      document.getElementById('change-details')
      .addEventListener("submit",async(e)=>{
        e.preventDefault()
        showLoading();
        const data = await update({
          firstName: document.getElementById('firstName').value,
          lastName: document.getElementById('lastName').value,
          phone: document.getElementById('phone').value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          // redirectUser();
          
          document.location.hash ='/account-management'
        }

      })

      document.getElementById('change-password')
      .addEventListener("submit",async(e)=>{
        e.preventDefault()
        const opass = document.getElementById('opassword').value
        const npass = document.getElementById('npassword').value
        const cnpass = document.getElementById('cnpassword').value
        if(npass !== cnpass){
          showErrMessage("New Password doesn't match")
          document.location.hash ='/account-management'
        }else{
          showLoading();
          const data = await updatepass({
            opassword: opass,
            npassword: npass,
          });
          hideLoading();
          if (data.error) {
            showErrMessage(data.error);
          } else {
            showGoodMessage("password Changed")
            document.location.hash ='/account-management'
          }
        }

      })
    },
    render: async () => {
      const {firstName,lastName, email, phone } = getUserInfo()
      
        return `
                <div class="container">
            <!-- HERO SECTION-->
            <section class="py-5 bg-light">
            <div class="container">
              <div class="row px-4 px-lg-5 py-lg-4 align-items-center">
                <div class="col-lg-6">
                  <h1 class="h2 text-uppercase mb-0">Account Management</h1>
                </div>
                <div class="col-lg-6 text-lg-end">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                      <li class="breadcrumb-item"><a class="text-dark" href="/#/">Home</a></li>
                      <li class="breadcrumb-item active" aria-current="page">Account Management</li>
                    </ol>
                  </nav>

                  
                  <div class="row gy-3">
                    <div class="col-lg-12 form-group">
               <button id="signout-button" class="btn btn-danger" type="submit">Logout <i class="fa fa-sign-out" aria-hidden="true"></i></button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>   
          <section class="py-5">
          <!-- personal details-->
          <h2 class="h5 text-uppercase mb-4">Personal Details</h2>
          <div class="row">
            <div class="col-lg-8">
              <form id="change-details">
                <div class="row gy-3">
                  <div class="col-lg-6">
                    <label class="form-label text-sm text-uppercase" for="firstName">First name </label>
                    <input value="${firstName}" class="form-control form-control-lg" type="text" id="firstName" placeholder="Enter your first name" >
                  </div>
                  <div class="col-lg-6">
                    <label class="form-label text-sm text-uppercase" for="lastName">Last name </label>
                    <input value="${lastName}" class="form-control form-control-lg" type="text" id="lastName" placeholder="Enter your last name">
                  </div>
                  <div class="col-lg-6">
                    <label class="form-label text-sm text-uppercase" for="email">Email address </label>
                    <input value="${email}" class="form-control form-control-lg" type="email" id="email" placeholder="e.g. Jason@example.com" readonly>
                  </div>
                  <div class="col-lg-6">
                    <label class="form-label text-sm text-uppercase" for="phone">Phone number </label>
                    <input value="${phone}" class="form-control form-control-lg" type="tel" id="phone" placeholder="e.g. +02 245354745">
                  </div>
                  <div class="col-lg-12 form-group">
                    <button class="btn btn-dark" type="submit">Update Details</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

            <!-- password details--> <br> <br> <br>
            <h2 class=" h5 text-uppercase mb-4">Change Password</h2>
            <div class="row">
              <div class="col-lg-8">
                <form id="change-password">
                  <div class="row gy-3">
  
                    <div class="col-lg-6">
                      <label class="form-label text-sm text-uppercase" for="opassword">Current Password</label>
                      <input class="form-control form-control-lg" type="password" id="opassword" placeholder="Enter your current password" required>
                    </div>
                   
                    <div class="col-lg-6">
                      <label class="form-label text-sm text-uppercase" for="npassword">New Password</label>
                      <input class="form-control form-control-lg" type="password" id="npassword" placeholder="Enter your New password" required>
                    </div>
                     
                    <div class="col-lg-6">
                      <label class="form-label text-sm text-uppercase" for="cnpassword">New Password</label>
                      <input class="form-control form-control-lg" type="password" id="cnpassword" placeholder="Confirm your New password" required>
                    </div>
                    <div class="col-lg-12 form-group">
                      <button class="btn btn-dark" type="submit">Update Password</button>
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

export default AccountManage;
