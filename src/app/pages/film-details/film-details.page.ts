import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FavoriteService } from '../../services/favourite.service';


@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.page.html',
  styleUrls: ['./film-details.page.scss'],
})
export class FilmDetailsPage implements OnInit {

  film: any;
  isFavorite = false;
  filmId = null;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService,
              private emailComposer: EmailComposer, private favoriteService: FavoriteService) { }

  ngOnInit() {

    // Get the ID paramater from the curently activated route

    this.filmId = this.activatedRoute.snapshot.paramMap.get('id');

    // Retrieve the information fro th api service by passing it the ID

    this.api.getFilm(this.filmId).subscribe(res => {
      this.film = res;
    });

    // When the page loads, check if the film is already a favourite or not
    // and set the isFavourite boolean accordingly.

    this.favoriteService.isFavorite(this.filmId).then(isFav => {
      this.isFavorite = isFav;
    });

  }

  // Call the function to favourite a film in the service.
  // The function in the service returns a promise, so using the then()
  // hander we can now set the isFavourite boolean to true.

  favoriteFilm() {
    this.favoriteService.favoriteFilm(this.filmId).then(() => {
      this.isFavorite = true;
    });
  }

  // Same process as favouriting a film,
  // but now we set the isFavourite boolean to false

  unfavoriteFilm() {
    this.favoriteService.unfavoriteFilm(this.filmId).then(() => {
      this.isFavorite = false;
    });
  }

  // Compose an email and open the phone's native email client

  shareFilm() {

    let email = {
      to: 'coolemailaddress@email.com',
      subject: 'I love this one: ' + this.film.title,
      body: 'Wanna watch this next weekend?<br><br>\"' + this.film.opening_crawl + '\"',
      isHtml: true
    };

    this.emailComposer.open(email);
  }


}
