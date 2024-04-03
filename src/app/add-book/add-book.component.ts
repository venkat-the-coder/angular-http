import { Component, OnInit } from '@angular/core';

import { Book } from '../models/book';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styles: [],
})
export class AddBookComponent implements OnInit {
  constructor(private _dataService: DataService) {}

  ngOnInit() {}

  saveBook(formValues: any): void {
    let newBook: Book = <Book>formValues;
    const uuid = require('uuid/v4');
    newBook.bookID = uuid();
    this._dataService.addBook(newBook).subscribe(
      (data) => console.log('book added succesfuly' + data),
      (err: any) => console.log(err)
    );
  }
}
