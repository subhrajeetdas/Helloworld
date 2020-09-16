 
let request;
 
/**
 * Initializes the payment request object.
 * @return {PaymentRequest} The payment request object.
 */
function buildPaymentRequest() {
    if (!window.PaymentRequest) {
      return null;
    }
 function handleError(err){
 console.log("Catch at handle error", err);
    }

    
    const supportedInstruments = [{
        supportedMethods: "https://mercury.phonepe.com/transact/pay",
        data: {
            url: 'upi://pay?pa=SSK1480603880@ybl&pn=Tic-Tac-Toeaaa&am=1.00&mam=1.00&tr=A3eweee3lwrl3r2fs&tn=Payment+for+quikr_001&mc=5812&mode=04&purpose=00&utm_campaign=DEBIT&utm_medium=SSK1480603880&utm_source=A3eweee3lwrl3r2fs'  //redirect url from v4/debit response
        }
    }];
  
    const details = {
        id: "1111-71ca4e9f-748c-4de7-af7b-a84f3da75b4e-temp",       //A unique id [optional], if not passed browser will generate one
      total: {
        label: 'Total',
        amount: {
          currency: 'INR',
          value: '100',
        }
      }
    };
  
    try {
      request = new PaymentRequest(supportedInstruments, details);
      console.log("Request: "+request);
      console.log("request.canMakePayment: "+request.canMakePayment);
      if (request.canMakePayment) {
        request.canMakePayment().then(function(result) {
            //Show “pay by Phonepe” button in payment options
            //onPayByPhonePeClick();
            //console.log("Inside Can Make Payment"+result);
            alert("Inside Can Make Payment "+result);

        }).catch(function(err) {
          //handleError(err);
            alert("Error Handling"+ err);
            console.log("Error Handling",err);
        });
      }
      if (request.hasEnrolledInstrument) {
        request.hasEnrolledInstrument().then(function(result) {
        }).catch(function(err) {
          handleError(err);     //handle error
        });
      }
    } catch (e) {
      //handleError(e);
     alert("Error Handling"+ e);
            console.log("Error Handling",e);
    }
  }
  
 /**
  * Create payment request object for Phonepe payment.
  */
  function onCheckoutClick(){
       buildPaymentRequest();
  }
 
  function handlePaymentResponse(response) {

 response
   .complete("success")
   .then(function() {
     console.log("This is a demo website. No payment will be processed." + response);
   })
   .catch(function(err) {
     error(err);
     request = buildPaymentRequest();
   });
}
  /**
   * Handles the response from PaymentRequest.show().
   
  function handlePaymentResponse(response) {
      //Check if the response.details.result is success
      //get the transaction ref id from the response
      //use transaction refId and merchant Id to fetch the status
      var fetchOptions = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(payloadForFetch)   
          };
          var serverPaymentRequest = new Request('secure/payment/endpoint');    //endpoint to fetch the status from server
          fetch(serverPaymentRequest, fetchOptions).then( fetchResponse => {
            if (fetchResponse.status < 400) {
              response.complete("success");     //notifies the user agent that the user interaction is over, and causes any remaining user interface to be closed
            } else {
              response.complete("fail");        //notifies the user agent that the user interaction is over, and causes any remaining user interface to be closed
            };
          }).catch( reason => {
            response.complete("fail");          //notifies the user agent that the user interaction is over, and causes any remaining user interface to be closed
          });      
  }
  */
  /**
   * Click event listener for “pay by Phonepe” button
   * Launch payment request for Phonepe payment.
   */
  function onPayByPhonePeClick() { 
    if (!window.PaymentRequest || !request) {
      return;
    }
      try {
        request.show()
          .then(handlePaymentResponse)
          .catch(function(err) {
            console.log("Inside catch :", err)
            handleError(err);  
            alert("Inside handleError "+err); //handle error
            request = buildPaymentRequest();
          });
      } catch (e) {
        handleError(e);
        console.log("Inside catch :", e)
        alert("Inside handleError- "+e);
      }
  }
