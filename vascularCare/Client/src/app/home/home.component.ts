import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WOW } from 'wowjs/dist/wow.min';
declare var $: any;
import { DialogService } from 'primeng/dynamicdialog';

import { AppConsts } from '../shared/core/common/app-constant';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { NotifyService } from '../shared/core/common/toast';
import { HomeTopBarComponent } from '../layout/home-topbar.component';
import { Subject } from 'rxjs';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { filter, takeUntil } from 'rxjs/operators';
import { CommonService } from '../shared/core/common/commonService';
import { AuthenticateModel } from '../user/login';
import { LoginService } from '../user/login.service';
import { AuthService } from '../user/auth.service';
import { UserDto } from '../manage-site/manage-user/manage-user';
import { VccService } from '../manage-site/manage-vcc/vcc-listing.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';
import { ShareDataService } from '../shared/core/common/sharedDataService';
import { PhoneFormatPipe } from '../shared/pipe/phoneNoPipe';
import { NgForm } from '@angular/forms';
import { ContactUsDto } from './contact/contact-us';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
    // @ViewChild('contactForm') public contactForm: NgForm;
    // public contactDetail: ContactUsDto;

    loginDisplay: boolean = false;
    patientCount: any;
    locationCount: any;
    userEmail: string;
    vccList: any;
    mapLocation: any;
    showMap: boolean = false;
    mapUrl: any;
    submittedError: boolean;
    isHr: any;

    constructor(
        private loginService: LoginService,
        private commonService: CommonService,
        private msalAuthService: MsalService,
        private router: Router,
        private http: HttpClient,
        private notify: NotifyService,
        private authService: AuthService,
        private msalBroadcastService: MsalBroadcastService,
        private sanitizer: DomSanitizer,
        private safePipe: SafePipe,
        private phoneFormat: PhoneFormatPipe,
        private shareDataService: ShareDataService
    ) {

    }

    ngOnInit() {
        let url = 'https://maps.google.com/maps?q=&output=embed';
        this.mapUrl = this.safePipe.transform(url, 'url');
        this.onGetVccFacilities();
        this.onGetPatientLocationData();
        this.loginDisplay = this.msalAuthService.instance.getAllAccounts().length > 0;
        let user = this.shareDataService.getUser();
        let iconClickSession = sessionStorage.getItem('homeoIconClick');
        if (this.msalAuthService.instance.getAllAccounts().length > 0 && (user == null || user == undefined)
            && iconClickSession !== 'HomeIconClick') {

            this.onDashboardClick();
        }

    }


    ngAfterViewInit() {
        $('.collapse').on('shown.bs.collapse', function () {
            $(this).parent('.card').addClass('active-acc');
        });
        $('.collapse').on('hidden.bs.collapse', function () {
            $(this).parent('.card').removeClass('active-acc');
        });
        setTimeout(function () {
            var $bgSection = $(".bg-section");
            var $bgPattern = $(".bg-pattern");
            var $colBg = $(".col-bg");

            $bgSection.each(function () {
                var bgSrc = $(this).children("img").attr("src");
                var bgUrl = 'url(' + bgSrc + ')';
                $(this).parent().css("backgroundImage", bgUrl);
                $(this).parent().addClass("bg-section");
                $(this).remove();
            });

            $bgPattern.each(function () {
                var bgSrc = $(this).children("img").attr("src");
                var bgUrl = 'url(' + bgSrc + ')';
                $(this).parent().css("backgroundImage", bgUrl);
                $(this).parent().addClass("bg-pattern");
                $(this).remove();
            });

            $colBg.each(function () {
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

            $(".carousel").each(function () {
                var $Carousel = $(this);
                $Carousel.owlCarousel({
                    loop: $Carousel.data('loop'),
                    autoplay: $Carousel.data("autoplay"),
                    autoplayTimeout: $Carousel.data("autoplaytimeout"),
                    autoplayHoverPause: true,
                    margin: $Carousel.data('space'),
                    nav: $Carousel.data('nav'),
                    dots: $Carousel.data('dots'),
                    center: $Carousel.data('center'),
                    dotsSpeed: $Carousel.data('speed'),
                    navText: ["<i class='fa fa-chevron-left'></i><span>Previous</span>", "<span>Next</span><i class='fa fa-chevron-right'></i>"],
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

            $(".custom-carousel").each(function () {
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

            $(".slider-carousel").each(function () {
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
            $('.testimonial-thumbs .testimonial-thumb').click(function () {
                $(this).siblings(".testimonial-thumb").removeClass('active');
                $(this).addClass('active');
                $(".custom-carousel").trigger('to.owl.carousel', [$(this).index(), 300]);
            });



            // Clicking The Custom Nav
            $('.testimonials-holder .custom-navs .next').click(function () {
                $(".custom-carousel").trigger('next.owl.carousel');
            });

            $('.testimonials-holder .custom-navs .prev').click(function () {
                $(".custom-carousel").trigger('prev.owl.carousel');
            });


            // $('.count').counterUp({
            //     delay: 10,
            //     time: 1000
            // });




            var wow = new WOW({
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
    onDashboardClick() {
        let adInstance = this.msalAuthService.instance.getAllAccounts()[0];
        if (adInstance != null && adInstance != undefined && adInstance.username != null && adInstance.username != undefined) {
            let model = new AuthenticateModel();
            model.userNameOrEmailAddress = adInstance.username;
            model.password = AppConsts.message.internalUserPassword;
            this.loginService.login(model).subscribe((logInRes) => {
                this.authService.setLocalStorage(logInRes.result);
                const hrCheck = logInRes.result.roleName.split(",");
                this.isHr = hrCheck.includes('HR Resume Manager')
                if (this.isHr) {
                    this.router.navigate(['/manage-site/hr-menu']);
                  } else{
                      this.router.navigate(['/dashboard']);
                  }
            });
        }

    }

    onGetVccFacilities() {
        this.commonService.getVccFacility().subscribe(res => {
            this.vccList = res.result;            
        })
    }
    onConditionClick() {
        let myDiv = document.getElementById('treatment-conditions');
        myDiv.scrollIntoView();
    }

    onKnowMoreClick() {
        let myDiv = document.getElementById('teamGrid');
        myDiv.scrollIntoView();
    }

    ngOnDestroy(): void {

    }

    onGetPatientLocationData() {
        this.commonService.getLocationPatientCount().subscribe(res => {
            this.patientCount = res.result.patientCount;
            this.locationCount = res.result.locationCount;
        });
    }

    internalUserLogin() {
        this.saveInternalUser();
    }


    private saveInternalUser() {
        let model = new UserDto();
        let adInstance = this.msalAuthService.instance.getAllAccounts()[0];
        model.name = adInstance.name
        model.email = adInstance.username;
        model.id = 0;
        model.firstName = '';
        model.lastName = '';
        model.address = '';
        model.phoneNumber = '';
        model.userId = 0;
        model.password = '';
        model.city = '';
        model.zipCode = '';
        model.corporationId = 0;
        model.facilityids = '';
        model.status = 0;
        model.selectedRoleId = '';
        model.userRolename = '';
        model.state = '';
        model.designation = '';
        model.userType = 1;
        this.commonService.saveInternalUser(model).subscribe(res => {
            if (res.result) {
                let model = new AuthenticateModel();
                model.userNameOrEmailAddress = adInstance.username;
                model.password = AppConsts.message.internalUserPassword;
                this.loginService.login(model).subscribe((logInRes) => {
                    this.authService.setLocalStorage(logInRes.result);
                    const hrCheck = logInRes.result.roleName.split(",");
                    this.isHr = hrCheck.includes('HR Resume Manager')
                    if (this.isHr) {
                        // this.sharedDataService.setClientPortalHide(true);
                        this.router.navigate(['/manage-site/hr-menu']);
    
                      } else{
    
                          this.router.navigate(['/dashboard']);
                      }
                })
            }

        })
    }

    onRequestConsultation() {
        let myDiv = document.getElementById('contact');
        myDiv.scrollIntoView();
    }

    showLocationMap(item) {
        this.showMap = true;
        let address: any = item.address;
        let url = "https://maps.google.com/maps?q=" + address + "&output=embed";
        this.mapUrl = this.safePipe.transform(url, 'resourceUrl');
    }

    // save() {
    //     this.submittedError = false;
    //     if (!this.contactForm || !this.contactForm.valid) {
    //         this.submittedError = true;
    //         return;
    //     }
    // }

}
