import * as React from 'react';

import './styles.scss';

export class LogsTabPanel extends React.Component {
    render() {
        return (
            <div className='px-3'>
                <textarea className='console'></textarea>
                <div className="px-3">
                    <h1>34.54/40.00</h1>
                    <h6 className='font-bold text-uppercase'>Objective Function Score</h6>
                </div>
            </div>
        )
    }
}