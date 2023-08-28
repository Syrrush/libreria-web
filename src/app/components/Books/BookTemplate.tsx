/* eslint-disable @next/next/no-img-element */
import type { Book } from "@/types";

export default function BookTemplate({ id, cover, title, readList }: { id: Book["ISBN"], cover: Book["cover"], title: Book["title"], readList: Book["ISBN"][] }) {
    return (
            <figure key={id} className="grid gap-2">
                <div className="relative aspect-[9/14]">
                    <img className="aspect-[9/14] object-cover" src={cover} alt={title} />
                    <img
                        src="./bookPainted.png"
                        alt="book"
                        className={`object-contain w-16 absolute bottom-2 right-2 cursor-pointer `}
                    />
                </div>
                <img
                    src="./bookPainted.png"
                    alt="book"
                    className={`object-contain w-16 absolute bottom-2 right-2 cursor-pointer ${readList.includes(id) ?
                        'opacity-100' :
                        'opacity-50 hover:opacity-80'
                        }`}
                />
                <span>{title}</span>
            </figure>
    )
}