'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import type { Book } from "@/types";




const API = {
  readList: {
    onChange:
      (callback: (readList: Book["ISBN"][]) => void) => {
        function getActualReadList() {
          const readList = JSON.parse(localStorage.getItem("readList") ?? "[]") as Book["ISBN"][]
          callback(readList)
        }

        window.addEventListener("storage", getActualReadList)
        getActualReadList()
        return () => window.removeEventListener("storage", getActualReadList)
      },
    update: (readList: Book["ISBN"][]) =>
      localStorage.setItem("readList", JSON.stringify(readList))
  }
}

export default function IndexClient({ books, genres }: { books: Book[], genres: Book["genre"][] }) {
  const [genre, setGenre] = useState<Book["genre"]>("")
  const [readList, setReadList] = useState<Book["ISBN"][]>([])
  const [pageRange, setPageRange] = useState<Book["pages"]>(0)
  const matches = useMemo(() => {
    const booksFilteredGenres = books.filter((book) => {
      if (book.genre !== genre) return false
      return true
    });
    if (!genre && pageRange === 0) return books
    else if (!genre && pageRange > 0) {
      return books.filter((book) => {
        if (book.pages >= pageRange) return true
        return false
      })
    }
    return booksFilteredGenres.filter((book) => {
      if (book.pages >= pageRange) return true
      return false
    })
  }, [books, genre, pageRange])

  function handleBookReadList(book: Book["ISBN"]) {
    const filteredBooks = readList.includes(book)
      ? readList.filter((readBook) => readBook !== book)
      : [...readList, book]

    setReadList(filteredBooks);
    API.readList.update(filteredBooks)
  }

  useEffect(() => {
    const dissableEventListener = API.readList.onChange(setReadList)
    return () => dissableEventListener()
  }, [])


  return (
    <article className="grid gap-4">
      <article className="flex flex-col">
        <p>Number of books: {matches.length}</p>
        <p>Books on readlist: {readList.length}</p>
      </article>
      <section className="flex items-center justify-around mb-4">
        <div>
          <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pages</label>
          <input onChange={(e) => setPageRange(Number(e.target.value))} id="default-range" type="range" min="0" max="1000" value={pageRange} className="w-80 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
          <span className="text-gray-600 dark:text-gray-400">     +{pageRange}</span>
        </div>
        <nav>
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filter Genres</p>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="" >Todos</option>
            {
              genres.map((genre) => (
                <option key={genre} value={genre} >{genre}</option>
              ))
            }
          </select>
        </nav>
      </section>
      <figure className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 ">
        {
          matches.map((book) => (
            <figure key={book.ISBN} className="grid gap-2">
              <div className="relative aspect-[9/14]">
                <img className="aspect-[9/14] object-cover" src={book.cover} alt={book.title} />
                <img
                  src="./bookPainted.png"
                  alt="book"
                  onClick={() => handleBookReadList(book.ISBN)}
                  className={`object-contain w-16 absolute bottom-2 right-2 cursor-pointer ${readList.includes(book.ISBN) ?
                    'opacity-100' :
                    'opacity-50 hover:opacity-80'
                    }`}
                />
              </div>
              <span>{book.title}</span>
            </figure>
          ))
        }
      </figure>
    </article>
  )
}
