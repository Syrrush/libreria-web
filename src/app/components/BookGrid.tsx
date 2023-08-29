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
        <section className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 min-w-[500px]">
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