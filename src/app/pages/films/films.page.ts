import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {

  films: Observable<any>;

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.films = this.api.getFilms();
    //console.log(this.films);
    this.films.subscribe(data => {
      console.log('my data: ', data);
    });
  }

  openDetails(film) {

    console.log(film);
    let split = film.url.split('/');
    console.log(split);
    let filmId = split[split.length - 2];
    console.log(filmId);
    this.router.navigateByUrl(`/tabs/films/${filmId}`);


    // Both of these would work!
    // But the standard Router is recommended.
    // this.navController.navigateForward(`/tabs/films/42`);
    //this.router.navigateByUrl(`/tabs/films/42`);
  }

  goToPlanets() {
    //this.navController.navigateRoot(`/tabs/planets`)
  }

}
