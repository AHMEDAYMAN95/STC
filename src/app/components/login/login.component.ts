import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/guards/auth.service';
import { User } from 'src/app/models/userModel';

const emptyUser: User = { userName: '', password: '', permissions: [] };

@Component({
  selector: 'stc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  title = 'STC Store | Login';
  user: User = emptyUser;
  currentLanguage: any;

  constructor(private rout: Router, public translate: TranslateService, private titleService: Title,
    private authService: AuthService) {
    this.titleService.setTitle(this.title);
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('currentLanguage');
  }

  changeCurrentLanguage(language) {
    this.translate.use(language);
  }

  onSubmit() {
    this.authService.signIn(this.user);
  }

  ngOnDestroy(): void {
    this.user = emptyUser;
  }

}