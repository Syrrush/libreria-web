import type { Book } from "@/types"
import dynamic from "next/dynamic";
import IndexLoading from "./loading";

const IndexClient = dynamic(() => import("./client"), { ssr: false, loading: IndexLoading })

const API = {
    call: {
        list: async (): Promise<Book[]> =>
            import("../books.json").then((data) => data.library.map((data) => data.book))
    }
}

export default async function IndexPage() {
    const books: Book[] = await API.call.list();
    const genres: Book["genre"][] = Array.from(new Set(books.map((book) => book.genre)))
    return (
        <IndexClient books={books} genres={genres} />
    )
}