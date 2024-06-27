import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { WOW } from 'wowjs/dist/wow.min';
declare var $: any;


@Component({
    selector: 'pm-why-us',
    templateUrl: './why-us.component.html',
    styleUrls: ['./why-us.component.css']
})

export class WhyUsComponent implements OnInit {
    patientCount: any;

    constructor( private commonService: CommonService) {

    }
    ngOnInit(): void {
        this.onGetPatientLocationData();

    }

    ngAfterViewInit() {
        $('.collapse').on('shown.bs.collapse', function() {
          $(this).parent('.card').addClass('active-acc');
      });
      $('.collapse').on('hidden.bs.collapse', function() {
          $(this).parent('.card').removeClass('active-acc');
      });
      setTimeout(function() {
        console.log('testimonial');
        var $bgSection = $(".bg-section");
        var $bgPattern = $(".bg-pattern");
        var $colBg = $(".col-bg");
    
        $bgSection.each(function() {
            var bgSrc = $(this).children("img").attr("src");
            var bgUrl = 'url(' + bgSrc + ')';
            $(this).parent().css("backgroundImage", bgUrl);
            $(this).parent().addClass("bg-section");
            $(this).remove();
        });
    
        $bgPattern.each(function() {
            var bgSrc = $(this).children("img").attr("src");
            var bgUrl = 'url(' + bgSrc + ')';
            $(this).parent().css("backgroundImage", bgUrl);
            $(this).parent().addClass("bg-pattern");
            $(this).remove();
        });
    
        $colBg.each(function() {
            var bgSrc = $(this).children("img").attr("src");
            var bgUrl = 'url(' + bgSrc + ')';
            $(this).parent().css("backgroundImage", bgUrl);
            $(this).parent().addClass("col-bg");
            $(this).remove();
        });
        
        var $carouselDirection = $("html").attr("dir");
        if ($carouselDirection == "rtl") {
            var $carouselrtl = true;
        } else {
            var $carouselrtl = false;
        }
    
        $(".carousel").each(function() {
            var $Carousel = $(this);
            $Carousel.owlCarousel({
                loop: $Carousel.data('loop'),
                autoplay: $Carousel.data("autoplay"),
                autoplayTimeout:$Carousel.data("autoplaytimeout"),
                autoplayHoverPause:true,
                margin: $Carousel.data('space'),
                nav: $Carousel.data('nav'),
                dots: $Carousel.data('dots'),
                center: $Carousel.data('center'),
                dotsSpeed: $Carousel.data('speed'),
                navText : ["<i class='fa fa-chevron-left'></i><span>Previous</span>","<span>Next</span><i class='fa fa-chevron-right'></i>"],
                responsive: {
                    0: {
                        items: $Carousel.data('slide-ms'),
                    },
                    768: {
                        items: $Carousel.data('slide-rs'),
                    },
                    1000: {
                        items: $Carousel.data('slide'),
                    }
                }
            });
        });
    
        $(".custom-carousel").each(function() {
            var $Carousel = $(this);
            $Carousel.owlCarousel({
                loop: $Carousel.data('loop'),
                autoplay: $Carousel.data("autoplay"),
                margin: $Carousel.data('space'),
                nav: $Carousel.data('nav'),
                dots: $Carousel.data('dots'),
                center: $Carousel.data('center'),
                dotsSpeed: $Carousel.data('speed'),
                dotsContainer: '#carousel-custom-dots',
                responsive: {
                    0: {
                        items: 1,
                    },
                    768: {
                        items: $Carousel.data('slide-rs'),
                    },
                    1000: {
                        items: $Carousel.data('slide'),
                    }
                }
            });
        });
    
        $('.custom-carousel').owlCarousel({
            thumbs: true,
            thumbsPrerendered: true
        });
    
        $(".slider-carousel").each(function() {
            var $Carousel = $(this);
            $Carousel.owlCarousel({
                loop: $Carousel.data('loop'),
                autoplay: $Carousel.data("autoplay"),
                margin: $Carousel.data('space'),
                nav: $Carousel.data('nav'),
                dots: $Carousel.data('dots'),
                center: $Carousel.data('center'),
                dotsSpeed: $Carousel.data('speed'),
                responsive: {
                    0: {
                        items: 1,
                    },
                    768: {
                        items: $Carousel.data('slide-rs'),
                    },
                    1000: {
                        items: $Carousel.data('slide'),
                    }
                },
            });
        });
    
        // Clicking On Thumbs
        $('.testimonial-thumbs .testimonial-thumb').click(function() {
            $(this).siblings(".testimonial-thumb").removeClass('active');
            $(this).addClass('active');
            $(".custom-carousel").trigger('to.owl.carousel', [$(this).index(), 300]);
        });
    
      
    
        // Clicking The Custom Nav
        $('.testimonials-holder .custom-navs .next').click(function() {
            $(".custom-carousel").trigger('next.owl.carousel');
        });
    
        $('.testimonials-holder .custom-navs .prev').click(function() {
            $(".custom-carousel").trigger('prev.owl.carousel');
        });
        
    
             $('.count').counterUp({
                delay: 10,
                time: 1000
            });
          
    
        
    
        var wow = new  WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 50, // distance to the element when triggering the animation (default is 0)
            mobile: false, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
    
        });
        wow.init();
    }, 1000);
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
        var subtitle = $('.subtitle');
    
            setTimeout(function () {
                subtitle.each(function () {
                    if ($(this)[0].scrollHeight > $(this).height()) {
                        $(this).find('.read_more_trigger').css('display', 'block');
                    }
                });
            }, 1000);
        
            $('.read_more_trigger').each(function () {
                $(this).click(function (e) {
                    e.preventDefault();
                    if ($(this).hasClass('open')) {
                        $(this).removeClass('open');
                        $(this).text('+ More');
                        $(this).parent('.subtitle').removeClass('subtitle_open');
                    } else {
                        $(this).addClass('open');
                        $(this).parent('.subtitle').addClass('subtitle_open');
                        $(this).text('- Less');
        
                    }
                })
            });
        
        
        
            $('.moreless-button').click(function (e) {
                e.preventDefault();
                $('.moretextsection').slideToggle();
                if ($('.moreless-button .more_txts').text() == "Read More") {
                    $(this).children(".more_txts").text("Read Less")
                } else {
                    $(this).children(".more_txts").text("Read More")
                }
            });
        
        
            $(window).resize(function () {
                var windowWidth = $(document).width();
        
                if (windowWidth > 767) {
                    $('.moretextsection').show();
                } else {
        
                    $('.moretextsection').hide();
                }
        
            });
    
            
      }

      onGetPatientLocationData() {
        this.commonService.getLocationPatientCount().subscribe(res => {
            this.patientCount = res.result.patientCount;
        });
    }

}
