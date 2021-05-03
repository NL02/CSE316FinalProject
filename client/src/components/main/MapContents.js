import React            from 'react';
import MapEntry         from './MapEntry';
import {WLayout, WLHeader, WLSide, WLMain, WLFooter} from 'wt-frontend';
import WButton from 'wt-frontend/build/components/wbutton/WButton';

const MapContents = (props) => {
    return (
        <div className=' table-entries container-primary '>
    
            <WLayout wLayout="header-rside">
                <WLHeader style={{ backgroundColor: "salmon"}}>
                Your Maps
                </WLHeader>
                <WLSide side="right" style={{ backgroundColor: "lightskyblue", overflow:"auto"}}>
                    <div>
                    <WLayout wLayout="footer">
                    <WLMain style={{ backgroundColor: "ivory"}}>Insert Globe</WLMain>
                    <WLFooter style={{ backgroundColor: "aquamarine"}}>
                        <WButton onClick={props.setShowCreateMap}>
                            Create New Map
                        </WButton>
                    </WLFooter>
                   </WLayout>
                   </div>
                </WLSide>
                <WLMain style={{ backgroundColor: "ivory"}}>
                insert maps 
                {
                    props.mapData.map((entry) => (
                        <MapEntry
                            data={entry} key={entry._id} mapData={props.mapData}
                            setShowDeleteMap={props.setShowDeleteMap}  setLookingAt={props.setLookingAt}
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