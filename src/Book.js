import React, { Component } from 'react';


class Book extends Component {

    constructor(props) {
      super(props);
      this.state = {
        currentShelfOfBook: this.props.book.shelf,
        //updatingBookShelf: false
      }
    }

    changeBookShelf = (event) => {
        this.props.changeBookShelf(this.props.book, event.target.value);
        this.setState({
          currentShelfOfBook: event.target.value,
          //updatingBookShelf: true
        })  
  }

    /*componentWillReceiveProps() {
      this.setState({
        updatingBookShelf: false
      })
    }*/

    render() {
        return (
            <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ 
                  width: 128, 
                  height: 193, 
                  backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")` }}>
              </div>
              <div className="book-shelf-changer">
                <select 
                    value={this.state.currentShelfOfBook}
                    onChange={this.changeBookShelf}
                >
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.book.title}</div>
            <div className="book-authors">{this.props.book.authors}</div>
          </div>
        );
    }
}

export default Book;