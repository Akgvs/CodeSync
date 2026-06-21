import { useSelector, useDispatch } from "react-redux";

/**
 * Typed dispatch hook — use instead of raw useDispatch.
 */
export const useAppDispatch = useDispatch;

/**
 * Typed selector hook — use instead of raw useSelector.
 */
export const useAppSelector = useSelector;
