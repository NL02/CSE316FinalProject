import React        from 'react';
import { WLayout, WLMain, WLFooter }    from 'wt-frontend';

const Landing = (props) => {
    return (
        <WLayout wLayout="footer" className="landing">
          <WLMain style={{ backgroundColor: "ivory"}}>Globe Image</WLMain>
          <WLFooter style={{ backgroundColor: "aquamarine"}}>Welcome To The World Data Mapper</WLFooter>
        </WLayout>
    );
};

export default Landing;