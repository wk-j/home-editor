export interface NewFileItem {
    open: boolean;
    name: string;
    location: string;
}

export interface NewFolderItem { 
    open: boolean;
    name: string;
    location: string;
}

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
