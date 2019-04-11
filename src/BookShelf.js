import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class BookShelf extends Component {
    render() {
        return (
             <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) => (
                            <li key={book.id} className="book-list-item">
                                <Book 
                                   book={book} 
                                   changeBookShelf={this.props.changeBookShelf}
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
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
}

export default BookShelf;