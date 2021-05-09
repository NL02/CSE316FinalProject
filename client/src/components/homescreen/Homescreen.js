import Logo 							from '../navbar/Logo';
import Login                            from '../modals/Login';
import CreateAccount 					from '../modals/CreateAccount';
import Update                           from '../modals/Update';
import CreateMap                        from '../modals/CreateMap';
import DeleteMap                        from '../modals/DeleteMap'
import Landing                          from '../main/Landing';
import NavbarOptions 					from '../navbar/NavbarOptions';
import MapContents                      from '../main/MapContents';
import { GET_DB_MAPS}                   from '../../cache/queries'
import React, { useState } 				from 'react';
import { useQuery }                     from '@apollo/client';
import{ Link }                          from "react-router-dom";
// import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WButton } from 'wt-frontend';

const Homescreen = (props) => {
    const auth = props.user === null ? false : true;
    let maplists = [];
    let MapData = [];
    const [activeMap, setActiveMap]         = useState({})
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
    const [showUpdate, toggleShowUpdate] 	= useState(false);
    const [showCreateMap, toggleShowCreateMap] = useState(false);
    const [showDeleteMap, toggleShowDeleteMap] = useState(false);
    const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);
    
    if (loading) { console.log(loading, 'loading');}
    if (error) { console.log(error, 'error');}
    if (data) {
        // Assign maplists
        for (let map of data.getAllMaps) {
            maplists.push(map)
        }
        console.log(props.user)
        for(let map of maplists) {
            if (map) {
                MapData.push({_id: map._id, name: map.name})
            }
        }
    }
    const loadMapList = (list) => {
        props.tps.clearAllTransaction();
        setActiveMap(list)
    }

    const setShowLogin = () => {
		toggleShowDeleteMap(false);
		toggleShowCreate(false);
        toggleShowUpdate(false);
        toggleShowCreateMap(false);
		toggleShowLogin(!showLogin);
	};

    const setShowCreate = () => {
		toggleShowDeleteMap(false);
		toggleShowLogin(false);
        toggleShowUpdate(false);
        toggleShowCreateMap(false);
		toggleShowCreate(!showCreate);
	};

	const setShowDeleteMap = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
        toggleShowUpdate(false);
        toggleShowCreateMap(false);
		toggleShowDeleteMap(!showDeleteMap)
	};

    const setShowUpdate = () => {
        toggleShowDeleteMap(false);
		toggleShowLogin(false);
		toggleShowCreate(false);
        toggleShowCreateMap(false);
        toggleShowUpdate(!showUpdate)
    }
    const setShowCreateMap =() => {
        toggleShowDeleteMap(false);
		toggleShowLogin(false);
		toggleShowCreate(false);
        toggleShowUpdate(false)
        toggleShowCreateMap(!showCreateMap);
    }
    // method that handles when clicking on a map and changing the route to the map's region
    const setLookingAt = (listId) => {
        setActiveMap(listId)
    }
    return ( 
        <WLayout wLayout="header">
            <WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
                            <Link to="/home">
							<Logo className='logo' />
                            </Link>
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} 	auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
                            setShowUpdate={setShowUpdate}   
							reloadTodos={refetch} 			setActivemap={loadMapList}
						/>
					</ul>
				</WNavbar>
			</WLHeader>
            <WLMain>
                    {
                        auth ?
                            <div className="container-secondary">
                                <MapContents 
                                mapData={MapData} auth={auth}   
                                setShowCreateMap={setShowCreateMap} setShowDeleteMap={setShowDeleteMap}
                                setLookingAt={setLookingAt}
                                // createNewMap={createNewMap}     updateMapName={updateMapName}
                                activeMap={activeMap}
                                /> 
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
            {
                showCreateMap && (<CreateMap fetchUser={props.fetchUser} setShowCreateMap={setShowCreateMap} user={props.user}/>)
            }
            {   
                showDeleteMap && (<DeleteMap fetchUser={props.fetchUser} setShowDeleteMap={setShowDeleteMap} activeMap={activeMap} user={props.user}/>)
            }
        </WLayout>
    );
}

export default Homescreen;