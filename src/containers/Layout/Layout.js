import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Auxiliary';
import styles from './Layout.module.css';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';

const Layout =()=>{
    const [sideBarVisiblity, setSideBarVisiblity] = useState(false)

    sideDrawerCloseHandler = () => {
        setSideBarVisiblity(false)
    }

    sideDrawerOpenHandler = () => {
        setSideBarVisiblity(true)
    }
    return(
        <>
            <Toolbar show={sideDrawerOpenHandler}/>
            <SideDrawer closed={sideDrawerCloseHandler} show={sideBarVisiblity}/>
        </>
    )
}

export default Layout;