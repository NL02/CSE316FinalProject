import React, { useState } 	from 'react';
import { UPDATE, LOGOUT }			from '../../cache/mutations';
import { useMutation, useApolloClient }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const Update = (props) => {
	const [input, setInput] = useState({ email: '', password: '', firstName: '', lastName: '' });
	const [loading, toggleLoading] = useState(false);
    const [userValues, toggleVal] = useState(true);
	const [Update] = useMutation(UPDATE);
    const [Logout] = useMutation(LOGOUT)
    const client = useApolloClient();
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleUpdateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
		const { loading, error, data } = await Update({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
            toggleVal(false);
			// if(data.register.email === 'already exists') {
			// 	alert('User with that email already registered');
			// }
			// else {
			// 	props.fetchUser();
			// }
            // Logout();
            let reset = await client.resetStore();
            // if (reset) props.setActiveList({});

			props.setShowUpdate(false);

		};
	};
    const testingVal = async (e) => {
        console.log(props);
    }
	return (
		<WModal className="signup-modal"  cover="true" visible={props.setShowUpdate}>
			<WMHeader  className="modal-header" onClose={() => props.setShowUpdate(false)}>
				Update Account Information
			</WMHeader>

			{   
				loading ? <div />
					: <WMMain>
							<WRow className="modal-col-gap signup-modal">
								<WCol size="6">
									<WInput 
										className="" onBlur={updateInput} name="firstName" labelAnimation="up" 
										barAnimation="solid" labelText={"First Name"} wType="outlined" inputType="text" 
                                        placeholderText={userValues ? props.user.firstName : ""}
									>
                                    </WInput>
								</WCol>
								<WCol size="6">
									<WInput 
										className="" onBlur={updateInput} name="lastName" labelAnimation="up" 
										 labelText="Last Name" wType="outlined" inputType="text"
                                        placeholderText={userValues ? props.user.lastName : ""} 
									/>
								</WCol>
							</WRow>

							<div className="modal-spacer">&nbsp;</div>
							<WInput 
								className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
								barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" 
                                placeholderText={userValues ? props.user.email : ""}
							/>
							<div className="modal-spacer">&nbsp;</div>
							<WInput 
								className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
								barAnimation="solid" labelText="Password" wType="outlined" inputType="password" 
                                placeholderText="******"
							/>
					</WMMain>
			}
			<WMFooter>
				<WButton className="modal-button" onClick={handleUpdateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Submit
				</WButton>
			</WMFooter>
			
		</WModal>
	);
}

export default Update;
