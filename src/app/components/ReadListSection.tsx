/* eslint-disable @next/next/no-img-element */
import React from 'react';
import type { Book } from '@/types';

interface ReadListSectionProps {
    readList: Book['ISBN'][];
    books: Book[];
    handleBookReadList: (ISBN: Book['ISBN']) => void;
}

export default function ReadListSection({
    readList,
    books,
    handleBookReadList,
}: ReadListSectionProps) {
    return (
        <section className="col-span-3 md:col-span-4 justify-items-center">
            <p className="mb-5">Books on readlist: {readList.length}</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-2 ">
                {readList.map((id) => {
                    const book = books.find((book) => book.ISBN === id);
                    return book ? (
                        <figure key={id} className=" relative object-cover">
                            <img
                                className="rounded-lg object-cover aspect-[9/14]"
                                src={book.cover}
                                alt={book.title}
                            />
                            <img
                                src="./delete.png"
                                alt="cruz de cierre"
                                className="object-contain w-6 absolute top-1 right-1 cursor-pointer"
                                onClick={() => handleBookReadList(id)}
                            />
                        </figure>
                    ) : null;
                })}
            </div>
        </section>
    );
}
