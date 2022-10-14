
const CloseAccount = {
    render: async () => {
      return `
      <div class="container">
  
<section class="py-5">
<!-- BILLING ADDRESS-->
<h2 class="h5 text-uppercase mb-4">Close Account</h2>
<div class="row">
  <div class="col-lg-8">
   <h4> Please read carefully </h4>
  <p> You are about to ask us to permanently close your Laventa account and delete your data. Once your account is closed, all products and services that you access through your account will no longer be available.
  </p> </p>
  Please take into consideration that your account will still be active while our customer relations teams are processing your request.
  </p> </p>
  This may take up to 30 days from the date of submission of your request.
  </p> </p>
  If you comply with this request, you will not be able to access the products and services associated with your closed account.
  </p> </p>
  Please select the main reason that is leading you to close your Laventa account (non-mandatory) </p>
    <form>
      <div class="row gy-3">
      <div class="col-lg-6 form-group">
        <label class="form-label text-sm text-uppercase" for="country">Reason</label>
        <select  class="form-control form-control-lg rounded-0">
        <option value="" selected="">Select the reason</option>
        <option value="I am not using this account anymore">I am not using this account anymore</option>
        <option value="I have another account">I have another account</option>
        <option value="I wish to create a new account">I wish to create a new account</option>
        <option value="I am concerned about my account security and/or unauthorized activity">I am concerned about my account security and/or unauthorized activity</option>
        <option value="I have unresolved issues with Laventa">I have unresolved issues with Laventa</option>
        <option value="I don’t want to disclose my reason(s)">I don’t want to disclose my reason(s)</option>
        </select>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" required>
        <label class="form-check-label">Yes, I wish to definitely close my Laventa account and delete all my personal data</label>
      </div>
    </button>
        <div class="col-lg-12 form-group">
          <button class="btn btn-danger" type="submit">Close My Account</button>
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

export default CloseAccount;
