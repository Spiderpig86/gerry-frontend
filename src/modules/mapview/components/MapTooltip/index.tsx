import * as React from 'react';

import './styles.scss';

export interface IMapTooltipProps {
    title: string;
    subtitle: string;
    statistics: { key: string; value: string }[];
}

export class MapTooltip extends React.PureComponent<IMapTooltipProps, {}> {

    render() {
        return (
            <div className="map-tooltip">
                <h6>{ this.props.title || 'Statistics' }</h6>
                <p><b>{ this.props.subtitle || 'Hover over a precinct to begin.' }</b></p>
                {
                    this.props.statistics && this.props.statistics.map((stat: any, i: number) => {
                        return (
                            <p key={i}>{ stat.key }: { stat.value }</p>
                        )
                    })
                }
            </div>
        );
    }
}