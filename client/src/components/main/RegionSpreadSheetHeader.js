import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const RegionSpreadsheetHeader = (props) => {
    const clickDisabled = () => {};
    console.log("INSIDE HEADER")
    console.log(props)
    // undo and redo functionns 
    return ( 
        <WRow className="table-header">
            <WCol size="2">
                <WButton>
                <i className="material-icons" onClick={props.addRegion}>add_box</i>
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
                 <p>Region Name: {props.parent ? props.parent.name : ""}</p>
            </WCol>

        </WRow>
    )


};
export default RegionSpreadsheetHeader