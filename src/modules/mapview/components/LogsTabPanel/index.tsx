import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles.scss';
import { Button } from 'react-bootstrap';

interface ILogsTabPanelProps {
    logs: string[];
    setLogs(logs: string[]): void;
}

export class LogsTabPanelComponent extends React.Component<ILogsTabPanelProps, {}> {
    render() {
        return (
            <div className='px-3'>
                <h4>District Statistics</h4>
                <div className="mx-2">
                    <h6>Republican Districts: 5</h6>
                    <h6>Democratic Districts: 5</h6>
                </div>

                <br />

                <h4>Debug Console</h4>
                <textarea className='console' value={this.props.logs ? this.props.logs.join('\n') : ''}></textarea>
                <br />
                <Button className='mb-3' onClick={this.clearLogs.bind(this)}>Clear</Button>
            </div>
        )
    }

    private clearLogs() {
        this.props.setLogs([]);
    }
}

function mapStateToProps(state: any) {
    return {
        logs: state.stateReducer.logs,
        setLogs: state.stateReducer.setLogs
    };
}

export const LogsTabPanel = connect(
    (state: any) => {
        return mapStateToProps(state);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(LogsTabPanelComponent);
