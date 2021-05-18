import Logo 							from '../navbar/Logo';
import Login                            from '../modals/Login';
import CreateAccount 					from '../modals/CreateAccount';
import Update                           from '../modals/Update';
import CreateMap                        from '../modals/CreateMap';
import Landing                          from '../main/Landing';
import NavbarOptions 					from '../navbar/NavbarOptions';
import RegionContents                   from './RegionContents';
import { GET_DB_MAPS}                   from '../../cache/queries'
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import * as mutations                   from '../../cache/mutations'
import{ Link, useParams }                          from "react-router-dom";
import { WNavbar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain} from 'wt-frontend';
import { 
	EditItem_Transaction } 				from '../../utils/jsTPS';

const RegionSpreadsheet = (props) => {
    const auth = props.user === null ? false : true;
    let RegionList = [];
    let RegionData = [];

    const {name} = useParams();
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
        // console.log(name)
        // console.log(data)
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


    const reloadRegion = async () => {
        setActiveRegion()
    }
    const mutationOptions = {
		refetchQueries: [{ query: GET_DB_MAPS }], 
		awaitRefetchQueries: true,
        reloadRegion
	}
    const [canUndo, setCanUndo]     = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo]     = useState(props.tps.hasTransactionToRedo());
    const [UpdateItemField]         = useMutation(mutations.UPDATE_ITEM_FIELD, mutationOptions)
    const [AddRegion]               = useMutation(mutations.ADD_REGION, mutationOptions);
    const [DeleteRegion]            = useMutation(mutations.DELETE_REGION, mutationOptions)


    const tpsUndo = async () => {
		const ret = await props.tps.undoTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

    const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

    const handleEditItem = async(itemID, field, value, prev) => {
        let transaction = new EditItem_Transaction(name, itemID, field, value, prev, UpdateItemField);
        props.tps.addTransaction(transaction)
        tpsRedo();
    }
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
        // let transaction = new UpdateMapRegions_Transaction(name, itemID, newSubRegion, opcode, AddSubRegion)
        const { data } = await AddRegion({ variables: { region: newRegion }, refetchQueries: [{ query: GET_DB_MAPS }] });
        if (data) {
            console.log(data)
        }
    }
    const handleDeleteItem = async(regionid, regionName, capital, leader, landmark, index) => {
        // let opcode = 0
        // let regionToDelete = {
        //     _id: regionId,
        //     name: regionName,
        //     capital: capital,
        //     leader: leader,
        //     landmark: landmark
        // }
        // let transaction = new UpdateMapRegions_Transaction(name, regionID, regionToDelete, 
        //     opcode, AddRegionItem, DeleteRegionItem, index);
        // props.tps.addTransaction(transaction);
        // tpsRedo(); 
        const { data } = await DeleteRegion({variables: {mapId: name, regionId: regionid}, refetchQueries: [{ query: GET_DB_MAPS }]})
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
                                <RegionContents 
                                RegionParent={RegionList[0]} addRegion={createNewRegion}
                                editItem={handleEditItem} deleteItem={handleDeleteItem}
                                canUndo={canUndo} canRedo={canRedo}
                                undo={tpsUndo}  redo={tpsRedo}
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