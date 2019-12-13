import * as stateReducer from '../redux/modules/state/state';
import * as Constants from '../config/constants';

import Axios from 'axios';

import { WebSocketHandler } from './ws';
import { StateEnum, IPrecinct, ElectionEnum, ICluster } from '../models';
import { hashPrecinct } from './functions/hash';
import { ModelMapper } from './mapping/model-mapper';

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
        // this.precincts.features = Array.from(this.precinctMap.values());
        // this.dispatch(stateReducer.setPrecinctDataCreator(this.precincts));
        this.dispatch(stateReducer.setPrecinctMap(this.precinctMap));
        this.dispatch(stateReducer.selectState(this.state));
    }

    private updateStateReducerPrecincts(message: any[]): void {
        for (let i = 0; i < message.length; i++) {
            const shape = message[i];
            this.precinctMap.set(hashPrecinct(shape.properties), { originalCdId: shape.properties.cd, ...shape });
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
                    id: district.id,
                    name: district.name,
                    nodeType: district.nodeType,
                    type: district.type,
                    incumbent: '',
                    objectiveFunctionScores: null,
                    demographicData: {
                        ...district.demographicData,
                        population: ModelMapper.toIDemographic(district.demographicData.population)
                    },
                    electionData: {
                        presidential16: ModelMapper.toIVote(district.electionData),
                    } as any
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
            this.dispatch(stateReducer.setOldClusters(districtClusters));
        });
    }

    public async getStatisticsByElection(state: StateEnum, election: ElectionEnum): Promise<any> {
        return await Axios.get(`${Constants.APP_API}/states/original/${this.URL_MAPPINGS.get(state)}/${this.URL_MAPPINGS.get(election)}`);
    }
}
