import React, { useState } from 'react';
import { WRow, WCol, WButton} from 'wt-frontend';

const MapEntry = (props) => {
    const { data } = props;

    const name = data.name;

    const handleDelete = async (e) => {
        // console.log(e.target.id)
        props.setShowDeleteMap()
        props.setLookingAt(e.target.id)
        console.log(props)
    }
    return (
        <WRow className="table-entry">
            <WCol size="9">
                <div>{name}</div>
            </WCol>
            <WCol size="3">
                <WButton className="table-entry-buttons" onClick={handleDelete} wType="texted">
                    <i id={data._id}className="material-icons">delete</i>
                </WButton>
            </WCol>
        </WRow>
    )
    
};

export default MapEntry