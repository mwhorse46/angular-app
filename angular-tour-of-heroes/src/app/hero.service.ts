import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

	getHeroes(): Observable<Hero[]> {
		// TODO: send the message __after__ fetching the heroes
		this.messageService.add('HeroService: fetched heroes');
		return of(HEROES);
	}

	getHero(id: number): Observable<Hero> {
		// TODO: send the message __after__ fetching the hero
		this.messageService.add(`HeroService: fetched hero id = ${id}`);
		return of(HEROES.find(hero => hero.id === id));
	}

  constructor(private messageService: MessageService) { }
}
