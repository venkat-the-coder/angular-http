import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { Book } from '../models/book';
import { BookTrackerError } from '../models/book-tracker-error';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class BooksResolverService
  implements Resolve<Book[] | BookTrackerError>
{
  constructor(private dataService: DataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | BookTrackerError
    | Book[]
    | Observable<BookTrackerError | Book[]>
    | Promise<BookTrackerError | Book[]> {
    return this.dataService
      .getAllBooks()
      .pipe(catchError((err: BookTrackerError) => of(err))); //it will be auto subscribed here
  }
}
