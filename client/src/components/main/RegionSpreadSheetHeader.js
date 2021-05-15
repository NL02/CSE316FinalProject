import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const RegionSpreadsheetHeader = (props) => {
    const clickDisabled = () => { };

    // undo and redo functionns 
    return ( 
        <WRow className="table-header">
            <WCol size="2">
                <WButton>
                <i className="material-icons">add_box</i>
                </WButton>
            </WCol>
            <WCol size="2">
                <WButton>
                <i className="material-icons">undo</i>
                </WButton>
            </WCol>
            <WCol size="2">
                <WButton>
                <i className="material-icons">redo</i>
                </WButton>
            </WCol>
            <WCol size="6">
                RegionName: <div>parent name</div>
            </WCol>

        </WRow>
    )


};
export default RegionSpreadsheetHeader