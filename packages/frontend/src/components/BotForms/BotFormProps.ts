import {NewBot} from "@my-monorepo/shared";
import {MutableResetRef} from "@/types/MutableResetRef";

export interface BotFormProps {
  onSubmit: (newBot: NewBot) => void
  resetRef?: MutableResetRef
}
