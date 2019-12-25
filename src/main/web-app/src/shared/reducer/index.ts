import {combineReducers} from 'redux';
import rpsGameReducer, {RPSGameReducerType} from "../../component/games/rps/reducer/rps-reducer";
import authenticationState, {AuthenticationState} from "../../component/authentication/reducer/authentication-reducer";
import mainOperations,{MainOperations} from "./actions-reducer";


export interface IRootState {
    readonly rpsGameReducer: RPSGameReducerType;
    readonly authenticationState: AuthenticationState;
    readonly mainOperations: MainOperations
}

const rootReducer = combineReducers<IRootState>({
    rpsGameReducer,
    authenticationState,
    mainOperations
});

export default rootReducer;
