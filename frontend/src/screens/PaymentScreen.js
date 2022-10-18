import { getUserInfo, setPayment } from "../localStorage";

const PaymentScreen ={
    after_render: () => {
        document
        .getElementById('payment-form')
        .addEventListener('submit', async (e) => {     
        e.preventDefault()
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value
        setPayment({paymentMethod})
        document.location.hash = '/placeorder'
        });

      },
    render: ()=>{
     
        return `
        <div class="container">
    
  <section class="py-5">
  <!-- BILLING ADDRESS-->
  <h2 class="h5 text-uppercase mb-4">Choose the payment Method</h2> 
  <div class="row">
    <div class="col-lg-8">
      <form  id="payment-form">
        <div class="row gy-3">
            <div class="col-lg-6">
                <div class="form-check">
                    <input class="form-check-input" name="payment-method" id="Paypal" type="checkbox" value="Paypal" checked/>
                    <h5 class="" >Paypal</h5>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="form-check">
                    <input class="form-check-input" name="payment-method"  id="card" value="Card Payment"  type="checkbox">
                    <h5 class="" >Card Payment</h5>
                </div>
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

export default PaymentScreen