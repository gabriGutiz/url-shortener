import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UrlsControlComponent } from './views/urls-control/urls-control.component';
import { UserControlComponent } from './views/user-control/user-control.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'urls', component: UrlsControlComponent },
  { path: 'usuarios', component: UserControlComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
