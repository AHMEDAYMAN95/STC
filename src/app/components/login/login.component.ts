import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/userModel';


@Component({
  selector: 'stc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title = 'STC Store | Login';
  user: User = new User();
  loginForm: FormGroup;
  showError: boolean = false;
  message: string;
  submitted = false;
  currentLanguage: any;
  errorMessage: string;
  roles = [
    { username: 'user', password: 'user', },
    { username: 'admin', password: 'admin' },
  ];

  constructor(private formBuilder: FormBuilder, private rout: Router, public translate: TranslateService, private titleService: Title) {
    this.titleService.setTitle(this.title);
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.currentLanguage = localStorage.getItem('currentLanguage');
  }

  changeCurrentLanguage(language) {
    this.translate.use(language);
  }

  onSubmit() {
    // Validate the credentials here
    localStorage.clear()
    if (this.user.userName === 'user' && this.user.password === 'user') {
      localStorage.setItem('username', 'user')
      this.rout.navigate(['/stc-home']);
    } else if (this.user.userName === 'admin' && this.user.password === 'admin') {
      localStorage.setItem('username', 'admin')
      this.rout.navigate(['/stc-home']);
    } else {
      // Show an error message for invalid credentials
      this.showError = true;
      this.errorMessage;
    }
  }

}
