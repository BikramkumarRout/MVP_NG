import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { WOW } from 'wowjs/dist/wow.min';
declare var $: any;

@Component({
    selector: 'pm-testimonials',
    templateUrl: './testimonials.component.html',
    styleUrls:[ './testimonials.component.css']
})

export class TestimonialsComponent implements OnInit {
   locationList;
    patientCount: any;
    locationCount: any;
    constructor(private commonService: CommonService,
        ) {
        
    }

    ngOnInit(): void {
        this.onGetPatientLocationData();
     }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
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
          
        }, 1000);
    }

    onGetPatientLocationData() {
        this.commonService.getLocationPatientCount().subscribe(res => {
          this.patientCount = res.result.patientCount;
          this.locationCount = res.result.locationCount;
        });
      }
}

