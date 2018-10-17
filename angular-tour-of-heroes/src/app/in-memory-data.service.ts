import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { 'id': 11, name: 'Iron Man' },
      { 'id': 12, name: 'Captain America' },
      { 'id': 13, name: 'Hulk' },
      { 'id': 14, name: 'Narco' },
      { 'id': 15, name: 'Directory Fury' },
      { 'id': 16, name: 'SHIELD' },
      { 'id': 17, name: 'Flash' },
      { 'id': 18, name: 'JARVIS' },
      { 'id': 19, name: 'Thor' },
      { 'id': 20, name: 'Loki' },
      { 'id': 21, name: 'Dr. Banners' },
      { 'id': 22, name: 'Iron Fist' },
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
