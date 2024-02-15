import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Termin } from '../model/termin';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PacijentService {
  constructor(private http: HttpClient) {}

  pregledNeisteklihTerminaPacijent(): Observable<Array<Termin>> {
    let date = new Date();
    let datum =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    let korisnikId: string = sessionStorage.getItem('id');
    let headers = new HttpHeaders();
    headers = headers.append('id', korisnikId);

    return this.http.get<Array<Termin>>(
      environment.apiUrl + '/OrdinacijaREST/pregledNeisteklihTerminaPacijent/',
      { headers }
    );
  }

  zakazivanjeTermina(termin: Termin): Observable<string> {
    let korisnikId: string = sessionStorage.getItem('id');
    termin.korisnik.identifikacioniBroj = korisnikId;
    let headers = new HttpHeaders();
    headers = headers.append('id', korisnikId);
    headers = headers.append('Content-Type', 'application/json');

    const body = JSON.stringify(termin);

    return this.http.post<string>(environment.apiUrl + '/OrdinacijaREST/zakazivanjeTermina', body, {
      headers,
    });
  }

  otkazivanjeTermina(datum: Date): Observable<string> {
    let korisnikId: string = sessionStorage.getItem('id');
    let headers = new HttpHeaders();
    headers = headers.append('id', korisnikId);

    const body = {};

    return this.http.put<string>(
      environment.apiUrl + '/OrdinacijaREST/otkazivanjeTermina/' + datum,
      body,
      { headers }
    );
  }
}
