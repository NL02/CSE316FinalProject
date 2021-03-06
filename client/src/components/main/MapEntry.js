import React, { useState } from 'react';
import { WRow, WCol, WButton} from 'wt-frontend';

const MapEntry = (props) => {
    const { data } = props;

    const name = data.name;
    console.log(props)
    const handleDelete = async (e) => {
        // console.log(e.target.id)
        props.setShowDeleteMap()
        props.setLookingAt(e.target.id)
        console.log(props)
    }
    const handleMapSelection = async (e) => {

        props.handleMapSelection(props.data._id)
    }

    return (
        <WRow className="table-entry mapName" >
            <WCol size="9" >
                <div onClick={handleMapSelection}>{name}</div>
            </WCol>
            <WCol size="3">
                <WButton className="table-entry-buttons mapName" onClick={handleDelete} wType="texted">
                    <i id={data._id}className="material-icons">delete</i>
                </WButton>
            </WCol>
        </WRow>
    )
    
};

export default MapEntry