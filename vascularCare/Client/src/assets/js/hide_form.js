var form    = '';
var form_id = '';

$(document).ready(function() {
	$('form').each(function(){
		$(this).on("submit", function(e){
			e.preventDefault();     
			form = $(this);
			form_id = $(this).attr('id');
			
			console.log("submit "+form_id);
			console.log(form)
			if(!form.valid()){
				return;
			}
			if (form.data("recaptcha-verified")){
				doSubmit();
				return;
			}
			grecaptcha.execute(form.find(".g-recaptcha").data("recaptcha-widget-id"));
			return false;        
		});
	});

  window.captchaCallback = function(){
		console.log("Calling function captchaCallback");
		$('.g-recaptcha').each(function(index, el) {
			var attributes = {
				'sitekey'  : $(el).data('sitekey'),
				'size'     : $(el).data('size'),
				'callback' : $(el).data('callback')
			};
			$(el).data('recaptcha-widget-id', grecaptcha.render(el, attributes));
		});
	};
  window.formCallback = function(){
		console.log("Calling function formCallback #" +form_id + "<---------->"+ $('#'+form_id));
		$('#'+form_id).data("recaptcha-verified", true).submit();
  };
    
  
}); 
	
onCompleted = function() {
	form.submit();
}
	
doSubmit = function(){
	console.log('here');
    var formData = new FormData(form[0]);
		formData.append('form',form_id);
	  $('#'+form_id + ' .mfProgress').prop('disabled', true);
	  if(form.valid()){ 
      var loading = form.find('.loading');
      var dynamic = form.find('.dynamic');
	  var successfn = form.find('.success_message');

	    $this = form;
	    $.ajax({
        type: "POST",
        url: $this.attr('action'),        
        data:formData,
        processData: false,
        contentType: false,
        beforeSend: function () {
          loading.remove();
          dynamic.css('display', 'block').html('<div class="loading"><i class="fa fa-3x fa-spinner fa-spin"></i></div>');
          var windowHeight = $(window).height();
					$('html, body').animate({
            scrollTop: (dynamic.offset().top - (windowHeight/2))
          }, 1000);
        },
				success: function(response){ 
        //subscribe constant contact
 			  response = response.trim();
				loading.remove();
				dynamic.css('display', 'none');
                
				var captchas=  $('.g-recaptcha').length;
				for(var i = 0; i < captchas; i++) {
					grecaptcha.reset(i);
				}
				// grecaptcha.reset();
				form.data("recaptcha-verified", false);
				$('#'+form_id + ' .mfProgress').prop('disabled', false);	
        if( response == "CaptchError" ){
					dynamic.css('display', 'block').html("<div class='error'>There was a reCAPTCHA error.</div>").fadeOut(10000);
					grecaptcha.reset();
					return false;
        } else if(response == 'success'){
	       
				form[0].reset();         
				  successfn.css('display', 'block').html('<div><h5>Thank You, We will contact you soon.</h5></div>').fadeOut(10000);
					//$('#yourname, #emailadd, #bestnum, #insuranceco, #howdiduhear, #inquirydetails').val('');
					// grecaptcha.reset();
					return false;
				}else if( response == "fail" ){
      		dynamic.css('display', 'block').html("<div class='result'>Mail not sent.</div>").fadeOut(10000);
          grecaptcha.reset();
          return false;
	      } else {
      		dynamic.css('display', 'block').html("<div class='result'>"+response+".</div>").fadeOut(10000);
          grecaptcha.reset();
          return false;
	      }
				$('#'+form_id + ' .mfProgress').prop('disabled', false);	        
	    },
	      error:function(){
	        alert('failed');
	      }
	    });
	  } else {
	    //$('.ajax_loader').hide();
	  }
	  //return false;
		//$('#'+form_id + ' .ajax_loader').fadeOut().delay(1000)
		$('#'+form_id + ' .mfProgress').prop('disabled', false);	        	  
  }
  

