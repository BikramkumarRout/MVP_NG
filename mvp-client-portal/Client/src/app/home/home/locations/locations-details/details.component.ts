import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/home/locations/locations.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';

declare var $;
@Component({
    selector: 'locations-details',
    templateUrl: './details.component.html',
})

export class LocationDetailsComponent implements OnInit {

    locations: any;
    public location: any = {};
    showMap: boolean = false;
    mapUrl: any;
    gallery: any;

    constructor(private locationService: LocationService, private route: ActivatedRoute, private router: Router, private safePipe: SafePipe) {


        let curr = decodeURIComponent(this.route.snapshot.paramMap.get('name'));
        this.location.name = '';
        // this.location.phone = '';
        // this.location.fax = '';
        // this.location.workingHour = '';
        // this.location.address = '';
        // this.location.city = '';
        // this.location.state = '';
        // this.location.zip = '';
        this.gallery = ['assets/images/gallery/gallery-img-1.jpg', 'assets/images/gallery/gallery-img-2.jpg', 'assets/images/gallery/gallery-img-3.jpg', 'assets/images/gallery/gallery-img-4.jpg', 'assets/images/gallery/gallery-img-5.jpg'];

        if (typeof curr != 'undefined' && curr != null) {
            this.locationService.getLocations().subscribe(
                response => {
                    let resp: any = response;
                    this.locations = resp.result;
                    //console.log(curr);
                    this.locations.forEach(item => {

                        if (item.name == curr) {
                            this.location = item;
                            this.showMap = true;
                            let vccAddress=  item.address.replace('#','')
                            let url = "https://maps.google.com/maps?q=" + vccAddress + "&output=embed";
                            this.mapUrl = this.safePipe.transform(url, 'resourceUrl');

                        }
                    });
                    //console.log(this.location);
                });


        }
    }

    ngOnInit(): void {

        // To reflect the url change
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';


    }

    ngAfterViewInit(): void {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();

        setTimeout(() => {
            // var $imgPopup = $(".img-popup");
            // console.log("Length" + $(".img-popup").length);
            // $imgPopup.magnificPopup({
            //     type: "image"
            // });
            $('.img-gallery-item').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        }, 2000);
    }

}
