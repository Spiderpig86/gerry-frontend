import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles.scss';

interface ILogsTabPanelProps {
    logs: string[];
}

export class LogsTabPanelComponent extends React.Component<ILogsTabPanelProps, {}> {
    render() {
        return (
            <div className='px-3'>
                <h4>District Statistics</h4>
                <h6>Republican Districts: 5</h6>
                <h6>Democratic Districts: 5</h6>

                <br />

                <h4>Debug Console</h4>
                <textarea className='console' value={this.props.logs.join('\n')}></textarea>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        logs: state.stateReducer.logs
    };
}

export const LogsTabPanel = connect(
    (state: any) => {
        return mapStateToProps(state);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(LogsTabPanelComponent);
