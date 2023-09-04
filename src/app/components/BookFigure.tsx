/* eslint-disable @next/next/no-img-element */
import React from 'react';
import type { Book } from '@/types';
import Swal from 'sweetalert2';

interface BookFigureProps {
    book: Book;
    isBookInReadList: boolean;
    handleBookReadList: (book: string) => void;
    openModal: (book: Book) => void;
}

export default function BookFigure({
    book,
    isBookInReadList,
    handleBookReadList,
    openModal,
}: BookFigureProps) {
    const handleBookClick = () => {
        openModal(book);
    };

    const handleReadListClick = () => {
        handleBookReadList(book.ISBN);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Book added to the readlist',
            showConfirmButton: false,
            width: 250,
            toast: true,
            timer: 1500,
        });
    };

    return (
        <figure
            key={book.ISBN}
            className="grid gap-2 justify-items-center cursor-pointer transition-transform transform hover:scale-105"
            onClick={handleBookClick} 
        >
            <div className="relative">
                <img
                    className="aspect-[9/14] object-cover"
                    src={book.cover}
                    alt={book.title}
                />
                <img
                    src="./bookPainted.png"
                    alt="book"
                    onClick={handleReadListClick} 
                    className={`object-contain w-16 absolute bottom-2 right-2 cursor-pointer ${isBookInReadList ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                        }`}
                />
            </div>
            <span className="text-md font-semibold">{book.title}</span>
        </figure>
    );
}