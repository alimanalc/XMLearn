import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-positive',
  templateUrl: './positive.page.html',
  styleUrls: ['./positive.page.scss'],
})
export class PositivePage implements OnInit {
  status = null;
  constructor(
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.status = this.activeRoute.snapshot.paramMap.get('status');
  }

}
