import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from './../../environments/environment';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class PrijavaGuardService implements CanActivate, OnDestroy {
  private subscription1: Subscription;

  constructor(private _router: Router, private http: HttpClient) {}

  ngOnDestroy(): void {
    if (this.subscription1 != null) this.subscription1.unsubscribe();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    let korisnikId: string = sessionStorage.getItem('id');
    let proveraTipaKorisnika: Observable<boolean> = this.proveraTipaKorisnika(
      korisnikId,
      route.url[0]['path']
    );

    this.subscription1 = proveraTipaKorisnika.subscribe((res: boolean) => {
      if (res == false) this._router.navigate(['']);
    });

    return proveraTipaKorisnika;
  }

  proveraTipaKorisnika(id: string, tip: string): Observable<boolean> {
    return this.http.get<boolean>(
      environment.apiUrl + '/OrdinacijaREST/proveraTipaKorisnika/' + id + '/' + tip
    );
  }
}
