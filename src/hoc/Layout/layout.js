import React,{Component}from 'react'
import Auxilary from '../auxilary/auxilary'
import classes from './Layout.module.css'
import Toolbar from '../../component/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../component/Navigation/SideDrawer/SideDrawer'

class Layout extends Component{
  state={
    showSideDrawer:false
  }
  showSideDrawerHandler=()=>{
  this.setState({showSideDrawer:false});
  }
  sideDrawerToggleClick=()=>{
    this.setState((prevState)=>{
      return {showSideDrawer:!prevState.showSideDrawer}
    })
  }
  render(){
    return(
      <Auxilary>
      <Toolbar drawerToggleClick={this.sideDrawerToggleClick}/>
      <SideDrawer open={this.state.showSideDrawer}  closed={this.showSideDrawerHandler}/>
    <main className={classes.content}>
     {this.props.children}
    </main>
    </Auxilary>
     )
  }
  
  
}
export default Layout;
