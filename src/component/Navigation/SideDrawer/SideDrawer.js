import React from 'react'
import Logo from '../../Logo/Logo';
import NavigationItems from '../Toolbar/NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import BackDrop from '../../UI/Backdrop/Backdrop' 
import Auxilary from '../../../hoc/auxilary/auxilary';
const sideDrawer=(props)=>{
    let attachedClasses=[classes.SideDrawer,classes.Close ]
    if(props.open)
    attachedClasses=[classes.SideDrawer,classes.Open]
    return(
        <Auxilary>
           <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
            <Logo />
            </div>
                 
 <nav>
    <NavigationItems/>
 </nav>
        </div>
        </Auxilary>
    );
}
export default sideDrawer;
