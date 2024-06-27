import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Injectable()
export class FormBuilderService {

    generateFormGroup(elements: any): UntypedFormGroup {
        const group: any = {};
        if (elements != null && elements !== 'undefined') {
            this.formControlForEachElement(elements, group);
        }
        return new UntypedFormGroup(group);
    }

    formControlForEachElement(elements: any, group: any) {
        let elementsList: Array<any> = [];
        elementsList = elements;
        elementsList.forEach(element => {
            if (element) {
                if (element.value !== null && element.value !== ''
                    && element.value !== undefined) {
                    if (element.value) {
                        group[element.value] =
                            new UntypedFormControl(new Date(element.value) || '', Validators.required);
                    } else {
                        group[element.value] = new UntypedFormControl(new Date(element.value)
                            || '');
                    }
                } else {
                    if (element.value) {
                        group[element.value] = new UntypedFormControl(element.value
                            || '', Validators.required);
                    } else {
                        group[element.value] = new UntypedFormControl(element.value
                            || '');
                    }
                }
            } else {
                group[element.value] = (element.value) ?
                    new UntypedFormControl(element.value || '', Validators.required) :
                    new UntypedFormControl(element.value || '');
            }
            // if (element.children.length) {
            //     this.formControlForEachElement(element.children, group);
            // }
        });
    }

    createFormControl(element: any): UntypedFormControl {
        switch (element.value.elementTypeLookUpId) {
            case 25: return new UntypedFormControl(element.value || '', [Validators.required]);
        }
    }
}
