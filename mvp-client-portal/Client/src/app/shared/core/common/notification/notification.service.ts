import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  activate: (header?: string, message?: string, ok?: string, cancel?: boolean) => Promise<boolean>;
  activate1: (header?: string, message?: string, ok?: string, cancel?: string, oldValue?: object, newvalue?: object) => Promise<boolean>;
}
