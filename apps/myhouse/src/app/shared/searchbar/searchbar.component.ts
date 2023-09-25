import { Component } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {

  searchCriteria = {
    budget: null ,
    houseType: null,
    status: null,
    zone: ''
  };

  constructor() { }

  search() {
    console.log(this.searchCriteria);
  }
}
