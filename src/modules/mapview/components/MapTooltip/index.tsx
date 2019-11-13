import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/maptooltip/maptooltip';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles.scss';

export interface IMapTooltipProps {
    title: string;
    subtitle: string;
    statistics: { key: string; value: number }[];
}

export interface IMapTooltipState {
    total: number;
}

class MapTooltipComponent extends React.PureComponent<IMapTooltipProps, {}> {

    render() {
        const total = this.props.statistics ? this.props.statistics.reduce((total, obj) => total + Number(obj.value), 0) : 1;
        return (
            <div className="map-tooltip">
                <h6>{ this.props.title || 'Statistics' }</h6>
                <p><b>{ this.props.subtitle || 'Hover over a precinct to begin.' }</b></p>
                {
                    this.props.statistics && this.props.statistics.map((stat: any, i: number) => {
                        return (
                            <p key={i}>{ stat.key }: { stat.value.toLocaleString() } ({ (stat.value * 100 / total).toFixed(2) }%)</p>
                        )
                    })
                }
            </div>
        );
    }
}

export const MapTooltip = connect(
    (state: any) => {
        return ({ ...state.mapTooltipReducer.tooltipData })
    },
    (dispatch) => bindActionCreators(mapActionCreators, dispatch)
)(MapTooltipComponent);