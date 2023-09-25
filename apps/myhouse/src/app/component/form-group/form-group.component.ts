import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css'],
})
export class FormGroupComponent {
  @Input() name = '';
  @Input() label = '';
  @Input() value = '';
  @Input() placeholder = '';
  @Input() required = true;
  @Input() icon = '';
  @Input() type = '';

  formControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();


  constructor() {}

  ngOnInit(): void {}

  getErrorMessage() {
    if (this.formControl.hasError('required')) {
      return 'Le champ ' + this.label + ' est obligatoire';
    }

    return this.formControl.hasError('email') ? 'Email invalide' : '';


  }
}
