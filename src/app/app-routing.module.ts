import { PrijavaGuardService } from './services/prijava-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacijentComponent } from './components/pacijent/pacijent.component';
import { PrijavaComponent } from './components/prijava/prijava.component';
import { ZubarComponent } from './components/zubar/zubar.component';

const routes: Routes = [
  { path: '', component: PrijavaComponent },
  {
    path: 'zubar',
    component: ZubarComponent,
    canActivate: [PrijavaGuardService],
  },
  {
    path: 'pacijent',
    component: PacijentComponent,
    canActivate: [PrijavaGuardService],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
