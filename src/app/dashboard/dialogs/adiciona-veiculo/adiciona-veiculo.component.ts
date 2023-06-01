import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { DialogReturn } from 'src/app/components/dialog-return';
import { ParkingService } from 'src/app/service/parking.service';
import { ParkingRequest } from 'src/request/parking-request';

@Component({
  selector: 'app-adiciona-veiculo',
  templateUrl: './adiciona-veiculo.component.html',
  styleUrls: ['./adiciona-veiculo.component.css'],
})
export class AdicionaVeiculoComponent implements OnInit {

  form = new FormGroup({
    placa: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    cor: new FormControl('', Validators.required)
  });

  constructor(
              private notification: MatSnackBar,
              private parkingService: ParkingService,
              public dialogRef: MatDialogRef<AdicionaVeiculoComponent>,) { }

  ngOnInit() {
  }

  criar() {
    if(!this.form.valid) {
      this.notification.open('Preencha todos os campos.', 'Aviso', { duration: 3000 });
    } else {
      const request = <ParkingRequest> {
        placa: this.form.controls['placa'].value,
        estado: this.form.controls['estado'].value,
        modelo: this.form.controls['modelo'].value,
        cor: this.form.controls['cor'].value,
      }

      this.parkingService.criar(request)
          .pipe(take(1))
          .subscribe((data) => {
            console.log(data);
            const dialogReturn: DialogReturn = { hasDataChanged: true };
            this.dialogRef.close(dialogReturn);
            this.notification.open('Veiculo Cadastrado', 'Sucesso', { duration: 3000 });
          })
    }

  }

}
