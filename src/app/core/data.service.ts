import { Injectable } from '@angular/core';

import { allBooks, allReaders } from '../data';
import { Reader } from '../models/reader';
import { Book } from "../models/book";
import { BookTrackerError } from '../models/book-tracker-error';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { OldBook } from '../models/oldBook';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private _http : HttpClient) { }

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Observable<Reader[]> {
    return this._http.get<Reader[]>('/api/readers');
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
     return this._http.get<Book[]>('/api/books');
  }

  getBookById(id: number): Observable<Book> {
    let getHeaders: HttpHeaders = new HttpHeaders(
      {
        'Accept':'application/json',
        'Authorization':'my-token'
      }
    );

    return  this._http.get<Book>(`/api/books/${id}`,{ headers:getHeaders });
  }  


  getOldBookById(id: number): Observable<OldBook> {
    return  this._http.get<Book>(`/api/books/${id}`).pipe(
      map(a => <OldBook>{bookTitle : a.title , publishedYear:a.publicationYear}),
      tap(book => console.log(book))
    );
  } 
}
