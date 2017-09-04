import * as axios from "axios";

export async function getStructures(path) {
    var req = axios.post("http://localhost:5052/api/home/getStructures", {
        path: path
    });
    return await req;
}