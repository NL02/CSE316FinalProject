import React            from 'react';
import MapEntry         from './MapEntry';
import RegionSpreadSheetHeader from './RegionSpreadSheetHeader'
import {WLayout, WLHeader, WLSide, WLMain, WLFooter, WButton, WRow, WCol} from 'wt-frontend';

const RegionContents = (props) => {
    console.log("THIS IS REGIONS ")
    console.log(props)
    return (
        <div className=' table-entries container-primary '>
            <RegionSpreadSheetHeader></RegionSpreadSheetHeader>
            
            <WLayout wLayout="header">
                <WLHeader style={{ backgroundColor: "salmon"}}>
                    <WRow>
                        <WCol size="2">
                            Name
                        </WCol>
                        <WCol size="2">
                            Capital
                        </WCol>
                        <WCol size="2">
                            Leader
                        </WCol>
                        <WCol size="2">
                            Flag
                        </WCol>
                        <WCol size="4">
                            Landmarks
                        </WCol>
                    </WRow>
                </WLHeader>
                <WLMain style={{ backgroundColor: "ivory"}}>
                {/* {
                    props.mapData.map((entry) => (
                        <MapEntry
                            data={entry} key={entry._id} mapData={props.mapData}
                            setShowDeleteMap={props.setShowDeleteMap}  setLookingAt={props.setLookingAt}
                            handleMapSelection={props.handleMapSelection}
                            // editItem={props.editItem}   reorderItem={props.reorderItem}
                        />
                    ))
                }    */}
                {
                    
                }
                </WLMain>
            </WLayout>
        </div>
    );
};

export default RegionContents