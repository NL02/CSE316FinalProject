import Logo 							from '../navbar/Logo';
import Login                            from '../modals/Login';
import CreateAccount 					from '../modals/CreateAccount';

import React, { useState } 				from 'react';
import NavbarOptions 					from '../navbar/NavbarOptions';
// import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';

const Homescreen = (props) => {
    const auth = props.user === null ? false : true;
    const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
    const [showGlobe, toggleShowGlobe]      = useState(false);

    const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

    const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};

	const setShowDelete = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(!showDelete)
	};

    return ( 
        <WLayout wLayout="header-lside">
            <WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' />
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} 	auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
							// reloadTodos={refetch} 			setActiveList={loadTodoList}
						/>
					</ul>
				</WNavbar>
			</WLHeader>
            {
                showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
            }
            {
                showLogin && (<Login fetchUser={props.fetchUser}  setShowLogin={setShowLogin} />)
            }
        </WLayout>
    );
}

export default Homescreen;