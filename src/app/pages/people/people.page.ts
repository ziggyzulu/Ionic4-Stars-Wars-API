import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {

  people: Observable<any>;

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.people = this.api.getPeople();
    //console.log(this.films);
    this.people.subscribe(data => {
      console.log('my data: ', data);
    });
  }

  openDetails(person) {

    console.log(person);
    let split = person.url.split('/');
    console.log(split);
    let personId = split[split.length - 2];
    console.log(personId);
    this.router.navigateByUrl(`/tabs/people/${personId}`);


    // Both of these would work!
    // But the standard Router is recommended.
    // this.navController.navigateForward(`/tabs/films/42`);
    //this.router.navigateByUrl(`/tabs/films/42`);
  }

  goToPlanets() {
    //this.navController.navigateRoot(`/tabs/planets`)
  }

}
