import {FieldValues, SubmitHandler} from "react-hook-form";

export default function useSubmit<T extends FieldValues>(props: {
  onSubmit: (data: T) => void,
  next: () => void,
  back: () => void
}): SubmitHandler<T> {
  return (data: T, event) => {
    props.onSubmit(data)
    const target = (event?.nativeEvent as SubmitEvent)?.submitter;
    console.log(event)
    if (target?.id === 'next') {
      props.next();
    } else if (target?.id === 'back') {
      props.back();
    }
  };
}
