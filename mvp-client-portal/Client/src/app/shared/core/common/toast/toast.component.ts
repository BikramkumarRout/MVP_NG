import { Component, OnInit } from '@angular/core';

import { NotifyService } from './toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
    public title: string;
    public message: string ;
    public type: string ;
    public show: boolean = false;

    private toastElement: any;

    constructor(notifyService: NotifyService) {
      notifyService.activate = this.activate.bind(this);
      notifyService.info = this.info.bind(this);
      notifyService.success = this.success.bind(this);
      notifyService.warn = this.warn.bind(this);
      notifyService.error = this.error.bind(this);

    }

    public activate(title, message) {
        this.title = title;
        this.message = message;
        this.type = 'success';
        this.showToast();
  }
  public info(title: any, message: any) {
    this.title = title;
    this.message = message;
    this.type = 'success';
    this.showToast();
  }
  public success(title, message) {
    this.title = title;
    this.message = message;
    this.type = 'success';
    this.showToast();
  }
  public warn(title, message , type) {
    this.title = title;
    this.message = message;
    this.type = 'warning';
    this.showToast();
  }
  public error(title, message , type) {
    this.title = title;
    this.message = message;
    this.type = 'error';
    this.showToast();
}

    ngOnInit() {
        this.toastElement = document.getElementById('toast');
    }

    private showToast() {
         this.show = true;
        setTimeout(() => {
            this.show = false;
        },1500);

    }

    private hide() {
        this.show = false;
    }
}
