/** 
 * Main container for application state. Only a single class to avoid fragmentation of data store.
 */
 import * as Constants from '../../../config/constants';

 import { PhaseZeroArgs, IPrecinct, MapFilterEnum, ViewLevelEnum, ElectionEnum, ICluster, PhaseOneArgs, CompactnessEnum, DemographicEnum, StateEnum, FilterArgs, AlgorithmEnum, PhaseZeroResult } from '../../../models';
 import { PoliticalFairnessEnum } from '../../../models';
 import { PrecinctService } from '../../../libs/precinct-service';
 
 const SET_STATE = 'SET_STATE';
 const SET_PRECINCTS = 'SET_PRECINCTS';
 const SET_PRECINCT_MAP = 'SET_PRECINCT_MAP';
 const SET_MAP_FILTER = 'SET_MAP_FILTER';
 const SET_VIEW_LEVEL = 'SET_VIEW_LEVEL';
 const SET_PHASE_ZERO_ARGS = 'SET_PHASE_ZERO_ARGS';
 const SET_PHASE_ZERO_RESULTS = 'SET_PHASE_ZERO_RESULTS';
 const SET_PHASE_ONE_ARGS = 'SET_PHASE_ONE_ARGS';
 const SET_ALGORITHM_PHASE = 'SET_ALGORITHM_PHASE';
 
 export const setSelectedState = (oldState: StateEnum, state: StateEnum) => {
     return (dispatch: any) => {
         if (oldState === state) {
             return;
         }
         dispatch(selectState(state));
         dispatch(setPrecinctMap(new Map<string, IPrecinct>()));
         dispatch(() => new PrecinctService(state, dispatch));
     }
 }
 
 export const setMapFilter = (filter: string) => {
     return (dispatch: any) => {
         dispatch(setFilter(filter));
     }
 }
 
 export const setMapLevel = (level: string) => {
     return (dispatch: any) => {
         dispatch(setLevel(level));
     }
 }
 
 export const setPrecinctData = (precincts: any) => {
     return (dispatch: any) => {
         dispatch(setPrecincts(precincts));
     }
 }
 
 export const selectState = (selectedState: string) => {
     return {
         type: SET_STATE,
         selectedState
     }
 }
 
 export const setPrecincts = (precincts: any) => {
     return {
         type: SET_PRECINCTS,
         precincts
     }
 }
 
 export const setPrecinctMap = (precinctMap: Map<string, IPrecinct>) => {
     return {
         type: SET_PRECINCT_MAP,
         precinctMap
     }
 }
 
 export const setFilter = (filter: string) => {
     return {
         type: SET_MAP_FILTER,
         filter
     }
 }
 
 export const setLevel = (level: string) => {
     return {
         type: SET_VIEW_LEVEL,
         level
     }
 }
 
 export const setPhaseZeroArgs = (phaseZeroArgs: PhaseZeroArgs) => {
     return {
         type: SET_PHASE_ZERO_ARGS,
         phaseZeroArgs
     }
 }

 export const setPhaseZeroResults = (phaseZeroResults: PhaseZeroResult[]) => {
     return {
        type: SET_PHASE_ZERO_RESULTS,
        phaseZeroResults
     }
 }
 
 export const setPhaseOneArgs = (phaseOneArgs: PhaseOneArgs) => {
     return {
         type: SET_PHASE_ONE_ARGS,
         phaseOneArgs
     }
 }
 
 export const setAlgorithmPhase = (algorithmPhase: AlgorithmEnum) => {
     return {
         type: SET_ALGORITHM_PHASE,
         algorithmPhase
     }
 }
 
 export interface State {
     selectedState: string;
     precincts: any;
     precinctMap: Map<string, IPrecinct>;
     clusterMap: Map<string, ICluster>;
     oldClusterMap: Map<string, ICluster>;
     phaseZeroArgs: PhaseZeroArgs;
     phaseZeroResults: PhaseZeroResult[];
     phaseOneArgs: PhaseOneArgs;
     filterArgs: FilterArgs;
     algorithmPhase: AlgorithmEnum;
 };
 
 const initialState: State = {
     selectedState: null,
     precincts: Constants.EMPTY_PRECINCTS,
     precinctMap: new Map<string, IPrecinct>(),
     clusterMap: new Map<string, ICluster>(),
     oldClusterMap: new Map<string, ICluster>(),
     phaseZeroArgs: {
         populationThreshold: Constants.DEFAULT_THRESHOLD,
         electionType: ElectionEnum.PRES_16,
         voteThreshold: Constants.DEFAULT_THRESHOLD,
         stateType: StateEnum.NOT_SET
     },
     phaseZeroResults: [],
     phaseOneArgs: {
         numDistricts: Constants.DEFAULT_NUM_DISTRICTS,
         electionData: ElectionEnum.PRES_16,
         minPopulationPercent: Constants.DEFAULT_POP_PRECENT_MIN,
         maxPopulationPercent: Constants.DEFAULT_POP_PRECENT_MAX,
         selectedDemographics: new Set<DemographicEnum>(),
         compactnessOption: CompactnessEnum.POLSBY_POPPER,
         politicalFairnessOption: PoliticalFairnessEnum.EFFICIENCY_GAP,
         objectivePopulationEquality: Constants.DEFAULT_OF_VALUE,
         objectiveCompactness: Constants.DEFAULT_OF_VALUE,
         objectivePartisanFairness: Constants.DEFAULT_OF_VALUE,
         objectiveContiguity: Constants.DEFAULT_OF_VALUE,
         intermediateResults: false
     },
     filterArgs: {
         viewLevel: ViewLevelEnum.PRECINCTS,
         mapFilter: MapFilterEnum.DEFAULT
     },
     algorithmPhase: AlgorithmEnum.PHASE_0
 }
 
 export const stateReducer = (state = initialState, action: any) => {
     switch (action.type) {
         case SET_STATE:
             return {
                 ...state,
                 selectedState: action.selectedState
             }
         case SET_PRECINCTS:
             return {
                 ...state,
                 precincts: action.precincts
             }
         case SET_PRECINCT_MAP:
             return {
                 ...state,
                 precinctMap: action.precinctMap
             }
         case SET_MAP_FILTER:
             return {
                 ...state,
                 filterArgs: {
                     ...state.filterArgs,
                     mapFilter: action.filter
                 }
             }
         case SET_VIEW_LEVEL:
             return {
                 ...state,
                 filterArgs: {
                     ...state.filterArgs,
                     viewLevel: action.level
                 }
             }
         case SET_PHASE_ZERO_ARGS:
             return {
                 ...state,
                 phaseZeroArgs: action.phaseZeroArgs
             }
         case SET_PHASE_ZERO_RESULTS:
             return {
                 ...state,
                 phaseZeroResults: action.phaseZeroResults
             }
         case SET_PHASE_ONE_ARGS:
             return  {
                 ...state,
                 phaseOneArgs: action.phaseOneArgs
             }
         default:
             return state;
     }
 }