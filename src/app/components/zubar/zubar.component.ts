import { Korisnik } from '../..//model/korisnik';
import { Subscription } from 'rxjs';
import { ZubarService } from './../../services/zubar.service';
import { Component, OnInit } from '@angular/core';
import { Termin } from '../../model/termin';

@Component({
  selector: 'app-zubar',
  templateUrl: './zubar.component.html',
  styleUrls: ['./zubar.component.css'],
})
export class ZubarComponent implements OnInit {
  terminiDan: Array<Termin>;
  terminiNedelja: Array<Array<Termin>>;

  daniUNedelji = [
    'PONEDELJAK',
    'UTORAK',
    'SREDA',
    'CETVRTAK',
    'PETAK',
    'SUBOTA',
    'NEDELJA',
  ];

  prikazDan: boolean;
  prikazNedelja: boolean;
  izabranDan: Date;
  izabranaNedeljaPocetak: Date;
  izabranaNedeljaKraj: Date;
  izabranDanString: string;
  izabranaNedeljaPocetakString: string;
  izabranaNedeljaKrajString: string;

  noviTermin: Termin;
  izabranDatum: string;
  izabranoVreme: string;
  opis: string;

  rokOtkazivanja: number;

  porukaOtkazivanje: string;
  porukaPromenaRoka: string;
  porukaUnosTermina: string;

  private subscription1: Subscription;
  private subscription2: Subscription;

  constructor(private zubarService: ZubarService) {}

  ngOnInit(): void {
    this.noviTermin = new Termin();
    this.noviTermin.korisnik = new Korisnik();

    this.pregledTerminaZubarDan('tekuci');
    this.prikazDan = true;

    this.izabranaNedeljaPocetak = new Date();
    this.izabranaNedeljaPocetak.setDate(
      this.izabranaNedeljaPocetak.getDate() -
        (this.izabranaNedeljaPocetak.getDay() - 1)
    );

    this.izabranaNedeljaKraj = new Date();
    this.izabranaNedeljaKraj.setDate(
      this.izabranaNedeljaKraj.getDate() +
        (7 - this.izabranaNedeljaKraj.getDay())
    );
  }

  ngOnDestroy(): void {
    if (this.subscription1 != null) this.subscription1.unsubscribe();
    if (this.subscription2 != null) this.subscription2.unsubscribe();
  }

  pregledTerminaZubarDan(dan: string) {
    if (dan == 'tekuci') this.izabranDan = new Date();
    if (dan == 'prethodni')
      this.izabranDan.setDate(this.izabranDan.getDate() - 1);
    if (dan == 'naredni')
      this.izabranDan.setDate(this.izabranDan.getDate() + 1);

    this.izabranDanString =
      this.izabranDan.getFullYear() +
      '-' +
      (this.izabranDan.getMonth() + 1) +
      '-' +
      this.izabranDan.getDate();

    this.subscription1 = this.zubarService
      .pregledTerminaZubarDan(this.izabranDanString)
      .subscribe((res: Array<Termin>) => {
        this.terminiDan = res;
        this.prikazDan = true;
        this.prikazNedelja = false;
      });
  }

  pregledTerminaZubarNedelja(nedelja: string) {
    if (nedelja == 'tekuca') this.izabranDan = new Date();
    if (nedelja == 'prethodna') {
      this.izabranaNedeljaPocetak.setDate(
        this.izabranaNedeljaPocetak.getDate() - 7
      );
      this.izabranaNedeljaKraj.setDate(this.izabranaNedeljaKraj.getDate() - 7);
    }
    if (nedelja == 'naredna') {
      this.izabranaNedeljaPocetak.setDate(
        this.izabranaNedeljaPocetak.getDate() + 7
      );
      this.izabranaNedeljaKraj.setDate(this.izabranaNedeljaKraj.getDate() + 7);
    }

    this.izabranaNedeljaPocetakString =
      this.izabranaNedeljaPocetak.getFullYear() +
      '-' +
      (this.izabranaNedeljaPocetak.getMonth() + 1) +
      '-' +
      this.izabranaNedeljaPocetak.getDate();

    this.izabranaNedeljaKrajString =
      this.izabranaNedeljaKraj.getFullYear() +
      '-' +
      (this.izabranaNedeljaKraj.getMonth() + 1) +
      '-' +
      this.izabranaNedeljaKraj.getDate();

    this.subscription2 = this.zubarService
      .pregledTerminaZubarPeriod(
        this.izabranaNedeljaPocetakString,
        this.izabranaNedeljaKrajString
      )
      .subscribe((res: Array<Termin>) => {
        this.razvrstajPoDanima(res);
        this.prikazDan = false;
        this.prikazNedelja = true;
      });
  }

  razvrstajPoDanima(termini: Array<Termin>) {
    this.terminiNedelja = new Array<Array<Termin>>(7);
    for (let i = 1; i < this.terminiNedelja.length; i++) {
      this.terminiNedelja[i] = new Array<Termin>();
    }

    for (let j = 0; j < termini.length; j++) {
      let date: Date = new Date(termini[j].termin);
      this.terminiNedelja[date.getDay()].push(termini[j]);
    }
  }

  otkazivanjeTermina(datum: Date) {
    this.subscription2 = this.zubarService.otkazivanjeTermina(datum).subscribe(
      (res: string) => {
        this.porukaPromenaRoka == undefined;
      },
      (error) => {
        this.porukaOtkazivanje = error.error;
      }
    );
  }

  promeniRokOtkazivanja() {
    if (typeof this.rokOtkazivanja != 'undefined') {
      this.subscription2 = this.zubarService
        .promeniRokOtkazivanja(this.rokOtkazivanja)
        .subscribe(
          (res: string) => {},
          (error) => {
            this.porukaPromenaRoka = error.error;
          }
        );
    }
  }

  zakazivanjeTermina() {
    this.noviTermin.termin = new Date(
      this.izabranDatum + ' ' + this.izabranoVreme
    );

    this.subscription2 = this.zubarService
      .zakazivanjeTermina(this.noviTermin)
      .subscribe(
        (res: string) => {},
        (error) => {
          this.porukaUnosTermina = error.error;
        }
      );
  }
}
