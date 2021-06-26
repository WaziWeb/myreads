import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class BookShelf extends Component {
  render() {
    const { booksOnShelves, shelfLabel, shelfDisplayName, onBookChange } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfDisplayName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksOnShelves
              .filter((book) => book.shelf === shelfLabel)
              .map((displayOnShelf, index) => (
                <li key={displayOnShelf.industryIdentifiers[0].identifier}>
                  <Book
                    bookToShow={displayOnShelf}
                    onBookChange={(shelf, book) => {
                      onBookChange(shelf, book);
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

BookShelf.propTypes = {
  booksOnShelves: PropTypes.array.isRequired,
  shelfLabel: PropTypes.string.isRequired,
  shelfDisplayName: PropTypes.string.isRequired,
  onBookChange: PropTypes.func.isRequired,
};

export default BookShelf;
