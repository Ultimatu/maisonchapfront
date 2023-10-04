import {Component, OnInit} from '@angular/core';
import {INewUser} from "../../entities/user/user";
import {AccountService} from "../../services/auth/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{


  isLoading = false;
  registerError = false;
  newUser: INewUser = new INewUser();
  role: string = '';
  ErrorMessage = '';

  registerForm = new FormGroup({
    nom: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    prenom: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    adresse: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),


  });

  constructor(private accountService: AccountService, private activatedRoute: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.role = this.activatedRoute.snapshot.params['role'];
    if (this.role === 'owner') {
      this.newUser.role = "FREE_PROPRIO";
    }
    else if (this.role === 'researcher') {
      this.newUser.role = "FREE_USER";
    }
    else if (this.role === 'promoteur') {
      this.newUser.role = "FREE_PROPRIO";
    }
    else  {
      this.router.navigate(['/']);
    }

  }

  validatePasswordConfirmation() {
    const password = <string>this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    const pattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');

    if (password.length < 8  || !pattern.test(password)) {
      this.registerForm.get('password')?.setErrors({ invalid: true });
    }
    else if (password === confirmPassword) {
      this.registerForm.get('confirmPassword')?.setErrors(null);
    } else {
      this.registerForm.get('confirmPassword')?.setErrors({ mismatch: true });
    }
  }

    validateInput(input: string) {
      //if input is phone
      if (input === 'phone') {
        const phone = <string>this.registerForm.get('phone')?.value;
        const pattern = new RegExp('^[0-9]{8,10}$');
        if (phone.length <8 || !pattern.test(phone) || phone.length > 12) {
          this.registerForm.get('phone')?.setErrors({ invalid: true });
        }
        else {
          this.registerForm.get('phone')?.setErrors(null);
        }
      }
      const control = this.registerForm.get(input);
      return control?.invalid && (control?.touched || control?.dirty || control?.hasError('required'));
    }




  register(): void {
    this.isLoading = true;
    this.newUser.nom = this.registerForm.get('nom')?.value;
    this.newUser.prenom = this.registerForm.get('prenom')?.value;
    this.newUser.email = this.registerForm.get('email')?.value;
    this.newUser.phone = this.registerForm.get('phone')?.value;
    this.newUser.adresse = this.registerForm.get('adresse')?.value;
    this.newUser.password = this.registerForm.get('password')?.value;
    console.log(this.newUser);
    if (this.newUser.password !== this.registerForm.get('confirmPassword')?.value) {
      this.registerError = true;
      this.isLoading = false;
      return;
    }
    else {
      console.log(this.newUser);
      this.makeRegister();
    }


  }

  makeRegister(): void {
    this.accountService.save(this.newUser).subscribe({
      next: () => {
        this.registerError = false;
        this.accountService.setMailSent(true);
        this.accountService.storeMailPending(this.newUser.email)
        this.router.navigate(['account/activation']).then((r) => console.log(r));
      },
      error: (err) => {
        this.isLoading = false;
        this.registerError = true;
        if (err && err.error.message) {
          this.ErrorMessage = err.error.message;
        }
        else if (err && err.status == 400) {
          this.ErrorMessage = 'Verifier les champs';
        }
        else {
          this.ErrorMessage = 'Une erreur est survenue';
        }
        console.log(err);
      }
    });
  }

  protected readonly Error = Error;
}
