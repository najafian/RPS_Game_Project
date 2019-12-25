import axios from 'axios';
import {IPayloadResult} from "../../../../shared/type/dataTypes-utils";
import {FAILURE, REQUEST, SUCCESS} from "../../../../shared/utils/action-type.util";
import {GameModel} from "../models/game-model";


export const ACTION_TYPES = {
    CALCULATE_RPS_RESULT: ':baseInfo/FETCH_MANAGE_GROUPS_TREEVIEW'
};

const initialState = {
    loading: false,
    rpsGameReducer: {} as GameModel
};

export type RPSGameReducerType = Readonly<typeof initialState>;

// Reducer
export default (state: RPSGameReducerType = initialState, action: any): RPSGameReducerType => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.CALCULATE_RPS_RESULT):
            return {
                ...state,
                loading: true
            };
        case FAILURE(ACTION_TYPES.CALCULATE_RPS_RESULT):
            return {
                ...state,
                loading: false,
            };
        case SUCCESS(ACTION_TYPES.CALCULATE_RPS_RESULT):
            return {
                ...state,
                loading: false,
                rpsGameReducer: action.payload.data
                // cardGroup: action.payload.data,
            };
        default:
            return state;
    }
};

// Actions
export const calculatedRpsGameResult: IPayloadResult<any> = entity => ({
    type: ACTION_TYPES.CALCULATE_RPS_RESULT,
    payload: axios.post('/api/games/rps-game', entity)
});
