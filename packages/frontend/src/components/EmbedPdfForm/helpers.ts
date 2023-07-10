import {InputType} from "./types";

export function getRequestBody(data: InputType) {
  const formData = new FormData();
  formData.append("file", data.files[0]);
  formData.append("blockSize", data.blockSize.toString());
  formData.append("overlap", data.overlap.toString());

  return formData
}
