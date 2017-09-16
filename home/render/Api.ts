import axios from "axios";
import { Structure, NewItem } from "./Model";

let host = "http://localhost:5052";

export async function getStructures(path) {
    let api = `${host}/api/home/getStructures`;
    let req = await axios.post(api, {
        path: path
    });
    return req.data as Structure;
}

export async function createNewFile(info: NewItem) {
    let api = `${host}/api/home/createNewFile`;
    let req = await axios.post(api, {
        path : info.location,
        name: info.name
    });
    return req.data as any;
}

/*
export async function createNewFolder(info: NewFolderItem) {
    let api = `${host}/api/home/createNewFolder`;
    let req = await axios.post(api, {
        path: info.location,
        name: info.name
    });
    return req.data as any;
}*/

export async function renameFile(info: { newPath: string, originalPath: string }) {
    let api = `${host}/api/home/renameFile`;
    let req = await axios.post(api, info);
    return req.data as any;
}

export async function deleteFile(info: { path: string}) {
    let api = `${host}/api/home/deleteFile`;
    let req = await axios.post(api, info);
    return req.data as any;
}