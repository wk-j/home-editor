
export interface NewItem {
    open: boolean,
    name: string;
    location: string;
}

export interface RenameItem { 
    open: boolean,
    originalPath: string,
    newName: string
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
    onNewItem : (NewFileItem) => void;
    onNewItemConfirm : () => void;
    onNewItemCancel: () => void;

    onOpenFile: (FileItem) => void;

    onRenameItem : (RenameItem) => void;
    onRenameItemConfirm : () => void;
    onRenameItemCancel : () => void;
}