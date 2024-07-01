import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {
  private baseUrl: string = environments.baseUrl;
  constructor(private httpClient: HttpClient) {}

  getHeroes():Observable<Hero[]>{
    const url = `${this.baseUrl}/heroes`
    return this.httpClient.get<Hero[]>(url);
  }

  getHeroById(id: string): Observable<Hero|undefined>{
    const url = `${this.baseUrl}/heroes/${id}`
    return this.httpClient
              .get<Hero>(url)
              .pipe(
                catchError( error => {
                  return of(undefined);
                }));
  }

  getSuggestions(query: string):Observable<Hero[]>{
    if (query.length === 0) return of([]);
    const url = `${this.baseUrl}/heroes?superhero_like=${query}&_limit=6`;
    return this.httpClient.get<Hero[]>(url);
  }

  addHero(hero: Hero): Observable<Hero> {
    const url = `${this.baseUrl}/heroes`
    return this.httpClient.post<Hero>(url, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Hero id is required');
    const url = `${this.baseUrl}/heroes/${hero.id}`
    return this.httpClient.patch<Hero>(url, hero);
  }

  deleteHeroById(id:string): Observable<boolean> {
    const url = `${this.baseUrl}/heroes/${id}`;
    return this.httpClient.delete(url).pipe(
      map(resp => true),
      catchError(err => of(false))
    );
  }
}
