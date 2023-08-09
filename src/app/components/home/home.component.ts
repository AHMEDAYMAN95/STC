import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'stc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'STC Store | Home';
  constructor(public translate: TranslateService, private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }


}
