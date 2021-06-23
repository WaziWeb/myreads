import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class BookSearch extends Component {
  static propTypes = {
    booksOnShelves: PropTypes.array.isRequired,
    onBookChange: PropTypes.func,
    updateBooksOnShelves: PropTypes.func,
  };

  state = { books: [], query: "" };

  handleChangeSearch = () => {
    this.props.onSearchChange();
  };

  updateQuery = (query) => {
    //get the search results from the API based on the search term provided,
    //add a shelf to all returned books, update the shelf to reflect any books that
    //are already on a shelf

    if (query.length !== 0) {
      //check if query is blank, if so reset search results. else perform a search
      BooksAPI.search(query)
        .then((books) => {
          if (!books.hasOwnProperty("error")) {
            //Add a shelf to the returned books and update any books returned from the search API to
            //have the correct shelf
            books.forEach((book) => {
              book.shelf = "none";
              this.props.booksOnShelves.forEach((bookOnShelf) => {
                if (book.id === bookOnShelf.id) {
                  book.shelf = bookOnShelf.shelf;
                }
              });
            });
            // Set state to the returnd book arrau=y
            this.setState(() => ({
              books: books,
            }));
          }
        })
        .catch((error) => {
          //loging errors to the console for now
          console.log(error.message);
        });
    } else {
      //When the query is blank reset the search results
      this.setState(() => ({
        books: [],
      }));
    }

    this.setState(() => ({
      query: query,
    }));
  };

  updateBook(shelf, bookId) {
    const workingBooks = [...this.state.books];

    const bookToUpdate = workingBooks.findIndex((book) => book.id === bookId);
    workingBooks[bookToUpdate].shelf = shelf;
    this.setState(() => ({
      books: workingBooks,
    }));

    this.props.booksOnShelves.push(workingBooks[bookToUpdate]);

    this.props.updateBooksOnShelves(this.props.booksOnShelves);
  }

  render() {
    const { query, books } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/"></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((displayOnShelf, index) => (
              <li key={index}>
                <Book
                  bookToShow={displayOnShelf}
                  onBookChange={(shelf, bookId) => {
                    this.updateBook(shelf, bookId);
                  }}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookSearch;
