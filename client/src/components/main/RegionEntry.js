import React, { useState } from 'react';
import { WRow, WCol, WButton} from 'wt-frontend';

const RegionEntry = (props) => {
    const { data } = props;

    const name = data.name;
    console.log("Spawn")
    // const handleDelete = async (e) => {
    //     // console.log(e.target.id)
    //     props.setShowDeleteMap()
    //     props.setLookingAt(e.target.id)
    //     console.log(props)
    // }
    // const handleMapSelection = async (e) => {

    //     props.handleMapSelection(props.data._id)
    // }

    return (
        <WRow className="table-entry" >
            <WCol size="2">
                Name dasduaib
            </WCol>
            <WCol size="2">
                Capital dsadasn
            </WCol>
            <WCol size="2">
                Leader
            </WCol>
            <WCol size="2">
                Flag
            </WCol>
            <WCol size="4">
                Landmarks
            </WCol>
        </WRow>
    )
    
};

export default RegionEntry