import React, { useState } from 'react';
import { WRow, WCol, WButton, WInput} from 'wt-frontend';

const RegionEntry = (props) => {
    const data = props.data
    let availableLandmarks = props.data? props.data.landmark.length > 0 : false
    const name = props.data.name;
    const capital = props.data.capital;
    const leader = props.data.leader;
    const landmark = props.data.landmark

    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);
    const handleDeleteRegion = (e) => {
        props.deleteItem(e.target.id, name, capital, leader, landmark, props.index)
    }
    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : "No Name";
        const prevName = name;
        if (newName !== prevName) {
            props.editItem(data._id, "name", newName, prevName)
        }
    }

    const handleCapitalEdit = (e) => {
        toggleCapitalEdit(false);
        const newCapital = e.target.value ? e.target.value : "No Capital";
        const prevCapital = capital;
        if (newCapital !== prevCapital) {
            props.editItem(data._id, "capital", newCapital, prevCapital)
        }
    }

    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : "No Leader";
        const prevLeader = leader;
        if (newLeader !== prevLeader) {
            props.editItem(data._id, "leader", newLeader, prevLeader)
        }
    }

    


    return (
        <WRow className="table-entry mapName" >
            <WCol size="1">
                <WButton className="table-entry-buttons"  wType="texted" onClick={handleDeleteRegion}>
                    <i id={data._id}className="material-icons mapName">X</i>
                </WButton>
            </WCol>
            <WCol size="2">
                {
                    editingName || name === ''
                        ? <WInput
                            className='table-input' onBlur={handleNameEdit}
                            autoFocus={true} defaultValue={name} type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleNameEdit(!editingName)}
                        >{name}
                        </div>
                }
            </WCol>
            <WCol size="2">
            {
                    editingCapital || capital === ''
                        ? <WInput
                            className='table-input' onBlur={handleCapitalEdit}
                            autoFocus={true} defaultValue={capital} type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleCapitalEdit(!editingCapital)}
                        >{capital}
                        </div>
                }
            </WCol>
            <WCol size="2">
            {
                    editingLeader || leader === ''
                        ? <WInput
                            className='table-input' onBlur={handleLeaderEdit}
                            autoFocus={true} defaultValue={leader} type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleLeaderEdit(!editingLeader)}
                        >{leader}
                        </div>
                }
            </WCol>
            <WCol size="2">
                Flag
            </WCol>
            <WCol size="3">
                {  availableLandmarks ? landmark : " Add Some Landmarks!"}
            </WCol>
        </WRow>
    )
    
};

export default RegionEntry