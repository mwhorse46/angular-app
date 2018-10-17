import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

	getHeroes(): Observable<Hero[]> {
		// TODO: send the message __after__ fetching the heroes
		this.messageService.add('HeroService: fetched heroes');
		// return of(HEROES);
		return this.http.get<Hero[]>(this.heroesUrl);
	}

	getHero(id: number): Observable<Hero> {
		// TODO: send the message __after__ fetching the hero
		this.messageService.add(`HeroService: fetched hero id = ${id}`);
		return of(HEROES.find(hero => hero.id === id));
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
