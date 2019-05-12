import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@/services/loading.service';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  private loadingService: LoadingService;

  public status: boolean = false;

  constructor(loadingService: LoadingService) {
    this.loadingService = loadingService;
  }

  ngOnInit() {
    this.loadingService.loadingObservable.subscribe((value: boolean) => {
      this.status = value;
    });
  }
}
