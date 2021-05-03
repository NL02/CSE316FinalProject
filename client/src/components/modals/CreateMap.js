import React, { useState }  from 'react';
import { ADD_MAP }          from '../../cache/mutations';
import { useMutation }      from '@apollo/client';
import { GET_DB_MAPS } from '../../cache/queries';
import { WModal, WMHeader, WMMain, WInput, WMFooter, WButton } from 'wt-frontend';

const CreateMap = (props) => {
    const [input, setInput] = useState({ name: ''});
    const [loading, toggleLoading] = useState(false);
    const [AddMap] = useMutation(ADD_MAP);

    const updateInput = (e) => {
        const { name, value } = e.target;
        const updated = { ...input, [name]: value};
        setInput(updated)
    }

    const handleCreateMap = async () => {
        for (let field in input) {
			if (!input[field]) {
				alert('Need a name to create map');
				return;
			}
		}
        console.log(input["name"])
        console.log(props.user._id)
        let mapCreated = {
            _id: '',
            name: input["name"],
            owner: props.user._id,
            regions: []
        }
        console.log(mapCreated)
        const { loading, error ,data } = await AddMap({ variables: { map: mapCreated }, refetchQueries:[{ query: GET_DB_MAPS }] });
        if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			toggleLoading(false);
			props.fetchUser();
			props.setShowCreateMap(false);
		};
    }

    return ( 
        <WModal className="signup-modal"  cover="true" visible={props.setShowCreateMap}>
			<WMHeader  className="modal-header" onClose={() => props.setShowCreateMap(false)}>
				Creating Map
			</WMHeader>

			{
				loading ? <div />
					: <WMMain>
							
							<WInput 
								className="modal-input" onBlur={updateInput} name="name" labelAnimation="up" 
								barAnimation="solid" labelText="Map Name" wType="outlined" inputType="text" 
							/>
					</WMMain>
			}
			<WMFooter>
				<WButton className="modal-button" onClick={handleCreateMap} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Submit
				</WButton>
			</WMFooter>
			
		</WModal>

    );
}
export default CreateMap