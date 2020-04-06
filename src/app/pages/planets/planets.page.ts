import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.page.html',
  styleUrls: ['./planets.page.scss'],
})
export class PlanetsPage implements OnInit {

  planets: Observable<any>;

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.planets = this.api.getPlanets();
    this.planets.subscribe(data => {
      console.log('my data: ', data);
    });
  }

  openDetails(planet) {

    console.log(planet);
    let split = planet.url.split('/');
    console.log(split);
    let planetId = split[split.length - 2];
    console.log(planetId);
    this.router.navigateByUrl(`/tabs/planets/${planetId}`);

  }

}
