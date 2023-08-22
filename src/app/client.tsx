'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import data from "../books.json"
import { read } from "fs";
import type { Book } from "@/types";





const API = {
  readList: {
    onChange: 
    ( callback: (readList: Book["ISBN"][]) => void) => {
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
}}

export default function IndexClient({books,genres}: {books: Book[], genres: Book["genre"][]}) {
  const [genre, setGenre] = useState<Book["genre"]>("")
  const [readList, setReadList] = useState<Book["ISBN"][]>([])
  const matches = useMemo(() => {
    if (!genre) return books
    return books.filter((book) => {
      if (book.genre !== genre) return false
      return true
    });
  }, [books, genre])

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
      <nav>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="" >Todos</option>
          {
            genres.map((genre) => (
              <option key={genre} value={genre} >{genre}</option>
            ))
          }
        </select>
      </nav>
      <figure className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 ">
        {
          matches.map((book) => (
            <div onClick={() => handleBookReadList(book.ISBN)} key={book.ISBN} className="grid gap-2">
              <img className="aspect-[9/14] object-cover" src={book.cover} alt={book.title} />
              <p>{readList.includes(book.ISBN) && <span>🌟</span>}
                {book.title}</p>
            </div>
          ))
        }
      </figure>
    </article>
  )
}
