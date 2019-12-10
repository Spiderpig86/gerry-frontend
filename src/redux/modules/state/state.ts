/** 
 * Main container for application state. Only a single class to avoid fragmentation of data store.
 */
 import * as Constants from '../../../config/constants';

 import { PhaseZeroArgs, IPrecinct, MapFilterEnum, ViewLevelEnum, ElectionEnum, ICluster, PhaseOneArgs, CompactnessEnum, DemographicEnum, StateEnum, FilterArgs, AlgorithmEnum, PhaseZeroResult, PartyEnum, PoliticalFairnessEnum, PopulationEqualityEnum, PhaseTwoDepthEnum } from '../../../models';
 import { PrecinctService } from '../../../libs/precinct-service';
 import { PhaseOneService } from '../../../libs/algorithms/phase-one-service';
import { StateBorderService } from '../../../libs/state-borders';
 
 const SET_STATE = 'SET_STATE';
 const SET_PRECINCTS = 'SET_PRECINCTS';
 const SET_PRECINCT_MAP = 'SET_PRECINCT_MAP';
 const SET_OLD_CLUSTERS = 'SET_OLD_CLUSTERS';
 const SET_NEW_CLUSTERS = 'SET_NEW_CLUSTERS';
 const SET_MAP_FILTER = 'SET_MAP_FILTER';
 const SET_VIEW_LEVEL = 'SET_VIEW_LEVEL';
 const SET_PHASE_ZERO_ARGS = 'SET_PHASE_ZERO_ARGS';
 const SET_PHASE_ZERO_RESULTS = 'SET_PHASE_ZERO_RESULTS';
 const SET_PHASE_ONE_ARGS = 'SET_PHASE_ONE_ARGS';
 const SET_ALGORITHM_PHASE = 'SET_ALGORITHM_PHASE';
 const SET_PHASE_ONE_SERVICE = 'SET_PHASE_ONE_SERVICE';
 const SET_LOGS = 'SET_LOGS';
 
 export const setSelectedStateCreator = (oldState: StateEnum, state: StateEnum) => {
     return async (dispatch: any) => {
         if (oldState === state) {
             return;
         }
        //  dispatch(selectState(state));
         dispatch(setPrecinctMap(new Map<string, IPrecinct>()));
         dispatch(setPhaseZeroArgs({
             ...initialState.phaseZeroArgs,
             stateType: state
         }));
         dispatch(() => new PrecinctService(state, dispatch));
     }
 }
 
 export const setMapFilterCreator = (filter: string) => {
     return (dispatch: any) => {
         dispatch(setFilter(filter));
     }
 }
 
 export const setMapLevelCreator = (level: string) => {
     return (dispatch: any) => {
         dispatch(setLevel(level));
     }
 }
 
 export const setPrecinctDataCreator = (precincts: any) => {
     return (dispatch: any) => {
         dispatch(setPrecincts(precincts));
     }
 }

 export const setPhaseOneServiceCreator = () => {
     return (dispatch: any) => {
         const phaseOneService = new PhaseOneService(initialState.precinctMap, dispatch, initialState.newClusters);
         dispatch(setPhaseOneService(phaseOneService));
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

 export const setPhaseZeroResults = (phaseZeroResults: PhaseZeroResult) => {
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

 export const setOldClusters = (oldClusters: Map<string, ICluster>) => {
     return {
         type: SET_OLD_CLUSTERS,
         oldClusters
     }
 }

 export const setNewClusters = (newClusters: Map<string, ICluster>) => {
     return {
         type: SET_NEW_CLUSTERS,
         newClusters
     }
 }
 
 export const setPhaseOneService = (phaseOneService: PhaseOneService) => {
     return {
        type: SET_PHASE_ONE_SERVICE,
        phaseOneService
     }
 }
 
 export const setLogs = (logs: string[]) => {
     return {
        type: SET_PHASE_ONE_SERVICE,
        logs
     }
 }
 
 export interface State {
     selectedState: StateEnum;
     stateId: string;
     precincts: any;
     precinctMap: Map<string, IPrecinct>;
     algorithmState: AlgorithmEnum;
     oldClusters: Map<string, ICluster>;
     newClusters: Map<string, ICluster>;
     phaseZeroArgs: PhaseZeroArgs;
     phaseZeroResults: PhaseZeroResult;
     phaseOneArgs: PhaseOneArgs;
     filterArgs: FilterArgs;
     algorithmPhase: AlgorithmEnum;
     phaseOneService: PhaseOneService;
     logs: string[];
 };
 
 const initialState: State = {
     selectedState: StateEnum.NOT_SET,
     stateId: null,
     precincts: Constants.EMPTY_PRECINCTS,
     precinctMap: new Map<string, IPrecinct>(),
     algorithmState: AlgorithmEnum.PHASE_0_1,
     oldClusters: new Map<string, ICluster>(),
     newClusters: new Map<string, ICluster>(),
     phaseZeroArgs: {
         populationThreshold: Constants.DEFAULT_THRESHOLD,
         electionType: ElectionEnum.PRES_16,
         voteThreshold: Constants.DEFAULT_THRESHOLD,
         stateType: StateEnum.NOT_SET
     },
     phaseZeroResults: null,
     phaseOneArgs: {
         numDistricts: Constants.DEFAULT_NUM_DISTRICTS,
         electionData: ElectionEnum.PRES_16,
         minPopulationPercent: Constants.DEFAULT_POP_PRECENT_MIN,
         maxPopulationPercent: Constants.DEFAULT_POP_PRECENT_MAX,
         selectedDemographics: new Set<DemographicEnum>(),
         compactnessOption: CompactnessEnum.GRAPH_THEORETICAL,
         politicalFairnessOption: PoliticalFairnessEnum.EFFICIENCY_GAP,
         populationEqualityOption: PopulationEqualityEnum.IDEAL,
         phaseTwoDepthHeuristic: PhaseTwoDepthEnum.STANDARD,
         numRetries: Constants.DEFAULT_PHASE_TWO_RETRIES,
         objectivePopulationEquality: Constants.DEFAULT_OF_VALUE,
         objectiveCompactness: Constants.DEFAULT_OF_VALUE,
         objectivePartisanFairness: Constants.DEFAULT_OF_VALUE,
         objectiveContiguity: Constants.DEFAULT_OF_VALUE,
         intermediateResults: false
     },
     filterArgs: {
         viewLevel: ViewLevelEnum.OLD_DISTRICTS,
         mapFilter: MapFilterEnum.DEFAULT
     },
     algorithmPhase: AlgorithmEnum.PHASE_0_1,
     phaseOneService: null,
     logs: []
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
         case SET_OLD_CLUSTERS:
             return {
                 ...state,
                 oldClusters: action.oldClusters
             }
         case SET_NEW_CLUSTERS:
             return {
                 ...state,
                 newClusters: action.newClusters
             }
         case SET_PHASE_ONE_SERVICE:
             return {
                 ...state,
                 phaseOneService: action.phaseOneService
             }
         case SET_LOGS:
            return {
                ...state,
                logs: action.logs
            }
         default:
             return state;
     }
 }