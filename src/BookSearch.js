import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from "./BooksAPI";

class BookSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            BooksList: []
        }
    }

    maximumOfBookObjects = 20

    searchBooks = (searchQuery) => {
        if(searchQuery) {
            BooksAPI.search(searchQuery, this.maximumOfBookObjects).then((searchableBooks) => {
                if(searchableBooks.length) {
                    searchableBooks.forEach((book) => {
                        let BooksInShelves = this.props.books.find((currentBook) => currentBook.id === book.id)
                        if(BooksInShelves) {
                            book.shelf = BooksInShelves.shelf
                        } else {
                            book.shelf = 'none'
                        }
                    });
                }
                this.setState({
                    BooksList: searchableBooks
                });
            });
        }
        else {
            this.setState({
                BooksList: ''
            })
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input 
                        type="text" 
                        placeholder="Search by title or author"
                        onChange={(event) => this.searchBooks(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid"></ol>
                </div>
          </div>
        );
    }
}

export default BookSearch;