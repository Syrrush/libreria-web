import type { Book } from "@/types";

const readListKey = 'readList';

export const onChange = (callback: (readList: string[]) => void) => {
    function getActualReadList() {
        const readList = JSON.parse(localStorage.getItem(readListKey) ?? '[]') as string[];
        callback(readList);
    }

    window.addEventListener('storage', getActualReadList);
    getActualReadList();
    return () => window.removeEventListener('storage', getActualReadList);
};

export const update = (readList: string[]) => {
    localStorage.setItem(readListKey, JSON.stringify(readList));
};
