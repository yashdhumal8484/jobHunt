import DataUriParser from "datauri/parser.js"
import path from "path"
const getDataUri=(file)=>{
    if (!file) {
        throw new Error("File is missing");
    }
    const parser=new DataUriParser()
    const extName=path.extname(file?.originalname).toString();
    return parser.format(extName,file.buffer);
}
export default getDataUri;