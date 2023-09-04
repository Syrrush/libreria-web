/* eslint-disable @next/next/no-img-element */
import BookFigure from "./BookFigure";
import type { Book } from "@/types";

type BookGridProps = {
    books: Book[];
    readList: string[];
    handleBookReadList: (book: string) => void;
    openModal: (book: Book) => void;
};

export default function BookGrid({
    books,
    readList,
    handleBookReadList,
    openModal,
}: BookGridProps) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {books.map((book) => (
                <BookFigure
                    key={book.ISBN}
                    book={book}
                    isBookInReadList={readList.includes(book.ISBN)}
                    handleBookReadList={handleBookReadList}
                    openModal={openModal}
                />
            ))}
        </section>
    );
}