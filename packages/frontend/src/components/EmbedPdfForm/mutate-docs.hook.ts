import {useMutation, useQueryClient} from "react-query";
import apiInstance from "@/helpers/api";

export function useMutateDocs(onUploadProgress: (progress: string) => void, onSuccess: () => void, onComplete: () => void) {
  const queryClient = useQueryClient()
  return useMutation((embedDocument: FormData) => apiInstance.post("/pdf-embedding/embed", embedDocument, {
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
