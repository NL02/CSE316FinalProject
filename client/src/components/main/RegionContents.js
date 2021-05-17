import React            from 'react';
import RegionEntry         from './RegionEntry';
import RegionSpreadSheetHeader from './RegionSpreadSheetHeader'
import {WLayout, WLHeader, WLMain, WRow, WCol} from 'wt-frontend';

const RegionContents = (props) => {
    console.log("THIS IS REGIONS ")
    console.log(props.RegionData)
    return (
        <div className=' table-entries container-primary '>
            <RegionSpreadSheetHeader parent={props.RegionParent} addRegion={props.addRegion}></RegionSpreadSheetHeader>
            
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
                    props.mapData.map((entry, index) => (
                        <MapEntry
                            data={entry} key={entry._id} mapData={props.mapData} index={index}
                            setShowDeleteMap={props.setShowDeleteMap} setLookingAt={props.setLookingAt}
                            handleMapSelection={props.handleMapSelection}
                            // editItem={props.editItem}   reorderItem={props.reorderItem}
                        />
                    ))
                } */}
                {
                 props.RegionData.map( (entry, index) => {
                     <RegionEntry 
                     data={entry} key={entry._id} index={index}
                     />
                 })   
                }
                </WLMain>
            </WLayout>
        </div>
    );
};

export default RegionContents