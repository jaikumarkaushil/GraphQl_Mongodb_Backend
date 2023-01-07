import { createWriteStream } from "fs";
import shortid from "shortid";
const storeUpload = async ({ stream, filename, mimetype, uploadTo }) => {
    const id = shortid.generate();
    const path = `${uploadTo}/${id}-${filename}`;
    return new Promise((resolve, reject) =>
    stream
        .pipe(createWriteStream(path))
        .on("finish", () => resolve({ id, path, filename, mimetype }))
        .on("error", reject)
    );
};

export const processUpload = async (upload, uploadTo) => {
    const uploadedData = await upload
    const { createReadStream, filename, mimetype } = uploadedData;
    const stream = createReadStream();
    const file = await storeUpload({ stream, filename, mimetype, uploadTo });
    return file;
};