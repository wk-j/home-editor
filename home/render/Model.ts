export interface NewFileItem {
    name: string;
    fullName: string;
}

export interface NewFolderItem { 
    name: string;
    fullName: string;
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

    newFile: boolean;
    newFileName: string;

    newFolder: boolean;
    newFolderName: string;
}
