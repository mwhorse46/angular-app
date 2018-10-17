import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

	getHeroes(): Observable<Hero[]> {
		// TODO: send the message __after__ fetching the heroes
		// this.messageService.add('HeroService: fetched heroes');
		// return of(HEROES);
		return this.http.get<Hero[]>(this.heroesUrl)
			.pipe(
				tap(heroes => this.log('Fetched heroes')),	// <- uses log which send message
				catchError(this.handleError('getHeroes', []))
			)
	}

	getHero(id: number): Observable<Hero> {
		// TODO: send the message __after__ fetching the hero
		// this.messageService.add(`HeroService: fetched hero id = ${id}`);
		// return of(HEROES.find(hero => hero.id === id));

		// send data using http
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get<Hero>(url)
			.pipe(
				tap(_ => this.log(`fetched hero id:${id}`)),
				catchError(this.handleError<Hero>('getHero id=${id}'))
			)
	}

	    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
     
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
     
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
     
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
		this.messageService.add(`HeroService: ${message}`);
	}

	private heroesUrl = 'api/heroes';	// URL to web api

	constructor(
		private messageService: MessageService,
		private http: HttpClient
	) { }
}
