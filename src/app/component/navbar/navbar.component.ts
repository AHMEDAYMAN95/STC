import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'stc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  currentLang: string;

  constructor(private rout: Router, public translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
    this.currentLang = localStorage.getItem('currentLang') || 'en';
    this.translate.use(this.currentLang);
  }

  ngOnInit() {
  }

  changeCurrentLanguag(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('currentLang', lang);
  }

  logOut() {
    localStorage.clear()
    this.rout.navigate(['/login']);
  }

}
