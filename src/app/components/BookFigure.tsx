/* eslint-disable @next/next/no-img-element */
import React from 'react';
import type { Book } from '@/types';
interface BookFigureProps {
    book: Book;
    isBookInReadList: boolean;
    handleBookReadList: (book: string) => void;
    openModal: (book: Book) => void;
};

export default function BookFigure({
    book,
    isBookInReadList,
    handleBookReadList,
    openModal,
}: BookFigureProps) {
    return (
        <figure key={book.ISBN} className="grid gap-2 justify-items-center">
            <div className="relative">
                <img
                    className="aspect-[9/14] object-cover"
                    src={book.cover}
                    alt={book.title}
                    onClick={() => openModal(book)}
                />
                <img
                    src="./bookPainted.png"
                    alt="book"
                    onClick={() => handleBookReadList(book.ISBN)}
                    className={`object-contain w-16 absolute bottom-2 right-2 cursor-pointer ${isBookInReadList
                        ? "opacity-100"
                        : "opacity-50 hover:opacity-80"
                        }`}
                />
            </div>
            <span className="text-md font-semibold">{book.title}</span>
        </figure>
    );
};
