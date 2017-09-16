
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
    location: string;
}

export interface Structure {
    name: string;
    fullName: string;
    location: string;
    files: FileItem [];
    folders: Structure[];
}

export interface ItemEvent {
    onNewFile : (NewFileItem) => void;
    onNewFileConfirm : () => void;
    onNewFileCancel: () => void;
    onFileClick: (FileItem) => void;
}