import * as React from 'react';

export class MapNavbar extends React.PureComponent {

    private navBarStyle: React.CSSProperties = {
        alignItems: 'center',
        backgroundColor: 'rgba(225, 225, 225, 0.75)',
        // backdropFilter: 'blur(20px) saturate(180%)',
        display: 'flex',
        height: '3.75rem',
        justifyContent: 'center', 
        position: 'absolute',
        top: '0',
        width: '100%',
        zIndex: 999
    };

    render() {
        return (
            <div style={this.navBarStyle}>
                <h3>Gerry</h3>
            </div>
        )
    }

}