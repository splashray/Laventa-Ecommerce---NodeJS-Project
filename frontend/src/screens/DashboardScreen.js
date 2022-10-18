import { getSummary } from "../api";

let summary = {}
const DashboardScreen = {
  after_render: () => {},
  render: async ()=>{
      summary = await getSummary()
      return `
      <div class="container">

<section class="py-5">
<!-- BILLING ADDRESS-->
<h2 class="h5 text-uppercase mb-4">Dashboard</h2> 
<div class="row">
<!-- shipping SUMMARY-->
       
     <!-- Statistics Section-->
     <section class="py-5">
     <div class="container-fluid">
       <div class="row align-items-stretch gy-4">
         <div class="col-lg-4">
           <!-- sales-->
           <div class="card text-center h-100 mb-0">
             <div class="card-body">
               <svg class="svg-icon svg-icon-big svg-icon-light mb-4 text-muted">
                 <use xlink:href="#sales-up-1"> </use>
               </svg>
               <p class="text-gray-700 display-6">$${summary.orders[0].totalSales}</p>
               <p class="text-primary h2 fw-bold">Sales</p>
               <p class="text-xs text-gray-600 mb-0">Accumulating All Sales Received</p>
             </div>
           </div>
         </div>
         <div class="col-lg-4">
           <!-- orders-->
           <div class="card h-100 mb-0">
             <div class="card-body">
               <h2 class="h3 fw-normal mb-4">Orders Received</h2>
               <div class="row align-items-center mb-3 gx-lg-5">
                 <div class="col-lg-6">
                   <table class="w-100">
                     <tbody>
                       <tr>
                         <td>
                           <div class="position-relative mx-auto" style="max-width: 120px">
                             <canvas class="mx-auto" id="monthlyProgress" width="150" height="150"></canvas>
                             <p class="h3 text-primary fw-normal position-absolute top-50 start-50 translate-middle text-center m-0">${summary.paidOrders[0].count}  Paid</p>
                           </div>
                         </td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
                 <div class="col-lg-6 border-start">
                   <p class="fw-bold h2 text-primary">${summary.orders[0].numOrders} Total</p>
                   <p class="text-gray-500">${summary.paidOrders[0].count} Delivered order</p>
                 </div>
               </div>
               <p class="text-xs text-muted">Includes All Orders Received</p>
             </div>
           </div>
         </div>
         <div class="col-lg-4">
           <!-- Users-->
           <div class="card h-100 mb-0">
             <div class="card-body">
               <h2 class="h3 fw-normal mb-4">User Activity</h2>
               <p class="display-6">${summary.users[0].numUsers}</p>
               <h3 class="h4 fw-normal">Active Users</h3>
               <div class="progress rounded-0 mb-3">
                 <div class="progress-bar progress-bar bg-primary" role="progressbar" style="width: 35%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
               </div>
               <div class="d-flex justify-content-between">
                 <div class="text-start">
                   <p class="h5 fw-normal mb-2">Pages Visits</p>
                   <p class="fw-bold text-xl text-primary mb-0">649</p>
                 </div>
                 <div class="text-end">
                   <p class="h5 fw-normal mb-2">New Visits</p>
                   <p class="fw-bold text-xl text-primary mb-0">73.4%</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>



</div>
</section>     


<br><br>
<br>
<br>
<br>
<br><br>
<br>
<br>
<br>

</div>




`;
  }
};
export default DashboardScreen;
