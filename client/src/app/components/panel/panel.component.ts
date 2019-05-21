import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  private router: Router;
  private route: ActivatedRoute;


  constructor(router: Router, route: ActivatedRoute) {
  }

  ngOnInit() {
  }

}
