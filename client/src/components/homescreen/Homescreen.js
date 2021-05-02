import Logo 							from '../navbar/Logo';
import Login                            from '../modals/Login';
import CreateAccount 					from '../modals/CreateAccount';
import Update                           from '../modals/Update';
import Landing                          from '../main/Landing';
import NavbarOptions 					from '../navbar/NavbarOptions';

import { GET_DB_MAPS}                   from '../../cache/queries'
import React, { useState } 				from 'react';
import { useQuery }                     from '@apollo/client';
// import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WCard } from 'wt-frontend';

const Homescreen = (props) => {
    const auth = props.user === null ? false : true;
    let maplists = [];
    const [activeMap, setActiveMap]         = useState({})
    const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
    const [showUpdate, toggleShowUpdate] 	= useState(false);

    const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);
    
    if (loading) { console.log(loading, 'loading');}
    if (error) { console.log(error, 'error');}
    if (data) {
        // Assign maplists
        for (let map of data.getAllMaps) {
            maplists.push(map)
        }
        console.log(maplists)
    }
    const loadMapList = (list) => {
        props.tps.clearAllTransaction();
        setActiveMap(list)
    }

    const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
        toggleShowUpdate(false);
		toggleShowLogin(!showLogin);
	};

    const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
        toggleShowUpdate(false);
		toggleShowCreate(!showCreate);
	};

	const setShowDelete = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
        toggleShowUpdate(false);
		toggleShowDelete(!showDelete)
	};

    const setShowUpdate = () => {
        toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(false);
        toggleShowUpdate(!showUpdate)
    }
    // method that handles when clickignn on a map and changing the route to the map's region

    return ( 
        <WLayout wLayout="header">
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
                            setShowUpdate={setShowUpdate}   user={props.user}
							reloadTodos={refetch} 			setActivemap={loadMapList}
						/>
					</ul>
				</WNavbar>
			</WLHeader>
            <WLMain>
                    {
                        activeMap ?
                            <div className="container-secondary">
                                {/* <Map chosenregion={chosenregion}>

                                    </Map>  */}
                                    <Landing></Landing>
                            </div>
                            :
                            <div className="container-secondary"> 
                                <Landing></Landing>
                            </div>
                    }
            </WLMain>
            {
                showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
            }
            {
                showLogin && (<Login fetchUser={props.fetchUser}  setShowLogin={setShowLogin} />)
            }
            {
                showUpdate && (<Update fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} user={props.user}/>)
            }
        </WLayout>
    );
}

export default Homescreen;