import {useEffect, useState} from "react";
import autosize from "autosize";

type ReturnedType = [HTMLTextAreaElement | null, (textarea: HTMLTextAreaElement) => void]

export default function useAutoresizeHook(): ReturnedType {
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (textareaRef) {
      autosize(textareaRef);
    }
    return () => {
      if (textareaRef) autosize.destroy(textareaRef);
    }
  }, [textareaRef]);

  return [textareaRef, setTextareaRef];
}
