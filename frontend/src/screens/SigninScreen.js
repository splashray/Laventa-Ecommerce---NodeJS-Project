import { signin } from "../api";
import { getcartItems, getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

const SigninScreen ={
    after_render:() =>{
        document
        .getElementById('signin-form')
        .addEventListener('submit', async (e) => {
          e.preventDefault();
          showLoading();
          const data = await signin({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
          });
          hideLoading();
          if (data.error) {
            showMessage(data.error);
          } else {
              setUserInfo(data);
            // document.location.hash ='/'
            redirectUser();
          }
        });


    },
    render:() =>{
        if(getUserInfo().name){
            document.location.hash ='/'
            const orderItems = getcartItems();
            if (orderItems.length >= 1) {
              document.location.hash = '/shipping';
            }
        }
        return `   
        <div class="container">  <br> <br> 
            <h2 class="row justify-content-center"> Sign in </h2>
          <div class="row justify-content-center">
            <div class="col-lg-5">
              <div class="card bg-secondary shadow border-3">
                <div class="card-header bg-white pb-5">
                  <div class="text-muted text-center mb-3"><small>Sign in with</small></div>
                  <div class="btn-wrapper text-center">
                    <a href="/#/signin" class="btn btn-neutral btn-icon">
                      <span class="btn-inner--icon"><img  height="40px" src="../assets/img/icons/common/yahoo.svg"></span>
                      <span class="btn-inner--text">Yahoo</span>
                    </a>
                    <a href="/#/signin" class="btn btn-neutral btn-icon">
                      <span class="btn-inner--icon"><img  src="../assets/img/icons/common/google.svg"></span>
                      <span class="btn-inner--text">Google</span>
                    </a>
                  </div>
                </div>
                <div class="form-container card-body px-lg-5 py-lg-5">
                  <div class="text-center muted  mb-4" style="color:white;">
                    <small>Or sign in with credentials</small>
                  </div>
                  <form id="signin-form" >
                    <div class="form-group mb-2">
                      <div class="input-group input-group-alternative">
                      <div class="input-group-prepend">
                      <span class="input-group-text"><img height="30px" width="30px" src="../assets/img/icons/common/email.png"></span>
                         </div>
                        <input id="email" class="form-control" placeholder="Email" type="email">
                      </div>
                    </div>
                    <div class="form-group focused mb-2">
                      <div class="input-group input-group-alternative">
                      <div class="input-group-prepend">
                      <span class="input-group-text"><img height="30px" width="30px" src="../assets/img/icons/common/password.png"></span>
                         </div>
                        <input id="password" class="form-control" placeholder="Password" type="password">
                      </div>
                    </div>
                    <div class="custom-control custom-control-alternative custom-checkbox">
                      <input class="custom-control-input" id=" customCheckLogin" type="checkbox">
                      <label class="custom-control-label" for=" customCheckLogin"><small style="color:white;">Remember me</small></label>
                    </div>
                    <div class="text-center">
                  
                      <button type="submit" class="btn btn-lg btn-primary hover-black">Sign In</button>
                    </div> <br> <br>
                    <div class="text-center muted  mb-4" style="color:white;">
                    <small><a style="color:dark;" href="/#/forget-password"> Forgot password? </a></small> ||
                    <small><a style="color:black;" href="/#/register"> Create an Account </a></small>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> <br> 
    

        `
    },

}

export default SigninScreen