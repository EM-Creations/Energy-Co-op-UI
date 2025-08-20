import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {GenerationMixResponse} from '../model/GenerationMixResponse';

@Injectable({
  providedIn: 'root'
})
export class EnergyMixService {
  http = inject(HttpClient);

  private readonly baseURL: string;

  constructor() {
    this.baseURL = environment.api.energyMixURL;
  }

  getCurrentGenerationMix(): Observable<GenerationMixResponse> {
    return this.http.get<GenerationMixResponse>(`${this.baseURL}/generation`);
  }

}
