import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route,Link } from 'react-router-dom'
import SearchBooks from "./SearchBooks";
import BooksList from "./BooksList";


class BooksApp extends React.Component {
    state = {
        books: [],
        currentlyReading:[],
        read:[],
        wantToRead:[],
    }
    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books,
                    currentlyReading:books.filter(books => books.shelf === 'currentlyReading'),
                    read:books.filter(books =>books.shelf === 'read'),
                    wantToRead:books.filter(books =>books.shelf === 'wantToRead'),
                }))
            })
    }
    updateBookShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then((data)=>{
            console.log(data);
        });
    }
    render() {
        return (
            <div>
                <Route exact path='/' render={() => (
                    <BooksList books={this.state.books}
                               currentlyReading = {this.state.currentlyReading}
                               read = {this.state.read}
                               wantToRead = {this.state.wantToRead}
                               updateBookShelf = {this.updateBookShelf}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp
