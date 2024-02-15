import { Termin } from '../../model/termin';
import { Subscription } from 'rxjs';
import { PacijentService } from './../../services/pacijent.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Korisnik } from '../..//model/korisnik';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css'],
})
export class PacijentComponent implements OnInit, OnDestroy {
  termini: Array<Termin>;

  noviTermin: Termin;
  izabranDatum: string;
  izabranoVreme: string;
  opis: string;

  porukaOtkazivanjeTermina: string;
  porukaUnosTermina: string;

  private subscription1: Subscription;
  private subscription2: Subscription;

  constructor(private pacijentService: PacijentService) {}

  ngOnInit(): void {
    this.noviTermin = new Termin();
    this.noviTermin.korisnik = new Korisnik();

    this.subscription1 = this.pacijentService
      .pregledNeisteklihTerminaPacijent()
      .subscribe((res: Array<Termin>) => {
        this.termini = res;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription1 != null) this.subscription1.unsubscribe();
    if (this.subscription2 != null) this.subscription2.unsubscribe();
  }

  otkazivanjeTermina(datum: Date) {
    this.subscription2 = this.pacijentService
      .otkazivanjeTermina(datum)
      .subscribe(
        (res: string) => {},
        (error) => {
          this.porukaOtkazivanjeTermina = error.error;
        }
      );
  }

  zakazivanjeTermina() {
    this.noviTermin.termin = new Date(
      this.izabranDatum + ' ' + this.izabranoVreme
    );

    this.subscription2 = this.pacijentService
      .zakazivanjeTermina(this.noviTermin)
      .subscribe(
        (res: string) => {},
        (error) => {
          this.porukaUnosTermina = error.error;
        }
      );
  }
}
