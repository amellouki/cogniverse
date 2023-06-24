import {useRef} from "react";
const PATH = process.env.NEXT_PUBLIC_BACKEND_API + "/pdf-embedding";

export default function useFileUpload() {
  const fileInput = useRef<HTMLInputElement>(null);

  const onFileUpload = async () => {
    console.log('on file upload')
    if (!fileInput.current || !fileInput.current.files)
      return console.error("File input is not defined");
    const file = fileInput.current.files[0];
    const blockSize = 1000;
    const overlap = 80;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("blockSize", blockSize.toString());
    formData.append("overlap", overlap.toString());

    try {
      const response = await fetch(PATH, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data)
    } catch (err) {
      console.error("Error -", err);
    }
  };
  return { fileInput, onFileUpload };
}
