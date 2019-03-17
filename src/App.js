import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import * as BooksAPI from "./BooksAPI";
import BookShelf from './BookShelf';
import BookSearch from './BookSearch';
import "./App.css";

class App extends Component {

    constructor() {
        super()
        this.state = {
            allBooks: []
        }
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({
                allBooks: books
            })
        })
    }

    changeBookShelf = (book, shelf) => {     //we want to delete specific book from one shelf and add it to another
        BooksAPI.update(book, shelf).then((books) => {
            this.setState((state) => ({    //state - current state
                allBooks: state.allBooks.filter((b) => b.id !== book.id).concat( [book] ) //book - book that was clicked on //b - state books id, b- current book
            }))
        })
    }

    getCurrentShelf(shelfName){
        return this.state.allBooks.filter((book) => book.shelf === shelfName)
    }

    renderBookContent() {
        return(
            <Route exact path="/" render={() => (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf 
                            title="Currently Reading"
                            changeBookShelf={this.changeBookShelf}
                            books={this.getCurrentShelf("Currently Reading")}
                        />
                        <BookShelf 
                            title="Want to Read"
                            changeBookShelf={this.changeBookShelf}
                            books={this.getCurrentShelf("Want to Read")}
                        />
                        <BookShelf 
                            title="Read"
                            changeBookShelf={this.changeBookShelf}
                            books={this.getCurrentShelf("Read")}
                        />
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )}/>
        )
    }

    render() {
        return (
            <div className="app">
                    {this.renderBookContent()}
                <Route path='/search' render={({history}) => (
                    <BookSearch

                    />
                )}
                />
            </div>
        );
    }
}

export default App;