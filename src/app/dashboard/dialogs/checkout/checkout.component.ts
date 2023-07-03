import { take } from 'rxjs';
import { ParkingService } from 'src/app/service/parking.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParkingResponse } from 'src/response/parking-response';
import { DialogReturn } from 'src/app/components/dialog-return';
import * as moment from 'moment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  parking!: ParkingResponse;
  valor!: number;
  saida!: string;
  tempo!: string;

  UMA_HORA = 60;
  VINTE_QUATRO_HORAS = 24 * this.UMA_HORA;
  VALOR_UMA_HORA = 5.00;
  VALOR_ADICIONAL_POR_HORA = 2.00;
  VALOR_DIARIA = 20.00;

  constructor(
              @Inject(MAT_DIALOG_DATA) public data: ParkingResponse,
              public dialogRef: MatDialogRef<CheckoutComponent>,
              private parkingService: ParkingService ) { }

  ngOnInit() {

    if(this.data) {
      this.parking = this.data;
      var dataSaida = moment();
      var minutos = dataSaida.diff(moment(this.parking.dataentrada, "DD/MM/YYYY HH:mm"), "minutes");
      // console.log(minutos);
      this.saida = dataSaida.format("DD/MM/YYYY HH:mm");
      this.tempo = this.tempoDePermanencia(minutos);
      this.valor = this.parcial(minutos);
    }
  }

  checkout(id: number) {
    this.parkingService
        .checkout(id)
        .pipe(take(1))
        .subscribe((data) => {
          this.parking = data;
          // console.log(data);
          const dialogReturn: DialogReturn = { hasDataChanged: true };
          this.dialogRef.close(dialogReturn);
        })
  }

  parcial(minutos: number) {
    var minutos = minutos

    let bill = 0;
    const minutes = minutos;

    if (minutes <= this.UMA_HORA) {
      bill = this.VALOR_UMA_HORA;
      return bill;
    }

    if (minutes <= this.VINTE_QUATRO_HORAS) {
      bill = this.VALOR_UMA_HORA;
      const hours = Math.floor(minutes / this.UMA_HORA);
      for(let i = 0 ; i < hours ; i++){
        bill += this.VALOR_ADICIONAL_POR_HORA;
      }
      return bill;
    }
    const days = Math.floor(minutes / this.VINTE_QUATRO_HORAS);
    for (let i = 0; i < days; i++) {
      bill += this.VALOR_DIARIA;
    }
    return bill;
  }

  tempoDePermanencia(minutos: number) {
  const minutes = minutos;
  if (minutes <= this.UMA_HORA) {
      return `${minutes} min`;
      // return minutes + " min";
  }

  if (minutes <= this.VINTE_QUATRO_HORAS) {
      const hours = Math.floor(minutes / this.UMA_HORA);
      const min = Math.floor(minutes % this.UMA_HORA);
      return `${hours} horas e ${min} min`;
      // return hours + " horas e " + min + " min ";
  }

  const days = Math.floor(minutes / this.VINTE_QUATRO_HORAS);
  const hoursRest = Math.floor(minutes % this.VINTE_QUATRO_HORAS);
  const hours = Math.floor(hoursRest / this.UMA_HORA );

  const minRest = Math.floor(hoursRest % this.UMA_HORA );
  const min = Math.floor(minRest % this.UMA_HORA);
  return `${days} dias ${hours} horas e ${min} min`;
  // return days + " dias " + hours + " horas e " + min + " min ";
  }
}
