import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { Observable, } from 'rxjs';
import { Expense } from './expenses';

@Injectable({
  providedIn: 'root'
})
export class ExpensesCacheService {
  readonly CACHE_DURATION_IN_MINUTES = 5;

  private cache: {
    expires: Date,
    value: Observable<Expense[]>
  } |null = null;

  constructor() { }

  getValue(): Observable<Expense[]>|null {
    if (!this.cache) {
      return null;
    }

    if (dayjs(new Date()).isAfter(this.cache.expires)) {
      return null;
    }

    return this.cache.value;
  }

  setValue(value: Observable<Expense[]>) {
    this.cache = {
      value,
      expires: dayjs(new Date()).add(this.CACHE_DURATION_IN_MINUTES, 'minutes').toDate()
    };

  }

  clearCache() {
    this.cache = null;
  }
}

// import {Observable} from 'rxjs';
// import hash from 'hash-it';
// import * as dayjs from 'dayjs';

// export abstract class AbstractCacheService<T> {

//   readonly CACHE_DURATION_IN_MINUTES = 5;
//   readonly DEFAULT_KEY = 'DEFAULT';

//   private cache: {
//     [id: string]: {
//       expires: Date,
//       value: Observable<T>
//     }
//   } = {};


//   getValue(object?: any): Observable<T> {
//     const key = object ? hash(object).toString() : this.DEFAULT_KEY;
//     const item = this.cache[key];
//     if (!item) {
//       return null;
//     }

//     if (dayjs(new Date()).isAfter(item.expires)) {
//       return null;
//     }

//     return item.value;
//   }

//   setValue(value: Observable<T>, object?: any) {
//     const key = object ? hash(object).toString() : this.DEFAULT_KEY;
//     const expires = dayjs(new Date())
//       .add(this.CACHE_DURATION_IN_MINUTES, 'minutes')
//       .toDate();
//     this.cache[key] = {expires, value};
//   }

//   clearCache() {
//     this.cache = null;
//   }
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class UsersCacheService extends AbstractCacheService<User[]> {
// }