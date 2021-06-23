import React from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import BookMenu from "./BookMenu";

function Book(props) {
  const { bookToShow, onBookChange } = props;
  const Image = bookToShow.hasOwnProperty("imageLinks") ? bookToShow.imageLinks.smallThumbnail : "";

  const handleChangeShelf = (shelf, bookId) => {
    //console.log(shelf);
    BooksAPI.update(bookToShow, shelf);
    onBookChange(shelf, bookId);
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
          <BookMenu bookToShow={bookToShow} onChangeShelf={handleChangeShelf} />
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
