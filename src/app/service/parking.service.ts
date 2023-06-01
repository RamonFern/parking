import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParkingRequest } from 'src/request/parking-request';
import { ParkingResponse } from 'src/response/parking-response';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

constructor(private http: HttpClient) { }

listar() {
  return this.http.get<ParkingResponse[]>('http://localhost:8080/parada');
}

criar(parking: ParkingRequest) {
  return this.http.post<ParkingResponse>('http://localhost:8080/parada', parking);
}

buscarParcial(id: number) {
  return this.http.post<ParkingResponse>(`http://localhost:8080/parada/${id}`, {});
}

}
