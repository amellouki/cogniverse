import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import {DocumentMetadata} from "@my-monorepo/shared/dist/document-metadata";

const PATH = process.env.NEXT_PUBLIC_BACKEND_API + '/pdf-embedding/embedded-documents'

export default function useEmbeddedDocumentsList() {
  const queryClient = useQueryClient()
  return useQuery<DocumentMetadata[]>('documentList', () => axios.get(PATH).then(res => res.data), {
    onSuccess: () => {
      queryClient.invalidateQueries('documentsMetadata')
    }
  })
}
