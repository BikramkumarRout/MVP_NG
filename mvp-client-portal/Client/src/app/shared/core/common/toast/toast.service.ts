import { Injectable } from '@angular/core';

@Injectable()
export class NotifyService {
activate: (message?: string, title?: string, type?: string) => void;
info: (message?: string, title?: string, type?: string) => void;
success: (message?: string, title?: string, type?: string) => void;
warn: (message?: string, title?: string, type?: string) => void;
error: (message?: string, title?: string, type?: string) => void;
}
