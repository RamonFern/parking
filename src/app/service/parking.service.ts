import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParkingResponse } from 'src/response/parking-response';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

constructor(private http: HttpClient) { }

listar() {
  return this.http.get<ParkingResponse[]>('http://localhost:8080/parada');
}

}
