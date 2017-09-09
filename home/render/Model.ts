export interface FileItem {
    name: string;
    fullName: string;
}

export interface Structure {
    name: string;
    fullName: string;
    files: FileItem [];
    folders: Structure[];
}
