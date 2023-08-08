import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  constructor(
    public loadingService: LoadingService,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
