import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const RegionSpreadsheetHeader = (props) => {
    const clickDisabled = () => {};
    console.log("INSIDE HEADER")
    console.log(props)

    const undoOptions ={
        className: !props.canUndo ? ' table-header-button-disabled ' : 'table-header-button',
        onClick: !props.canUndo  ? clickDisabled : props.undo,
        wType: "texted", 
        clickAnimation: !props.canUndo ? "" : "ripple-light",  
        shape: "rounded"
    }

    const redoOptions = {
        className: !props.canRedo ? ' table-header-button-disabled ' : 'table-header-button ',
        onClick: !props.canRedo   ? clickDisabled : props.redo, 
        wType: "texted", 
        clickAnimation: !props.canRedo ? "" : "ripple-light" ,
        shape: "rounded"
    }
    return ( 
        <WRow className="table-header">
            <WCol size="2">
                <WButton className="addRegion" WType ="texted" shape="rounded">
                <i className="material-icons" onClick={props.addRegion}>add_box</i>
                </WButton>
            </WCol>
            <WCol size="2">
                <WButton {...undoOptions}>
                <i className="material-icons">undo</i>
                </WButton>
            </WCol>
            <WCol size="2">
                <WButton {...redoOptions}>
                <i className="material-icons">redo</i>
                </WButton>
            </WCol>
            <WCol size="6">
                 <p className="regionHeader">Region Name: {props.parent ? props.parent.name : ""}</p>
            </WCol>

        </WRow>
    )


};
export default RegionSpreadsheetHeader