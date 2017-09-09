import axios from "axios";
import { Structure } from "./Model";

export async function getStructures(path) {
    var req = await axios.post("http://localhost:5052/api/home/getStructures", {
        path: path
    });
    return req.data as Structure;
}