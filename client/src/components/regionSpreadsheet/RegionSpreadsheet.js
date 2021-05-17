import Logo 							from '../navbar/Logo';
import Login                            from '../modals/Login';
import CreateAccount 					from '../modals/CreateAccount';
import Update                           from '../modals/Update';
import CreateMap                        from '../modals/CreateMap';
import DeleteMap                        from '../modals/DeleteMap'
import Landing                          from '../main/Landing';
import NavbarOptions 					from '../navbar/NavbarOptions';
import RegionContents                   from '../main/RegionContents';
import { GET_DB_MAPS}                   from '../../cache/queries'
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import * as mutations                   from '../../cache/mutations'
import{ Link, useHistory, useParams }                          from "react-router-dom";
import { WNavbar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WButton } from 'wt-frontend';

const RegionSpreadsheet = (props) => {
    const auth = props.user === null ? false : true;
    let RegionList = [];
    let RegionData = [];

    const {name} = useParams();
    console.log(props)
    const [activeRegion, setActiveRegion]         = useState({})
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
    const [showUpdate, toggleShowUpdate] 	= useState(false);
    const [showCreateMap, toggleShowCreateMap] = useState(false);
    const [showDeleteMap, toggleShowDeleteMap] = useState(false);
    const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);
    if (loading) { console.log(loading, 'loading');}
    if (error) { console.log(error, 'error');}
    if (data) {
        console.log(name)
        console.log(data)
        for (let map of data.getAllMaps) {
            if (map._id === name) {
                RegionList.push(map)
            }
        }
        for (let region of RegionList[0].regions) {
            RegionData.push(region)
        }
    }
    const loadRegionList = (list) => {
        props.tps.clearAllTransaction();
        setActiveRegion(list)
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
    const setShowCreateMap = () => {
        toggleShowDeleteMap(false);
		toggleShowLogin(false);
		toggleShowCreate(false);
        toggleShowUpdate(false)
        toggleShowCreateMap(!showCreateMap);
    }

    const [AddRegion]                = useMutation(mutations.ADD_REGION);

    const createNewRegion = async () => {
        let parent = RegionList[0]
        const newRegion=  {
            _id: '',
            name: 'No Name',
            capital: 'No Capital',
            leader: 'No Leader', 
            landmark: [],
            parentId: parent._id,
        }
        let opcode = 1; 
        let itemID = newRegion._id;
        let parentId = parent._id;
        // let transaction = new AddSubRegion_Transaction(parentID, itemID, newSubRegion, opcode, AddSubRegion)
        const { data } = await AddRegion({ variables: { region: newRegion }, refetchQueries: [{ query: GET_DB_MAPS }] });
        if (data) {
            console.log(data)
        }
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
							reloadTodos={refetch} 			setActiveMap={loadRegionList}
						/>
					</ul>
				</WNavbar>
			</WLHeader>
            <WLMain>
                    {
                        auth ?
                            <div className="container-secondary">
                                {/* <MapContents 
                                mapData={MapData} auth={auth}   
                                setShowCreateMap={setShowCreateMap} setShowDeleteMap={setShowDeleteMap}
                                setLookingAt={setLookingAt} handleMapSelection={handleMapSelection}
                                // updateMapName={updateMapName}
                                activeMap={activeMap}
                                />  */}
                                <RegionContents 
                                RegionParent={RegionList[0]} addRegion={createNewRegion}
                                RegionData={RegionData} auth={auth}
                                // set delete confirmation
                                // sorting
                                // adding maps
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
             {/*Delete map will become delete Subregion  */}
            {/* {   
                showDeleteMap && (<DeleteMap fetchUser={props.fetchUser} setShowDeleteMap={setShowDeleteMap} activeMap={activeMap} user={props.user}/>)
            } */}
        </WLayout>
    );
}

export default RegionSpreadsheet;