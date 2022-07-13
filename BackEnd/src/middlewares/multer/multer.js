import Multer from "./index.js";

let multerObj = new Multer();


// exports module
let single = function single(fieldName) {
    return multerObj.single(fieldName);
}

let array = function array(fieldName, count) {
    return multerObj.array(fieldName, count);
}

let fields = function fields(array) {
    return multerObj.fields(array);
}

export default {single, array, fields}