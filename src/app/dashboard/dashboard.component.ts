import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { Book } from '../models/book';
import { Reader } from '../models/reader';
import { DataService } from '../core/data.service';
import { BookTrackerError } from '../models/book-tracker-error';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  allBooks!: Book[];
  allReaders!: Reader[];
  mostPopularBook!: Book;

  constructor(
    private dataService: DataService,
    private title: Title,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let resolvedData = this.activatedRoute.snapshot.data['resolvedBooks'];

    if (resolvedData instanceof BookTrackerError) {
      console.log(resolvedData.friendlyMessage);
    } else {
      this.allBooks = resolvedData;
    }

    this.dataService.getAllReaders().subscribe(
      (data: Reader[] | BookTrackerError) => (this.allReaders = <Reader[]>data),
      (err: BookTrackerError) => console.log(err.friendlyMessage)
    );

    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker`);
  }

  deleteBook(bookID: number): void {}

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }
}
