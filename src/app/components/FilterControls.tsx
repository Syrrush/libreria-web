import React from 'react';
import type { Book } from "@/types";

interface FilterControlsProps {
    genres: Book["genre"][];
    genre: string;
    setGenre: (genre: string) => void;
    pageRange: number;
    setPageRange: (pageRange: number) => void;
}

export default function FilterControls({
    genres,
    genre,
    setGenre,
    pageRange,
    setPageRange,
}: FilterControlsProps) {
    return (
        <section className="flex items-center justify-around mb-4">
            <div>
                <label
                    htmlFor="default-range"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Pages
                </label>
                <input
                    onChange={(e) => setPageRange(Number(e.target.value))}
                    id="default-range"
                    type="range"
                    min="0"
                    max="1000"
                    value={pageRange}
                    className="w-80 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span className="text-gray-600 dark:text-gray-400">
                    +{pageRange}
                </span>
            </div>
            <nav>
                <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Filter Genres
                </p>
                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                >
                    <option value="">Todos</option>
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </nav>
        </section>
    );
}
