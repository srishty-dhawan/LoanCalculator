//listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e){
  //hide results
  document.getElementById('results').style.display='none';

  //show loader
  document.getElementById('loading').style.display='block';
  
  setTimeout(calculateResults,2000);
  e.preventDefault();
});

//calculateResults
function calculateResults(){
  console.log('Calculating Results...');
  //UI Vars
  const amount=document.getElementById('amount');
  const interest=document.getElementById('interest');
  const years=document.getElementById('years');
  const monthlyPayment=document.getElementById('monthly-payment');
  const totalPayment=document.getElementById('total-payment');
  const totalInterest=document.getElementById('total-interest');

  const principle=parseFloat(amount.value);
  const calculatedInterest=parseFloat(interest.value)/100/12;
  const calculatedPayments=parseFloat(years.value)*12;

  //compute monthly payments
  const x=Math.pow(1+calculatedInterest,calculatedPayments);
  const monthly=(principle*x*calculatedInterest)/(x-1);

  if(isFinite(monthly))
  {
    monthlyPayment.value= monthly.toFixed(2);
    totalPayment.value=(monthly * calculatedPayments).toFixed(2);
    totalInterest.value=((monthly*calculatedPayments)-principle).toFixed(2);
    //Show results
    document.getElementById('results').style.display='block';
    //hide loader
    document.getElementById('loading').style.display='none';
  }
  else{
    showError('Please check your numbers');
  }
}

function showError(error)
{
   //hide results
   document.getElementById('results').style.display='none';

   //hide loader
   document.getElementById('loading').style.display='none';

  // create a div
  const errDiv=document.createElement('div');

  // get elements
  const card=document.querySelector('.card');
  const heading=document.querySelector('.heading');

  //add class
  errDiv.className='alert alert-danger';

  //create text node and append the div
  errDiv.appendChild(document.createTextNode(error));

  //insert error above heading
  card.insertBefore(errDiv,heading);

  //clear error after 3 sec(function, millisec)
  setTimeout(clearError, 3000);

}

//clear error
function clearError(){
  document.querySelector('.alert').remove();
}