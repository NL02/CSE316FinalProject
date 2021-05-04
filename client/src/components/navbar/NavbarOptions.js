import React                                from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem }                from 'wt-frontend';
import { GET_DB_USER }                      from '../../cache/queries'
import { useQuery }                         from '@apollo/client';

const LoggedIn = (props) => {
    const client = useApolloClient();
    console.log()
	const [Logout] = useMutation(LOGOUT);
    const { data } = useQuery(GET_DB_USER);
    console.log(data.getCurrentUser.firstName)
    const firstName = data.getCurrentUser.firstName
    const lastName = data.getCurrentUser.lastName
    const handleLogout = async (e) => {
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
            // if (reset) props.setActiveList({});
        }
    };
    
    const print = async (e) => {
        console.log(props)
    }

    return (
        <>
        <WNavItem hoverAnimation="lighten">
            <WButton className="navbar-options" onClick={props.setShowUpdate} wType="texted" hoverAnimation="text-primary">
                {firstName + " " + lastName}
            </WButton>
        </WNavItem >
        <WNavItem hoverAnimation="lighten">
            <WButton className="navbar-options" onClick={handleLogout} wType="texted" hoverAnimation="text-primary">
                Logout
            </WButton>
        </WNavItem >
        </>
    );
};

const LoggedOut = (props) => {
    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={props.setShowCreate} wType="texted" hoverAnimation="text-primary"> 
                    Create Account
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={props.setShowLogin} wType="texted" hoverAnimation="text-primary">
                    Login
                </WButton>
            </WNavItem>
        </>
    );
};


const NavbarOptions = (props) => {
    return (
        <>
            {
                props.auth === false ? <LoggedOut setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate} />
                : <LoggedIn fetchUser={props.fetchUser} setActiveMap={props.setActiveMap} logout={props.logout} setShowUpdate={props.setShowUpdate} />
            }
        </>

    );
};

export default NavbarOptions;