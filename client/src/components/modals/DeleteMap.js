import React, { useState }  from 'react';
import { DELETE_MAP }          from '../../cache/mutations';
import { useMutation }      from '@apollo/client';
import { GET_DB_MAPS } from '../../cache/queries';
import { WModal, WMHeader, WMMain, WInput, WMFooter, WButton } from 'wt-frontend';

const DeleteMap = (props) => {
    const [DeleteMap] = useMutation(DELETE_MAP);

    const handleDeleteMap = async (e) => {
        console.log(props.activeMap)
        DeleteMap({variables: {_id: props.activeMap, refetchQueries: [{ query: GET_DB_MAPS}] }})
        props.fetchUser();
        props.setShowDeleteMap(false);
    }

    return ( 
        <WModal className="signup-modal"  cover="true" visible={props.setShowDeleteMap}>
			<WMHeader  className="modal-header" onClose={() => props.setShowDeleteMap(false)}>
				Delete Map?
			</WMHeader>
			<WMFooter>
				<WButton className="modal-button" onClick={handleDeleteMap} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Confirm Deleting Map
				</WButton>
			</WMFooter>
			
		</WModal>

    );
}
export default DeleteMap