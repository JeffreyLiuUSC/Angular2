import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { of, Observable } from 'rxjs';
import { delay } from "rxjs/operators";

import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root' 
})
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService:ProcessHTTPMsgService) { };

  // getDishes():Promise<Dish[]>{
  //   return Promise.resolve(DISHES);
  // };

  // getDish(id: string):Promise<Dish>{
  //   return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  // }

  // getFeaturedDish():Promise<Dish>{
  //   return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  // }

  // getDishes():Promise<Dish[]>{
  //   return new Promise(resolve => {
  //     //Simulate server latency with 2 seconds delay
  //     setTimeout(() => resolve(DISHES),2000);
  //   });
  // };

  // getDish(id: string):Promise<Dish>{
  //   return new Promise(resolve => {
  //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]),2000);
  // });
  // }

  // getFeaturedDish():Promise<Dish>{
  //   return new Promise(resolve => {
  //     setTimeout(() =>resolve(DISHES.filter((dish) => dish.featured)[0]),2000);
  //   });
  // }

  // getDishes():Observable<Dish[]>{
  //   return of(DISHES).pipe(delay(2000));
  // };

  // getDish(id: string):Observable<Dish>{
  //   return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  // }

  // getFeaturedDish():Observable<Dish>{
  //   return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  
  // }
  
  // getDishIds():Observable<string[] |any>{
  //   return of(DISHES.map(dish=>dish.id));
  // }

  getDishes():Observable<Dish[]>{
    return this.http.get<Dish[]>(BaseURL + 'dishes')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  };

  getDish(id: number):Observable<Dish>{
    return this.http.get<Dish>(BaseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish():Observable<Dish>{
    return this.http.get<Dish[]>(BaseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
  getDishIds():Observable<string[] |any>{
    return this.getDishes().pipe(map(dishes => dishes.map(dish=>dish.id)))
    .pipe(catchError(error=>error));
  }

  putDish(dish:Dish):Observable<Dish>{
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Dish>(BaseURL+'dishes/'+dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  
}
