import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  loginForm!: any;
  loginResponse: any;
  loginResult: any;
  submitted = false;
  accessToken: any;
  invalidStatus: any;
  incorrectPassword: any;
  showPasswordError: any = false;
  showEmailError: any = false;
  incorrectEmail: any;
  showLoader: any = false;
  constructor(private spinnerService: NgxSpinnerService, private authservice: AuthService, private formBuilder: FormBuilder, private loginservice: LoginService, private notifyservice: NotifyService, private router: Router) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^\s*\S+@\S+\.\S+\s*$/)
      ]
      ],
      password: ['', [Validators.required]
      ]
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {

    this.submitted = true;
    this.showLoader = true;
    this.spinnerService.show();
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.spinnerService.hide();
      return;
    }

    this.authservice.signIn(this.loginForm.value).subscribe((response) => {
      this.loginResponse = response;
      this.loginResult = JSON.parse(this.loginResponse.result);
      // console.log("login ",this.loginResult)
      this.accessToken = this.loginResult.Token;
      //set the login values into local storage
      localStorage.setItem('has_state', this.loginResult.HasState);
      localStorage.setItem('has_subclient', this.loginResult.HasSubClient);
      localStorage.setItem('client_name', this.loginResult.ClientName);
      localStorage.setItem('client_id', this.loginResult.ClientID);
      localStorage.setItem('access_token', this.accessToken);
      //if the token is present , it is navigated to dashboard and login successfully
      if (this.accessToken) {
        if (this.loginResponse.apiStatus == 0) {
          this.notifyservice.showSuccess("You have logged in successfully", "Hi " + this.loginResult.ClientName + " !");
          this.router.navigate(['/dashboard'])
        }
      }
      this.spinnerService.hide();
    },
      (error) => {
        if (error.status === 400) {
          this.invalidStatus = error.error.result;
          //check whether the password or email is incorrect
          if (this.invalidStatus == 'Incorrect Password') {
            this.incorrectPassword = this.invalidStatus;
            this.showPasswordError = true;
          }
          else {
            this.incorrectEmail = this.invalidStatus;
            this.showEmailError = true;
          }
          this.notifyservice.showError(error.error.apiStatusMessage, error.error.result);
          this.spinnerService.hide();
        }
      }
    )
  }

  //validation check for email and password
  emailChange(e: any) {
    this.showEmailError = false;
  }
  passwordChange(e: any) {
    this.showPasswordError = false;
  }
}
