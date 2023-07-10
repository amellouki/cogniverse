import {z} from "zod";


const schema = z.object({
  files: z.any().refine((value) => {
    if (value instanceof FileList) {
      return value.length > 0
    }
    return false
  }, { message: "File is required"}),
  overlap: z.string().nonempty({
    message: "Overlap is required"
  }).refine(function check (value) {
    const parsed = Number(value)
    return !(isNaN(parsed) || parsed < 0);
  }, {
    message: "Overlap must be a positive number"
  }),
  blockSize: z.string().nonempty(
    {message: "Block size is required"}
  ).refine(function check (value) {
    const parsed = Number(value)
    return !(isNaN(parsed) || parsed < 0);
  },{
    message: "Block size must be a positive number"
  })
});

export default schema
