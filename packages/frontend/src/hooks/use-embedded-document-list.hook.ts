import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import {DocumentMetadata} from "@my-monorepo/shared";

const PATH = process.env.NEXT_PUBLIC_BACKEND_API + '/pdf-embedding/embedded-documents'

export default function useEmbeddedDocumentsList() {
  return useQuery<DocumentMetadata[]>('documentList', () => axios.get(PATH).then(res => res.data))
}
