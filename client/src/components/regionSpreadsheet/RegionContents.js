import React            from 'react';
import RegionEntry         from './RegionEntry';
import RegionSpreadSheetHeader from './RegionSpreadSheetHeader'
import {WLayout, WLHeader, WLMain, WRow, WCol} from 'wt-frontend';

const RegionContents = (props) => {
    console.log("THIS IS REGIONS ")
    console.log(props.RegionData)
    return (
        <div className=' table-entries container-primary '>
            <RegionSpreadSheetHeader 
            parent={props.RegionParent} addRegion={props.addRegion}
            undo={props.undo} redo={props.redo}
            canUndo={props.canUndo} canRedo={props.canRedo}
            />
            
            <WLayout wLayout="header">
                <WLHeader className="regionHeader mapName" style={{ backgroundColor: "salmon"}}>
                    <WRow>
                        <WCol size="1">
                        </WCol>
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
                        <WCol size="3">
                            Landmarks
                        </WCol>
                    </WRow>
                </WLHeader>
                <WLMain style={{ backgroundColor: "ivory"}}>
                {
                 props.RegionData.map((entry, index) => (
                     <RegionEntry 
                     data={entry} key={entry._id} index={index}
                     editItem={props.editItem} deleteItem={props.deleteItem}
                     />
                 ))   
                }
                </WLMain>
            </WLayout>
        </div>
    );
};

export default RegionContents