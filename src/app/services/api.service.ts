
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getFilms() {
    return this.http.get('https://swapi.co/api/films');
  }

  getPeople(){
    return this.http.get('https://swapi.co/api/people');
  }

  getPlanets(){
    return this.http.get('https://swapi.co/api/planets');
  }

  getFilm(id) {

    // Remember- HTTP calls return an observable
    // So we can subscribe when we make these calls from elsewhere

    return this.http.get(`https://swapi.co/api/films/${id}`);
  }

  getPerson(id) {

    return this.http.get(`https://swapi.co/api/people/${id}`);
  }

  getPlanet(id) {

    return this.http.get(`https://swapi.co/api/planets/${id}`);
  }
}