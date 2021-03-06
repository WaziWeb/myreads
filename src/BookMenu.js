import React from "react";
import PropTypes from "prop-types";

function BookMenu(props) {
  /**
   * @description pass the change shelf event up the chain and update books shelf on the server
   * @param event - The shelf to change the book to
   **/
  const handleShelfChange = (event) => {
    const value = event.target.value;
    props.onChangeShelf(value, props.bookToShow);
  };

  return (
    <div className="book-shelf-changer">
      <select onChange={handleShelfChange} value={props.bookToShow.shelf}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}

BookMenu.propTypes = {
  bookToShow: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};
export default BookMenu;
