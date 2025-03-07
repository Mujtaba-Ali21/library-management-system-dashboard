import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import db from "../firebase/firebaseConfig";
import "../styles/Table.css";

function BookTable() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [newBook, setNewBook] = useState({
    name: "",
    author: "",
    borrowed: false,
    borrowedOn: "",
  });

  const booksCollection = collection(db, "books");

  useEffect(() => {
    const unsubscribe = onSnapshot(booksCollection, (snapshot) => {
      const booksData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBooks(booksData);
      setFilteredBooks(booksData);
    });
    return () => unsubscribe();
  }, []);

  // Handle search
  useEffect(() => {
    const results = books.filter(
      (book) =>
        book.name?.toLowerCase().includes(searchTerm.toLowerCase()) || // Check if book.name exists
        book.author?.toLowerCase().includes(searchTerm.toLowerCase()) // Check if book.author exists
    );
    setFilteredBooks(results);
  }, [searchTerm, books]);

  // Add a book
  const addBook = async () => {
    await addDoc(booksCollection, newBook);
    setNewBook({ name: "", author: "", borrowed: false, borrowedOn: "" });
  };

  // Update a book
  const updateBook = async () => {
    if (selectedBook) {
      const bookDoc = doc(db, "books", selectedBook.id);
      await updateDoc(bookDoc, selectedBook);
      setSelectedBook(null);
    }
  };

  // Delete a book
  const deleteBook = async (id) => {
    const bookDoc = doc(db, "books", id);
    await deleteDoc(bookDoc);
  };

  return (
    <section className="products">
      <div className="container-fluid mb-3">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          className="form-control form-control-lg w-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          className="add-product-btn bg-dark"
          data-bs-toggle="modal"
          data-bs-target="#addBookModal"
        >
          <i className="bi bi-plus-circle me-1"></i> Add Product
        </button>
      </div>

      <table className="table table-hover rounded">
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>On The Shelves</th>
            <th>Borrowed On</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr key={index}>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>
                <span
                  className={`status ${
                    book.borrowed ? "borrowed" : "available"
                  }`}
                >
                  {!book.borrowed ? "Yes" : "No"}
                </span>
              </td>
              <td>{book.borrowedOn !== "" ? book.borrowedOn : "-"}</td>
              <td>
                <i
                  className="bi bi-pencil-fill h5 text-warning"
                  role="button"
                  data-bs-toggle="modal"
                  data-bs-target="#editBookModal"
                  onClick={() => setSelectedBook(book)}
                ></i>
              </td>
              <td>
                <i
                  className="bi bi-trash-fill h5 text-danger"
                  role="button"
                  onClick={() => deleteBook(book.id)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Book Modal */}
      <div className="modal fade" id="addBookModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h3">Add Book</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Name"
                className="form-control mb-2"
                value={newBook.name}
                onChange={(e) =>
                  setNewBook({ ...newBook, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Author"
                className="form-control mb-2"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
              />
              <div className="form-check form-switch mb-2">
                <label className="form-check-label h5" htmlFor="borrowedSwitch">
                  Is Borrowed
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="borrowedSwitch"
                  checked={newBook.borrowed}
                  onChange={(e) =>
                    setNewBook({ ...newBook, borrowed: e.target.checked })
                  }
                />
              </div>

              {/* Borrowed Date Input (conditionally rendered) */}
              {newBook.borrowed && (
                <input
                  type="date"
                  className="form-control mb-2"
                  value={newBook.borrowedOn}
                  onChange={(e) =>
                    setNewBook({ ...newBook, borrowedOn: e.target.value })
                  }
                />
              )}
            </div>
            <div className="modal-footer">
              <button
                className="add-product-btn bg-dark"
                onClick={addBook}
                data-bs-dismiss="modal"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Book Modal */}
      {selectedBook && (
        <div className="modal fade" id="editBookModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title h3">Edit Book</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control mb-2"
                  value={selectedBook.name}
                  onChange={(e) =>
                    setSelectedBook({ ...selectedBook, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Author"
                  className="form-control mb-2"
                  value={selectedBook.author}
                  onChange={(e) =>
                    setSelectedBook({ ...selectedBook, author: e.target.value })
                  }
                />
                <div className="form-check form-switch mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="borrowedSwitchEdit"
                    checked={selectedBook.borrowed}
                    onChange={(e) => {
                      const isBorrowed = e.target.checked;
                      setSelectedBook({
                        ...selectedBook,
                        borrowed: isBorrowed,
                        borrowedOn: isBorrowed ? selectedBook.borrowedOn : "",
                      });
                    }}
                  />
                  <label
                    className="form-check-label h5"
                    htmlFor="borrowedSwitchEdit"
                  >
                    Borrowed
                  </label>
                </div>

                {selectedBook.borrowed && (
                  <input
                    type="date"
                    className="form-control mb-2"
                    value={selectedBook.borrowedOn}
                    onChange={(e) =>
                      setSelectedBook({
                        ...selectedBook,
                        borrowedOn: e.target.value,
                      })
                    }
                  />
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="add-product-btn bg-dark"
                  onClick={updateBook}
                  data-bs-dismiss="modal"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default BookTable;
