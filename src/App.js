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

  /**
   * @description gets all the books that are on the users shelf.
   * @param None
   **/
  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        booksOnShelves: books,
      }));
    });
  }

  /**
   * @description When the component mounts get the books to populate the shelves.
   * @param None
   **/
  componentDidMount() {
    this.getAllBooks();
  }

  /**
   * @description Add a book to a shelf from the search screen
   * @param books
   **/
  handleChangeBook = (books) => {
    this.setState(() => ({
      booksOnShelves: books,
    }));
  };

  /**
   * @description Update the shelf on a book when it changes
   * @param shelf - The shelf to change the book to
   * @param bookId - The id of the book to change
   **/
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
