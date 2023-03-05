import React from 'react'
import Auxilary from '../../../hoc/auxilary/auxilary'
import Button from '../../UI/Button/Button';
const OrderSummary = (props) => {
    const ingredientSummary=Object.keys(props.ingredients).map(igkey=>{
        return <li><span style={{textTransform:'capitalize'}}> {igkey}:</span>{props.ingredients[igkey]}</li>
    });
  return (
  <Auxilary>
    <h3>Your Order</h3>
    <p>A delicious burger with th following ingredients:</p>
    <ul>
     {ingredientSummary}
    </ul>
   <p><strong>Total Price :{props.totalPrice} </strong></p> 
    <p>Continue to Checkout?</p>
    <Button clicked={props.purchaseCancel}btnType="Danger">CANCEL</Button>
    <Button clicked={props.purchaseContinue}btnType="Success">CONTINUE</Button>
  </Auxilary>
  )
}

export default OrderSummary