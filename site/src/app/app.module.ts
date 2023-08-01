import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { UrlsControlComponent } from './views/urls-control/urls-control.component';
import { UserControlComponent } from './views/user-control/user-control.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './views/navbar/navbar.component';
import { SemRegistroComponent } from './components/sem-registro/sem-registro.component';
import { LoadingService } from './services/loading.service';
import { UrlsControlService } from './services/urls-control/urlsControl.service';
import { SnackBarService } from './services/snackBar.service';

@NgModule({
  declarations: [
    AppComponent,
    UrlsControlComponent,
    HomeComponent,
    UserControlComponent,
    NavbarComponent,
    SemRegistroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    NgbModule,
    MatSnackBarModule
  ],
  providers: [
    LoadingService,
    UrlsControlService,
    SnackBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
