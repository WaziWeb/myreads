import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";
import BookSearch from "./BookSearch";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    booksOnShelves: [],
  };

  //Get the books that are on shelves
  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        booksOnShelves: books,
      }));
    });
  }

  //When the component mounts get all the books that are assigned to a bookshelf
  //for this instance of the App
  componentDidMount() {
    this.getAllBooks();
  }

  //Add a book to a shelf from the search screen
  handleChangeBook = (books) => {
    this.setState(() => ({
      booksOnShelves: books,
    }));
  };

  //Update the book shelf when it changes on a book
  updateBookShelf = (shelf, bookId) => {
    const workingBooks = [...this.state.booksOnShelves];
    const bookToUpdate = workingBooks.findIndex((book) => book.id === bookId);
    workingBooks[bookToUpdate].shelf = shelf;
    this.setState(() => ({
      displayBooks: workingBooks,
    }));
  };

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <BookShelf
                    booksOnShelves={this.state.booksOnShelves}
                    shelfLabel="currentlyReading"
                    shelfDisplayName="Currently Reading"
                    onBookChange={(shelf, bookId) => this.updateBookShelf(shelf, bookId)}
                  />
                  <BookShelf
                    booksOnShelves={this.state.booksOnShelves}
                    shelfLabel="wantToRead"
                    shelfDisplayName="Want To Read"
                    onBookChange={(shelf, bookId) => this.updateBookShelf(shelf, bookId)}
                  />
                  <BookShelf
                    booksOnShelves={this.state.booksOnShelves}
                    shelfLabel="read"
                    shelfDisplayName="Read"
                    onBookChange={(shelf, bookId) => this.updateBookShelf(shelf, bookId)}
                  />
                  <div className="open-search">
                    <Link to="/search" className="open-search-link">
                      Search
                    </Link>
                  </div>
                </div>
              )}
            />
          </div>
          <Route path="/search" render={() => <BookSearch booksOnShelves={this.state.booksOnShelves} updateBooksOnShelves={(book) => this.handleChangeBook(book)} />} />
        </div>
      </div>
    );
  }
}

export default BooksApp;
