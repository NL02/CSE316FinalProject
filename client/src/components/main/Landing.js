import React        from 'react';
import { WLayout, WLMain, WLFooter }    from 'wt-frontend';
import globe from "../../media/redGlobe.png"
const Landing = (props) => {
    return (
      
        <WLayout wLayout="footer" className="landing">
          <WLMain ><img src={globe}></img></WLMain>
          <WLFooter className="landingGlobe">Welcome To The World Data Mapper</WLFooter>
        </WLayout>
    );
};

export default Landing;