import { Injectable } from '@angular/core';
import { allBooks, allReaders } from '../data';
import { Reader } from '../models/reader';
import { Book } from '../models/book';
import {
  HttpClient,
  HttpContext,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { OldBook } from '../models/oldBook';
import { BookTrackerError } from '../models/book-tracker-error';
import { CONTENT_TYPE } from './Interceptors/content-interceptor';
import { CACHEABLE } from './Interceptors/cache-interceptor';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private _http: HttpClient) {}

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Observable<Reader[] | BookTrackerError> {
    return this._http
      .get<Reader[]>('/api/readers', {
        context: new HttpContext()
        .set(CONTENT_TYPE, 'application/jsonPatch')
        .set(CACHEABLE ,false),
      })
      .pipe(catchError((err: HttpErrorResponse) => this.handleHttpError(err)));
  }

  getReaderById(id: number): Reader {
    return allReaders.find((reader) => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[] | BookTrackerError> {
    return this._http
      .get<Book[]>('/api/books')
      .pipe(catchError((err) => this.handleHttpError(err)));
  }

  handleHttpError(err: HttpErrorResponse): Observable<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = Date.now();
    dataError.message = err.statusText;
    dataError.friendlyMessage = err.message;
    return throwError(dataError);
  }

  getBookById(id: number): Observable<Book> {
    let getHeaders: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'my-token',
    });

    return this._http.get<Book>(`/api/books/${id}`, { headers: getHeaders });
  }

  getOldBookById(id: number): Observable<OldBook> {
    return this._http.get<Book>(`/api/books/${id}`).pipe(
      map(
        (a) => <OldBook>{ bookTitle: a.title, publishedYear: a.publicationYear }
      ),
      tap((book) => console.log(book)) // for completion of observable
    );
  }

  addBook(book: Book): Observable<OldBook> {
    return this._http
      .post<Book>('/api/books', book, {
        headers: new HttpHeaders({
          Accept: 'application/json',
          Authorization: 'my-token',
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        map(
          (a) =>
            <OldBook>{ bookTitle: a.title, publishedYear: a.publicationYear }
        ),
        tap((a) => console.log('posted book title' + a.bookTitle))
      );
  }

  updateBook(book: Book): Observable<void> {
    return this._http.put<void>(`/api/books/${book.bookID}`, book, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'my-token',
        'Content-Type': 'application/json',
      }),
    });
  }

  deleteBook(id: number): Observable<void> {
    return this._http.delete<void>(`/api/books/${id}`);
  }
}
