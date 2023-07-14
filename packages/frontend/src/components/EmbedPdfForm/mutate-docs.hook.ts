import {useMutation, useQueryClient} from "react-query";
import axios from "axios";

const PATH = process.env.NEXT_PUBLIC_BACKEND_API + "/pdf-embedding/embed";

export function useMutateDocs(onUploadProgress: (progress: string) => void, onSuccess: () => void, onComplete: () => void) {
  const queryClient = useQueryClient()
  return useMutation((embedDocument: FormData) => axios.post(PATH, embedDocument, {
    onUploadProgress: ({progress}) => {
      if (!progress) {
        return
      }
      onUploadProgress(parseFloat((progress * 100).toFixed(2)) + '% Loaded...')
    }
  }), {
    onSuccess: () => {
      queryClient.invalidateQueries('documentMetadata');
      onUploadProgress('Embedding complete!✅');
      onSuccess();
      onComplete();
    },
    onError: () => {
      onUploadProgress('Error occurred!❌');
      onComplete();
    }
  });
}
