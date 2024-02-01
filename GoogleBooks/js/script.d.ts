declare const rxjs: any;
interface GoogleBook {
    totalItems: number;
    kind: string;
    items: [];
}
interface BookThumbnails {
    smallThumbnail: string;
    thumbnail: string;
}
interface VolumeInfo {
    authors: [];
    description: string;
    imageLinks: BookThumbnails;
    infoLink: string;
    language: string;
    previewLink: string;
    title: string;
    categories: [];
}
interface Book {
    title: string;
    description: string;
    authors: [];
    categories: [];
    thumbnail: string;
}
interface BookItem {
    volumeInfo: VolumeInfo;
    id: string;
}
declare function getBooks(booktitle: string): any;
declare function showTotal(total: number): void;
declare function displayBook(book: Book): void;
declare function cleanBooks(): void;
declare function searchBooks(): void;
