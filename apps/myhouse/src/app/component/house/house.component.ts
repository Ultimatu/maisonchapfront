import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import {House} from "../../services/model/models";

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {
  layout: "grid" = "grid";
  houses: House[] = [];
  newHouseList: House[] = [];
  baseUrl = 'http://localhost:8080/down/';
  responsiveOptions: any;
  loading: boolean = true;



  constructor(private productServiceService: ProductServiceService) {}

  ngOnInit(): void {
    this.getAllProducts();


    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  getAllProducts() {
    this.productServiceService.getAllProducts().subscribe(data => {
      this.houses = data;
      for (let house of this.houses) {
        for (let photo of house.photos) {
          photo.url = this.baseUrl + photo.url;
        }
      }
      console.log(this.houses);
      this.loading = false;
    });
  }

  getAllRentingProducts() {
    this.productServiceService.getAllRentingProducts().subscribe(data => {
      console.log(this.houses);
      for (let house of this.houses) {
        for (let photo of house.photos) {
          photo.url = this.baseUrl + photo.url;
        }
      }

    });
  }

  getAllSellingProducts() {
    this.productServiceService.getAllSellingProducts().subscribe(data => {
      this.houses = data;
      for (let house of this.houses) {
        for (let photo of house.photos) {
          photo.url = this.baseUrl + photo.url;
        }

      }

      console.log(this.houses);



    });
  }

  getSeverity(house: House): string {
    if (house.disponibility && house.statusHouse.status == 'En vente') {
      return 'success';
    }else if (house.disponibility && house.statusHouse.status == 'En location') {
      return 'warning';
    }
    else if (!house.disponibility) {
      return 'danger';
    } else {
      return 'info';
    }
  }


  getTypes(house: House): string {
    if (house.typeHouse.type != null) {
      return house.typeHouse.type;
    } else {
      return 'No type';
    }
  }

}
