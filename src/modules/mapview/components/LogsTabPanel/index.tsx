import * as React from 'react';

import './styles.scss';

export class LogsTabPanel extends React.Component {
    render() {
        return (
            <div className='px-3' style={{ height:' 70vh' }}>
                <textarea className='console'></textarea>
            </div>
        )
    }
}