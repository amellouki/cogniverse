import {useMutation, useQueryClient} from "react-query";
import axios from "axios";

const PATH = process.env.NEXT_PUBLIC_BACKEND_API + "/pdf-embedding";

export function useMutateDocs(onUploadProgress: (progress: string) => void, onSuccess: () => void) {
  const queryClient = useQueryClient()
  return useMutation((embedDocument: FormData) => axios.post(PATH, embedDocument, {
    onUploadProgress: ({progress}) => {
      if (!progress) {
        return
      }
      onUploadProgress(parseFloat((progress * 100).toFixed(2)) + '% Loaded...')
    }
  }), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('docs');
      onUploadProgress('Embedding complete!✅');
      onSuccess();
    },
  });
}
