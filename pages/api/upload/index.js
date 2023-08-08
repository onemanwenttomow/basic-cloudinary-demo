// we send the form (including image)
// use formidable to handle for the form
// use cloudinary to send it somewhere

import cloudinary from "cloudinary";
import formidable from "formidable";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(400).json({ message: "Method not implemented" });
    return;
  }

  const form = formidable({});
  const [, files] = await form.parse(request);
  const { filepath, newFilename } = files.file[0];

  const result = await cloudinary.v2.uploader.upload(filepath, {
    public_id: newFilename,
  });
  console.log("API: response from cloudinary: ", result);
  return response.status(201).json(result);
}
