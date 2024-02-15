import { PrijavaService } from './../../services/prijava.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Korisnik } from '../..//model/korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css'],
})
export class PrijavaComponent implements OnInit, OnDestroy {
  brojTelefona: string;
  ime: string;
  prezime: string;

  prijavaNeuspesna: boolean;
  porukaGreske: string;

  private subscription1: Subscription;
  private subscription2: Subscription;

  constructor(private prijavaService: PrijavaService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subscription1 != null) this.subscription1.unsubscribe();
    if (this.subscription2 != null) this.subscription2.unsubscribe();
  }

  korisnikProvera() {
    this.subscription1 = this.prijavaService
      .korisnikProvera(this.brojTelefona)
      .subscribe(
        (korisnik: Korisnik) => {
          sessionStorage.setItem('id', korisnik.identifikacioniBroj);
          if (korisnik.tipKorisnika.includes('zubar'))
            this.router.navigate(['zubar']);
          else this.router.navigate(['pacijent']);
        },
        (error) => {
          if (error.status == 401) {
            this.prijavaNeuspesna = true;
          }
        }
      );
  }

  korisnikUnos() {
    let korisnik: Korisnik = new Korisnik();
    korisnik.identifikacioniBroj = this.brojTelefona;
    korisnik.ime = this.ime;
    korisnik.prezime = this.prezime;

    this.subscription1 = this.prijavaService.korisnikUnos(korisnik).subscribe(
      (res: string) => {
        sessionStorage.setItem('id', korisnik.identifikacioniBroj);
        this.router.navigate(['pacijent']);
      },
      (error) => {
        this.porukaGreske = error.error.message;
      }
    );
  }
}
