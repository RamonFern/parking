import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../service/parking.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  urlAvatar!: string;
  currentUser: any;

  searchTxt: any;
  buscasGerais!: any[];
  constructor() { }

  ngOnInit() {
  }


}
