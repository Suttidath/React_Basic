import { element } from "prop-types";
import DataContext from "../data/DataContext";
import Items from "./Items";
import "./Transaction.css"


const Transaction = (props)=> {
    const {items} = props
    return (
      <div>
        <ul className="item-list">
        {items.map((element)=>{
            //return <Items title={Element.title} amount={Element.amount}/>
            return <Items {...element} key={element.id} />
        })}
        </ul>
      </div>
    );
  }

  export default Transaction

