import {useEffect, useState} from "react";
import autosize from "autosize";

export default function useAutoresizeHook() {
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (textareaRef) {
      autosize(textareaRef);
    }
    return () => {
      if (textareaRef) autosize.destroy(textareaRef);
    }
  }, [textareaRef]);

  return setTextareaRef;
}
