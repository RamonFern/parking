import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ParkingService } from '../service/parking.service';
import { ParkingResponse } from 'src/response/parking-response';
import { MatDialog } from '@angular/material/dialog';
import { DialogReturn } from '../components/dialog-return';
import { AdicionaVeiculoComponent } from './dialogs/adiciona-veiculo/adiciona-veiculo.component';
import { CheckoutComponent } from './dialogs/checkout/checkout.component';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  parkings: ParkingResponse[] = [];

  constructor(private parkingService: ParkingService, public dialog: MatDialog) { }

  ngOnInit(): void {
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

  crieParking() {
    const dialogRef = this.dialog.open(AdicionaVeiculoComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result: DialogReturn) => {
      if (result?.hasDataChanged) {
        this.listarTodos();
      }
    });
  }

  checkout(item: ParkingResponse) {
    var parking = item
    // console.log(parking)

    const dialogRef = this.dialog.open(CheckoutComponent, {
      width: '550px',
      data: parking,
    });

    dialogRef.afterClosed().subscribe((result: DialogReturn) => {
      if (result?.hasDataChanged) {
        // console.log(result);
        this.listarTodos();
      }
    });
  }

}
