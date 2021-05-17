import React            from 'react';
import MapEntry         from './MapEntry';
import {WLayout, WLHeader, WLSide, WLMain, WLFooter} from 'wt-frontend';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import globe from "../../media/redGlobe.png"


const MapContents = (props) => {
    return (
        <div className='container-primary'>
    
            <WLayout wLayout="header-rside" className="mapContainer">
                <WLHeader classname="enter">
                    <p className="mapHeader">Your Maps</p>
                </WLHeader>
                <WLSide side="right" style={{ backgroundColor: "gainsboro", overflow:"auto"}}>
                    <div>
                    <WLayout wLayout="footer">
                    <WLMain>
                        <div>
                            <img src={globe} className="sideGlobe"></img>
                        </div>
                    </WLMain>
                    <WLFooter>
                        <WButton onClick={props.setShowCreateMap}>
                            Create New Map
                        </WButton>
                    </WLFooter>
                   </WLayout>
                   </div>
                </WLSide>
                <WLMain style={{ backgroundColor: "lightcoral"}}>
                {
                    props.mapData.map((entry, index) => (
                        <MapEntry
                            data={entry} key={entry._id} mapData={props.mapData} index={index}
                            setShowDeleteMap={props.setShowDeleteMap} setLookingAt={props.setLookingAt}
                            handleMapSelection={props.handleMapSelection}
                            // editItem={props.editItem}   reorderItem={props.reorderItem}
                        />
                    ))
                }   
                </WLMain>
            </WLayout>
        </div>
    );
};

export default MapContents