import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ParkingService } from '../service/parking.service';
import { ParkingResponse } from 'src/response/parking-response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  parkings: ParkingResponse[] = [];

  constructor(private parkingService: ParkingService) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    this.parkingService.listar()
        .pipe(take(1))
        .subscribe((a) => {
          this.parkings = a;
          console.log(a);
        })
  }

}
