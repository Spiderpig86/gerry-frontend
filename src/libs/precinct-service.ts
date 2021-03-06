import * as stateReducer from '../redux/modules/state/state';
import * as Constants from '../config/constants';

import Axios from 'axios';

import { WebSocketHandler } from './ws';
import { StateEnum, IPrecinct, ElectionEnum, ICluster, ViewLevelEnum, AlgorithmEnum, ClusterProperties } from '../models';
import { hashPrecinct } from './functions/hash';
import { ModelMapper } from './mapping/model-mapper';
import { store } from '../index';

export class PrecinctService {
    private state: StateEnum;
    private dispatch: any;
    private handler: WebSocketHandler;
    private precincts: any;
    private precinctMap: Map<string, IPrecinct>;

    constructor(state: StateEnum, dispatch: any) {
        this.state = state;
        this.dispatch = dispatch;
        this.handler = new WebSocketHandler(
            this.generateUrl(state),
            this.onOpen.bind(this),
            this.onMessage.bind(this),
            this.onClose.bind(this)
        );
        this.precincts = Object.assign({}, Constants.EMPTY_PRECINCTS);
        this.precinctMap = new Map<string, IPrecinct>();
    }

    private generateUrl(state: StateEnum): string {
        return `${Constants.APP_API_WS}/${state}`;
    }

    private onOpen(): void {
        this.precincts.features = [];
        this.precinctMap = new Map<string, IPrecinct>();
    }

    private onMessage(event: any): void {
        const message = JSON.parse(event.data);
        // Array.prototype.push.apply(this.precincts.features, message);
        console.log(this.precinctMap.size)
        this.updateStateReducerPrecincts(message);
    }

    private onClose(): void {
        // Needed to set new precinct map used in service to run algorithm (when user runs phase 1 on one state, changes state, and runs phase 1 again)
        if (store.getState().stateReducer.phaseOneService) {
            console.log('SETTING');
            store.getState().stateReducer.phaseOneService.setPrecinctMap(this.precinctMap);
        }
        
        if (store.getState().stateReducer.phaseTwoService) {
            console.log('SETTING');
            store.getState().stateReducer.phaseTwoService.setPrecinctMap(this.precinctMap);
        }

        // this.precincts.features = Array.from(this.precinctMap.values());
        // this.dispatch(stateReducer.setPrecinctDataCreator(this.precincts));
        this.dispatch(stateReducer.setPrecinctMap(this.precinctMap));
        this.dispatch(stateReducer.selectState(this.state));
    }

    private updateStateReducerPrecincts(message: any[]): void {
        for (let i = 0; i < message.length; i++) {
            const shape = message[i];
            this.precinctMap.set(hashPrecinct(shape.properties), { originalCdId: shape.properties.cd, newCdId: 0, ...shape });
        }
    }

    private URL_MAPPINGS = new Map<String, String>([
        [StateEnum.CA, 'CALIFORNIA'],
        [StateEnum.VA, 'VIRGINIA'],
        [StateEnum.UT, 'UTAH'],
        [ElectionEnum.PRES_16, 'PRESIDENTIAL_2016'],
        [ElectionEnum.HOUSE_16, 'CONGRESSIONAL_2016'],
        [ElectionEnum.HOUSE_18, 'CONGRESSIONAL_2018']
    ]);

    public async getStateStatistics(state: StateEnum) {
        let stateCluster: ICluster = null;
        const districtClusters: Map<string, ICluster> = new Map<string, ICluster>();

        await Promise.all([
            this.getStatisticsByElection(state, ElectionEnum.PRES_16),
            this.getStatisticsByElection(state, ElectionEnum.HOUSE_16),
            this.getStatisticsByElection(state, ElectionEnum.HOUSE_18)
        ]).then(data => {
            console.log(data);
            const pres16 = data[0].data;
            const house16 = data[1].data;
            const house18 = data[2].data;

            // Create state cluster
            stateCluster = {
                ...pres16,
                children: [],
                demographicData: {
                    ...pres16.demographicData,
                    population: ModelMapper.toIDemographic(pres16.demographicData.population)
                },
                electionData: {
                    presidential16: ModelMapper.toIVote(pres16.electionData),
                    house16: ModelMapper.toIVote(house16.electionData),
                    house18: ModelMapper.toIVote(house18.electionData),
                }
            };
            this.dispatch(stateReducer.setStateData(stateCluster));

            // Create district clusters
            for (const district of pres16.children) {
                // Get district number as key
                const key = district.name.substring(1);
                
                const cluster: ICluster = {
                    numericalId: district.id,
                    name: district.name,
                    nodeType: district.nodeType,
                    type: district.type,
                    incumbent: district.incumbent && { name: district.incumbent.name, party: district.incumbent.party },
                    objectiveFunctionScores: null,
                    precinctNames: new Set<string>(),
                    demographicData: {
                        ...district.demographicData,
                        population: ModelMapper.toIDemographic(district.demographicData.population)
                    },
                    electionData: {
                        presidential16: ModelMapper.toIVote(district.electionData),
                    } as any,
                    isMajorityMinority: false
                };
                districtClusters.set(key, cluster);
            }

            for (const district of house16.children) {
                const key = district.name.substring(1);
                const districtData = districtClusters.get(key);
                districtData.electionData.house16 = ModelMapper.toIVote(district.electionData);
            }

            for (const district of house18.children) {
                const key = district.name.substring(1);
                const districtData = districtClusters.get(key);
                districtData.electionData.house18 = ModelMapper.toIVote(district.electionData);
            }

            // Reset program state
            this.dispatch(stateReducer.setOldClustersCreator(districtClusters));
            this.dispatch(stateReducer.setNewClustersCreator(new Map<string, ICluster>()));
            this.dispatch(stateReducer.setLevel(ViewLevelEnum.OLD_DISTRICTS));
            this.dispatch(stateReducer.setAlgorithmPhase(AlgorithmEnum.PHASE_0_1));
        });
    }

    public async getStatisticsByElection(state: StateEnum, election: ElectionEnum): Promise<any> {
        return await Axios.get(`${Constants.APP_API}/states/original/stats/${this.URL_MAPPINGS.get(state)}/${this.URL_MAPPINGS.get(election)}`);
    }
}
