import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {SignUpForm} from "../../model/SignUpForm";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
form: any = {};
  emailFormControl = new FormControl('', [
      Validators.email
  ]);
  hide = true;
  signUpForm: SignUpForm;
  status = "Please fill in the form create account!";
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    // @ts-ignore
    this.signUpForm = new SignUpForm (
        this.form.name,
        this.form.username,
        this.form.email,
        this.form.password
    );
    this.authService.signUp(this.signUpForm).subscribe(data => {
      console.log('data-------->',data);
      if (data.message === 'nouser'){
        this.status = "Username existed! Please try again!";
        return;
      }
      if (data.message === 'noemail'){
        this.status = "Email is existed! Please try again!";
      }
      if (data.message === 'yes'){
        this.status = "Create account success!";
        localStorage.setItem('SUCCESS_KEY',this.status);
        this.router.navigate(['login'])

      }
    },error => {
      this.status = "Mail invalid! Please try again!"
    });
  }
}
