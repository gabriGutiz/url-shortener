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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { UrlsControlComponent } from './views/urls-control/urls-control.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './views/navbar/navbar.component';
import { SemRegistroComponent } from './components/sem-registro/sem-registro.component';
import { LoadingService } from './services/loading.service';
import { UrlsControlService } from './services/urls-control/urlsControl.service';
import { SnackBarService } from './services/snackBar.service';
import { ContaService } from './services/conta.service';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './views/login/login.component';
import { UserControlService } from './services/users-control/userControl.service';
import { EditarUrlDialogComponent } from './views/urls-control/editar-url-dialog/editar-url-dialog.component';
import { CriarUrlDialogComponent } from './views/urls-control/criar-url-dialog/criar-url-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UrlsControlComponent,
    HomeComponent,
    NavbarComponent,
    SemRegistroComponent,
    LoginComponent,
    EditarUrlDialogComponent,
    CriarUrlDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
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
    UserControlService,
    SnackBarService,
    AuthGuard,
    ContaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
