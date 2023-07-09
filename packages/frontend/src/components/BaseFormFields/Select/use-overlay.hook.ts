import {useMemo, useState} from "react";
import {Modifier, usePopper} from "react-popper";
import {State} from "@popperjs/core";

export default function useOverlay() {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const modifiers: ReadonlyArray<Modifier<unknown>> = useMemo(() => [
    {
      name: 'flip',
      options: {
        fallbackPlacements: ['top-start']
      }
    },
    {
      name: "sameWidth",
      enabled: true,
      fn: ({state}: { state: State }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    }
  ], []);


  const {attributes, styles: popperStyles} = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers,
  })
  return {setReferenceElement, setPopperElement, attributes, popperStyles};
}
