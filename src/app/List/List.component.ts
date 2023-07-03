import { Component, OnInit } from '@angular/core';
import { ParkingResponse } from 'src/response/parking-response';
import { ParkingService } from '../service/parking.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-List',
  templateUrl: './List.component.html',
  styleUrls: ['./List.component.css']
})
export class ListComponent implements OnInit {

  parkings: ParkingResponse[] = [];

  constructor(private parkingService: ParkingService) { }

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos() {
    this.parkingService.listar()
        .pipe(take(1))
        .subscribe((a) => {
          this.parkings = a;
          // console.log(a);
        })
  }

}
