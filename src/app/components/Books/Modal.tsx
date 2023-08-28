/* eslint-disable @next/next/no-img-element */
import type { Book } from "@/types";

export default function Modal({ isOpen, onClose, book }: { isOpen: boolean, onClose: () => void, book: Book}) {
    if (!isOpen || !book) {
        return null;
    }
    return (
        <div className="fixed  inset-0 flex justify-self-center z-50">
            <section className="w-[450px] h-[530px] relative flex flex-col items-center p-8 rounded-lg shadow-md max-w-md m-auto bg-slate-200 ">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
                    Close
                </button>
                <img className="rounded-lg w-40 aspect-[9/14] object-cover" src={book.cover} alt={book.title} />
                <h2 className=" text-black text-xl font-semibold">{book.title}</h2>
                <p className="text-gray-600 text-center">{book.synopsis}</p>
                <p className="text-gray-600">{book.genre}</p>
                <p className="text-gray-600">{book.year}</p>
                <p className="text-gray-600">{book.author?.name}</p>
                {
                    book.author?.otherBooks.map((book: string, index: number) => (
                        <p className="text-gray-600" key={index}>{book}</p>
                    ))
                }
            </section>
        </div>
    )
}