import { Korisnik } from './korisnik';
export class Termin {
  id: number;
  tipPregleda: string;
  status: string;
  trajanje: number;
  termin: Date;
  korisnik: Korisnik;
}
