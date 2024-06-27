var form    = '';
var form_id = '';
jQuery(document).ready(function() {
	// console.log("HERE");
  window.captchaCallback = function(){
		//console.log("Calling function captchaCallback");
		$('.g-recaptcha').each(function(index, el) {
			var attributes = {
				'sitekey'  : $(el).data('sitekey'),
				'size'     : $(el).data('size'),
				'callback' : $(el).data('callback')
			};
			$(el).data('recaptcha-widget-id', grecaptcha.render(el, attributes));
		});
	};
	window.form2Callback = function(){
		console.log("Calling function form1Callback #" +form_id + "<---------->"+ $('#'+form_id));
		$('#'+form_id).data("recaptcha-verified", true).submit();
    };
    	jQuery('form').each(function(){
			jQuery(this).on("submit", function(e){
				e.preventDefault();     
				console.log("submit");
				form = $(this);
				form_id = $(this).attr('id');
				
				var $form = $(this);
				if(!$form.valid()){
					return;
				}
				if ($form.data("recaptcha-verified")){
					doSubmit();
					return;
				}
				grecaptcha.execute($form.find(".g-recaptcha").data("recaptcha-widget-id"));
				return false;        
			});
		});  
}); 
jQuery(function(){
   jQuery('#contact-us-form').validate({
    rules: {
      name: {
        required: true
      },
	  email: {
        required: true
      },	  
     },
    messages: {
	   name: {
          required: "Enter your Name"
       },
	    email: {
          required: "Enter your Email"
       },
    }
  });	
  onCompleted = function() {
		form.submit();
	};
	
	doSubmit = function(){                
    var formData = new FormData(form[0]);
		formData.append('form',form_id);

		// data: $this.serialize(),  
	  //e.preventDefault();
	  jQuery('#'+form_id + ' .mfProgress').prop('disabled', true);
	  if( form.valid()){ 
      var loading = form.find('.loading');
      var dynamic = form.find('.dynamic');
	    $this = form;
	    $.ajax({
        type: "POST",
        url: $this.attr('action'),        
        data:formData,
        processData: false,
        contentType: false,
        beforeSend: function () {
			console.log('beforeSend');
          loading.remove();
          dynamic.css('display', 'block').html('<div class="loading"><i class="fa fa-3x fa-spinner fa-spin"></i></div>');
          var windowHeight = $(window).height();
				$('html, body').animate({
            scrollTop: ($("#contact-us-form").offset().top )
          }, 1000);
        },
				success: function(response){  	
console.log('success');				
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
				 	$('.success_message').css('display', 'block').html('<div><h5>Thank you! Your message has been successfully sent. <br>We will contact you very soon!</h5></div>').fadeOut(10000);
					return false;
				}else if( response == "fail" ){
      		dynamic.css('display', 'block').html("<div class='result'>Mail not sent.</div>").fadeOut(10000);
          grecaptcha.reset();
          return false;
	      } else {
      		dynamic.css('display', 'block').html("<div class='result'>Looks like there was a error.</div>").fadeOut(10000);
          grecaptcha.reset();
          return false;
	      }
				$('#'+form_id + ' .mfProgress').prop('disabled', false);	        
	    },
	      //error:function(){
			error: function (xhr, ajaxOptions, thrownError) {
           console.log(xhr.status);
           console.log(xhr.responseText);
           console.log(thrownError);
	        alert('failed');
	      }
	    });
	  } else {
	    //$('.ajax_loader').hide();
	  }
	  //return false;
		//$('#'+form_id + ' .ajax_loader').fadeOut().delay(1000)
		$('#'+form_id + ' .mfProgress').prop('disabled', false);	        	  
  };
}); 
