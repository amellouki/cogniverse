import {NewBot} from "@my-monorepo/shared";
import {MutableResetRef} from "@/types/MutableResetRef";

export interface BotFormProps {
  onSubmit: (newBot: NewBot) => void
  resetRef?: MutableResetRef
}

export interface BotFormProps2<T> {
  onSubmit: (data: T) => void
  initValue?: T
  next?: () => void
  back?: () => void
}
