import React, { Component } from 'react'
import Auxilary from '../../hoc/auxilary/auxilary'
import Burger from '../../component/Burger/Burger'
import BuildControls from '../../component/Burger/BuildControls/BuildControls'
import Modal from '../../component/UI/Modal/Modal'
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary'
import axios from '../../AxiosOrder'
import Spinner from '../../component/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
const ingredientsPrice={
  salad:20,
  bacon:40,
  cheese:30,
  meat:50
};
class burgerbuilder extends Component {
 
  
  state={
    ingredients:{
      salad:0,
      bacon:0,
      cheese:0,
      meat:0

    },
    totalPrice:30,
    purchaseable:false,
    purchase:false,
    loading:false,
  
   }
   updatePurchaseState(ingredients){
  
    const sum=Object.keys(ingredients)
    .map(igkey=>{
      return ingredients[igkey];
    }).reduce((sum,el)=>{
      return sum+el;
    },0);
    this.setState({purchaseable:sum>0});
   }
   addIngredientHandler=(type)=>{
    const oldCount=this.state.ingredients[type];
    const updatedCount=oldCount+1;
    const updatedIngredients={
      ...this.state.ingredients
    };
    //state should be updated in immutable way so we should 
updatedIngredients[type]=updatedCount;
    
    const priceAddition=ingredientsPrice[type];
    const OldPrice=this.state.totalPrice;
    const newPrice=OldPrice+priceAddition;
   
    this.setState({totalPrice: newPrice,ingredients:updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
   }

   removeINgredientHandler=(type)=>{
    const oldCount=this.state.ingredients[type];
    if(oldCount<=0)
    return;
    
      const updatedCount=oldCount-1;
      const updatedIngredients={
        ...this.state.ingredients
      };
      updatedIngredients[type]=updatedCount;
      const priceAddition=ingredientsPrice[type];
      const OldPrice=this.state.totalPrice;
      const newPrice=OldPrice-priceAddition;
      this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
      this.updatePurchaseState(updatedIngredients);
  }

  purchasehandler=()=>{
this.setState({purchase:true})
  }
  puchaseCancelHandler=()=>{
    this.setState({purchase:false})
  }

  purchaseContinueHandler=()=>{
    this.setState({loading:true})
    // alert('you continue')
    const order={
      ingredients:this.state.ingredients,
      customer:{
        name:'khushal jain',
        address:{
        street:'patel hostel',
        zipcode:'21103',
        country:'Germany'
      },
      email:'test@test.com'
    },
    deliveryMethod:'fastest'
  }
    axios.post('/orders.json',order).then(response=>{
      this.setState({loading:false,purchase:false})
    })
    .catch(error=>{
      this.setState({loading:false,purchase:false})
    })

  }
  render() {
    const disableInfo={
        ...this.state.ingredients
    }
    for(let key in disableInfo)
    {
     disableInfo[key]=(disableInfo[key]<=0);
    }
let ordersummary=<OrderSummary ingredients={this.state.ingredients}
purchaseContinue={this.purchaseContinueHandler}
purchaseCancel={this.puchaseCancelHandler}
totalPrice={this.state.totalPrice}></OrderSummary>
if(this.state.loading){
  ordersummary=<Spinner/>
}
    
    return (
      
      <Auxilary>
        <Modal show={this.state.purchase} modalClosed={this.puchaseCancelHandler}>
        {ordersummary}
        </Modal>
          
      
     <Burger ingredients={this.state.ingredients}/>
     <BuildControls
     ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeINgredientHandler} 
       purchaseable={this.state.purchaseable}   
   disable={disableInfo}
   ordered={this.purchasehandler}
     price={this.state.totalPrice}/>
      </Auxilary> 
    )
  }
}
export default withErrorHandler(burgerbuilder,axios);

