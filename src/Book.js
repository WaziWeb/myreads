import React from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import BookMenu from "./BookMenu";

function Book(props) {
  const { bookToShow, onBookChange } = props;

  //Cater for books that do not have an image link
  const Image = bookToShow.hasOwnProperty("imageLinks") ? bookToShow.imageLinks.smallThumbnail : "";

  /**
   * @description pass the change shelf event up the chain and update books shelf on the server
   * @param shelf - The shelf to change the book to
   * @param bookId - The id of the book to change
   **/
  const handleChangeShelf = (shelf, book) => {
    BooksAPI.update(bookToShow, shelf);
    onBookChange(shelf, book);
  };

  return (
    <div>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${Image})`,
            }}
          />
          <BookMenu key={bookToShow.id} bookToShow={bookToShow} onChangeShelf={handleChangeShelf} />
        </div>
        <div className="book-title">{bookToShow.title}</div>
        <div className="book-authors">{bookToShow.authors}</div>
      </div>
    </div>
  );
}

Book.propTypes = {
  bookToShow: PropTypes.object.isRequired,
  onBookChange: PropTypes.func,
};

export default Book;
