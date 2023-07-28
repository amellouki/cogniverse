import {LanguageModel} from "@prisma/client";

type NewLlm = Omit<LanguageModel, 'id'>

export default NewLlm;
