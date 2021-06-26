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
   * @description Update the shelf on a book when it changes
   * @param shelf - The shelf to change the book to
   * @param bookId - The id of the book to change
   **/
  updateBookShelf = (shelf, bookChanging) => {
    const workingBooks = [...this.state.booksOnShelves];
    const bookToUpdate = workingBooks.findIndex((book) => book.id === bookChanging.id);
    //If the book is on the shelf update to the new shelf.
    if (bookToUpdate !== -1) {
      workingBooks[bookToUpdate].shelf = shelf;
    }
    //else add the book to the shelf
    else {
      bookChanging.shelf = shelf;
      workingBooks.push(bookChanging);
    }
    //Set the state to the new state
    this.setState(() => ({
      booksOnShelves: workingBooks,
    }));
  };

  render() {
    const shelves = [
      { display: "Currently Reading", label: "currentlyReading" },
      { display: "Want to Read", label: "wantToRead" },
      { display: "Read", label: "read" },
    ];

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
              render={() =>
                shelves.map((shelf, item) => (
                  <div>
                    <BookShelf
                      key={item}
                      booksOnShelves={this.state.booksOnShelves}
                      shelfLabel={shelf.label}
                      shelfDisplayName={shelf.display}
                      onBookChange={(shelf, book) => this.updateBookShelf(shelf, book)}
                    />
                    <div className="open-search">
                      <Link to="/search" className="open-search-link">
                        Search
                      </Link>
                    </div>
                  </div>
                ))
              }
            />
          </div>

          <Route path="/search" render={() => <BookSearch booksOnShelves={this.state.booksOnShelves} onBookChange={(shelf, book) => this.updateBookShelf(shelf, book)} />} />
        </div>
      </div>
    );
  }
}

export default BooksApp;
