import { PrijavaGuardService } from './services/prijava-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrijavaComponent } from './components/prijava/prijava.component';
import { ZubarComponent } from './components/zubar/zubar.component';
import { PacijentComponent } from './components/pacijent/pacijent.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PrijavaComponent,
    ZubarComponent,
    PacijentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [PrijavaGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
