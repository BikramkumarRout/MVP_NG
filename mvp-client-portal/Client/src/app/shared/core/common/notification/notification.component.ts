import { Component, OnDestroy, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { AppConsts } from '../app-constant';
import { NotificationService } from './notification.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  private defaults = {
    header: AppConsts.message.header_Default_Notification,
    message: AppConsts.message.notification_Default_Message,
    cancelText: AppConsts.message.notification_Default_CancelButton,
    okText: AppConsts.message.notification_Default_OkButton,
    oldvalue: '',
    newValue: ''
  };
  public header: string;
  public message: string;
  public okText: string;
  public cancelText: string;
  public oldvalue: any;
  public newvalue: any;
  public isActive: boolean = false;
  public cancelResponse: (e: any) => any;
  public confirmResponse: (e: any) => any;
  protected focusableList = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  constructor(private modalService: NotificationService) {
    modalService.activate = this.activate.bind(this);
    modalService.activate1 = this.activate1.bind(this);
  }

  /* Display contents and buttons */
  public activate(header = this.defaults.header, message = this.defaults.message, ok = this.defaults.okText, cancel = this.defaults.cancelText) {
    this.header = header;
    this.message = message;
    this.okText = ok;
    if (cancel) {
      this.cancelText = this.defaults.cancelText;
    }
    else {
      this.cancelText = null;
    }
    this.isActive = true;

    let promise = new Promise<boolean>((resolve, reject) => {
      this.cancelResponse = (e: any) => resolve(false);
      this.confirmResponse = (e: any) => resolve(true);
      this.show();
    });

    return promise;
  }

  public activate1(header = this.defaults.header, message = this.defaults.message, ok = this.defaults.okText, cancel = this.defaults.cancelText, oldvalue = this.defaults.oldvalue, newvalue = this.defaults.newValue) {
    this.header = header;
    this.message = message;
    this.okText = ok;
    this.oldvalue = oldvalue;
    this.newvalue = newvalue
    if (cancel) {
      this.cancelText = AppConsts.message.notification_Default_CancelButton;
    }
    else {
      this.cancelText = null;
    }
    this.isActive = true;

    let promise = new Promise<boolean>((resolve, reject) => {
      this.cancelResponse = (e: any) => resolve(false);
      this.confirmResponse = (e: any) => resolve(true);
      this.show();
    });

    return promise;
  }
  ngOnInit() {

  }

  /* Method to show */
  public show() {
    this.isActive = true;
    this.focusFirstFocusableChildPoC('panel1')
  }

  /* Confirm button click */
  public confirmAction(e: any) {
    this.confirmResponse(e);
    this.hideDialog();
  }

  /* Cancel button click */
  public cancelAction(e: any) {
    this.cancelResponse(e);
    this.hideDialog();
  }

  /* Method to hide modal */
  public hideDialog() {
    this.isActive = false;
  }

  public keyDetails(event) {
    if (event == AppConsts.defaultTabId.ESCKey) {
      this.hideDialog()
    }
  }

  public focusFirstFocusableChildPoC = (id: string): void => {
    setTimeout(() => {
      const contentPane = document.getElementById(id);

      if (contentPane) {
        //  alert(contentPane)
        const focusableElements = contentPane.querySelectorAll(this.focusableList),
          firstFocusable = <HTMLElement>focusableElements[0];

        window.setTimeout(function () {
          // Kick this to the back of the line with the 'ol 0 timeout trick.
          firstFocusable ? firstFocusable.focus() : this.notifyOfFailure();
        }, 0);
      } else {
        this.notifyOfFailure();
      }

    }, 500)


  }

  private notifyOfFailure = (): void => {
    //  alert('NO FOCUS FOR YOU!');
  }
}
