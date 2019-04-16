import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from "../shared/leaders";

import { of, Observable } from 'rxjs';
import { delay } from "rxjs/operators";
import { map, catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(BaseURL + 'leadership').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(BaseURL + 'leadership/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http
      .get<Leader[]>(BaseURL + 'leadership?featured=true')
      .pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));  }

  constructor(
    private http: HttpClient, 
    private processHTTPMsgService: ProcessHTTPMsgService) { }
}
