import { AbstractControl } from "@angular/forms";

export function emailValidator (control: AbstractControl): {[key:string]: any} | null {
    const valid = /(\S+@\S+)|()/.test(control.value);
    return valid ? null : { 'value' : { value : true}};
}

export function passwordSpecialValidator ( control: AbstractControl): {[key:string]: any} | null {
    var valid = true;
    if( /(?=[!|@|#|$|%|^|&|*|(|)|_|+||{|}|:|"|<|>|?|~|`|\||,|.|\/|;|'|[|\]])/.test(control.value)) {
        valid = false;
    }
    return valid ? null : { 'valueSpecial': {value: true}};
}
export function passwordUpperCaseValidator ( control: AbstractControl): {[key:string]: any} | null {
    var valid = false;
    if(/(?=[A-Z])/.test(control.value)) {
        valid = true;
    }
    return valid ? null : { 'valueUpper': {value: true}};
}
export function passwordLowerCaseValidator ( control: AbstractControl): {[key:string]: any} | null {
    var valid = false;
    if( /(?=[a-z])/.test(control.value)) {
        valid = true;
    }
    return valid ? null : { 'valueLower': {value: true}};
}
export function passwordNumberValidator ( control: AbstractControl): {[key:string]: any} | null {
    var valid = false;
    if(/(?=[0-9])/.test(control.value)) {
        valid = true;
    }
    return valid ? null : { 'valueNumber': {value: true}};
}