'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react";
import type { Book } from "@/types";
import Modal from "./components/Books/Modal";
import BookGrid from "./components/BookGrid";
import ReadListSection from "./components/ReadListSection";
import FilterControls from "./components/FilterControls";
import { onChange, update } from './api'
import Swal from "sweetalert2";

export default function IndexClient({ books, genres }: { books: Book[], genres: Book["genre"][] }) {
  const [genre, setGenre] = useState<Book["genre"]>("");
  const [readList, setReadList] = useState<Book["ISBN"][]>([]);
  const [pageRange, setPageRange] = useState<Book["pages"]>(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>([]);

  const openModal = (book: Book) => {
    setSelectedBook(book);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedBook([]);
    setModalIsOpen(false);
  };

  const matches = useMemo(() => {
    const booksFilteredGenres = books.filter((book) => book.genre === genre);
    if (!genre && pageRange === 0) return books;
    else if (!genre && pageRange > 0) {
      return books.filter((book) => book.pages >= pageRange);
    }
    return booksFilteredGenres.filter((book) => book.pages >= pageRange);
  }, [books, genre, pageRange]);

  function handleBookReadList(book: Book["ISBN"]) {
    let updatedReadList: Book["ISBN"][];

    if (readList.includes(book)) {
      updatedReadList = readList.filter((readBook) => readBook !== book);

      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Book removed from the readlist',
        showConfirmButton: false,
        width: 250,
        toast: true,
        timer: 1500
      });
    } else {
      updatedReadList = [...readList, book];

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Book added to the readlist',
        showConfirmButton: false,
        width: 250,
        toast: true,
        timer: 1500
      });
    }

    setReadList(updatedReadList);
    update(updatedReadList);
  }

  useEffect(() => {
    const dissableEventListener = onChange(setReadList);
    return () => dissableEventListener();
  }, []);
  const [showReadList, setShowReadList] = useState(false);

  const toggleReadList = () => {
    setShowReadList(!showReadList);
  };

  return (
    <section>
      <article className="grid grid-cols-12 gap-4 justify-items-center">
        <article className="col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-9 xl:col-span-8">
          <div className="flex flex-col mb-3">
            <p>Number of books: {matches.length}</p>
          </div>
          <FilterControls
            genre={genre}
            setGenre={setGenre}
            pageRange={pageRange}
            setPageRange={setPageRange}
            genres={genres}
          />
          {showReadList ? (
            <ReadListSection readList={readList} books={books} handleBookReadList={handleBookReadList} />
          ) : (
            <BookGrid
              books={matches}
              readList={readList}
              handleBookReadList={handleBookReadList}
              openModal={openModal}
            />
          )}
        </article>
        <section className="hidden sm:block col-span-3 sm:col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-4">
          <ReadListSection readList={readList} books={books} handleBookReadList={handleBookReadList} />
        </section>
      </article>
      <Modal isOpen={modalIsOpen} onClose={closeModal} book={selectedBook} />
      <div className="fixed bottom-4 right-4 sm:hidden">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={toggleReadList}
        >
          {showReadList ? 'Show Books' : 'Show Read List'}
        </button>
      </div>
    </section>
  );
}