import { take } from 'rxjs';
import { ParkingService } from 'src/app/service/parking.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParkingResponse } from 'src/response/parking-response';
import { DialogReturn } from 'src/app/components/dialog-return';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  parking!: ParkingResponse;
  valor!: number;

  constructor(
              @Inject(MAT_DIALOG_DATA) public data: ParkingResponse,
              public dialogRef: MatDialogRef<CheckoutComponent>,
              private parkingService: ParkingService ) { }


  ngOnInit() {
    this.parking = this.data;
    // console.log(this.parking);
    if(this.parking) {
      this.buscarParcial(this.data.id);
    }
  }

  buscarParcial(id: number) {
    this.parkingService
        .buscarParcial(id)
        .pipe(take(1))
        .subscribe((data) => {
          this.parking = data;
          console.log(data);
          const dialogReturn: DialogReturn = { hasDataChanged: true };
          // this.dialogRef.close(dialogReturn);
        })

  }

}
