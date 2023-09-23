import { useQuery, useQueryClient } from 'react-query'
import {DocumentMetadata} from "@my-monorepo/shared";
import apiInstance from "@/helpers/api";

export default function useEmbeddedDocumentsList() {
  return useQuery<DocumentMetadata[]>(
    'documentList',
    () => apiInstance.get('/pdf-embedding/embedded-documents').then(res => res.data)
  )
}
