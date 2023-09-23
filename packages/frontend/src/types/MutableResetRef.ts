import {MutableRefObject} from "react";

export type ResetFunction = () => void;

export type MutableResetRef = MutableRefObject<ResetFunction | undefined>
