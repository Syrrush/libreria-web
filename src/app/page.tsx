/* eslint-disable @next/next/no-img-element */
"use-client"

import data from "../books.json"

export interface Book {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  author: {
    name: string;
    otherBooks: string[];
  };
}
// grid grid-cols-[repeat(auto-fill,minmax(230px, 1fr))] gap-4
const books: Book[] = data.library.map((data) => data.book)

export default function Home() {
  return (
    <article className="grid gap-4">
      <nav>
        <select name="" id="">

        </select>
      </nav>
      <figure className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 ">
        {
          books.map((book) => (
            <div key={book.ISBN}>
              <img className="aspect-[9/14] object-cover" src={book.cover} alt={book.title} />
              <p>{book.title}</p>
            </div>
          ))
        }
      </figure>
    </article>
  )
}
