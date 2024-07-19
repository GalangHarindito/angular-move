import { createReducer, on } from "@ngrx/store";
import { showLoading, hideLoading } from "../action/auth.action";

export const initialState = false;

export const loadingReducer = createReducer(
    initialState,
    on(showLoading, () => true),
    on(hideLoading, () => false)
)