'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react";
import type { Book } from "@/types";
import Modal from "./components/Books/Modal";
import BookGrid from "./components/BookGrid";
import ReadListSection from "./components/ReadListSection";
import FilterControls from "./components/FilterControls";
import { onChange, update } from './api'

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
    const filteredBooks = readList.includes(book)
      ? readList.filter((readBook) => readBook !== book)
      : [...readList, book];

    setReadList(filteredBooks);
    update(filteredBooks);
  }

  useEffect(() => {
    const dissableEventListener = onChange(setReadList);
    return () => dissableEventListener();
  }, []);

  return (
    <section>
      <article className="grid grid-cols-12 gap-4 justify-items-center ">
        <article className="col-span-9 md:col-span-8">
          <div className="flex flex-col">
            <p>Number of books: {matches.length}</p>
            <p>Books on readlist: {readList.length}</p>
          </div>
          <FilterControls
            genre={genre}
            setGenre={setGenre}
            pageRange={pageRange}
            setPageRange={setPageRange}
            genres={genres}
          />
          <BookGrid
            books={matches}
            readList={readList}
            handleBookReadList={handleBookReadList}
            openModal={openModal}
          />
        </article>
        <section className="col-span-3 md:col-span-4 justify-items-center">
          <ReadListSection readList={readList} books={books} handleBookReadList={handleBookReadList} />
        </section>
      </article>
      <Modal isOpen={modalIsOpen} onClose={closeModal} book={selectedBook} />
    </section>
  );
}