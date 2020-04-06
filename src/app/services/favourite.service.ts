import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'favoriteFilms';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private storage: Storage) { }

  // Retrieve all items from storage
  // storage.get() returns a promise
  // So this function can be handled with then()

  getAllFavoriteFilms() {
    return this.storage.get(STORAGE_KEY);
  }

  // retrieve the storage and check if
  // the ket can be found inside.

  isFavorite(filmId) {
    return this.getAllFavoriteFilms().then(result => {
      return result && result.indexOf(filmId) !== -1;
    });
  }

  // To favourite a film retrieve all the films already inside the storage
  // and then add the film.
  // If nothing is there, set a completely new object.

  favoriteFilm(filmId) {
    return this.getAllFavoriteFilms().then(result => {
      if (result) {
        result.push(filmId);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [filmId]);
      }
    });
  }

  // To remove, you retrieve everything from storage, get the index of the film
  // then splice the array and save it back in storage.

  unfavoriteFilm(filmId) {
    return this.getAllFavoriteFilms().then(result => {
      if (result) {
        let index = result.indexOf(filmId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }

}
