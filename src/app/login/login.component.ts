import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/_models/userModel';


@Component({
  selector: 'stc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  loginForm: FormGroup;
  showError: boolean = false;
  message: string;
  submitted = false;
  currentLang: any;
  ERROR_MESSAGE: string;
  buttonLabel: string;
  roles = [
    { role: 'user', username: 'user', password: 'user', },
    { role: 'admin', username: 'admin', password: 'admin' },
    { role: 'manager', username: 'manager', password: 'manager' }
  ];

  constructor(private formBuilder: FormBuilder, private rout: Router, public translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.currentLang = localStorage.getItem('currentLang');
  }

  changeCurrentLanguag(lang) {
    this.translate.use(lang);
  }

  onSubmit() {
    // Validate the credentials here
    localStorage.clear()
    if (this.user.userName === 'user' && this.user.password === 'user') {
      debugger
      localStorage.setItem('role', 'user')
      this.rout.navigate(['']);
    } else if (this.user.userName === 'admin' && this.user.password === 'admin') {
      localStorage.setItem('role', 'admin')
      this.rout.navigate(['']);
     

    } else {
      // Show an error message for invalid credentials
      this.showError = true;
      this.ERROR_MESSAGE;
    }
  }

}
