import PropTypes from 'prop-types';
import './Items.css';
import DataContext from '../data/DataContext';
import { useContext } from 'react';

const Items = (props)=> {
    const {title,amount} = props
    const status = amount<0 ?"expense":"income"
    const symbol = amount<0 ?"-":"+"


    return (
        <li className={status}>{title}<span>{symbol}{Math.abs(amount)}</span>
        </li>
    );
}

Items.propTypes={
    title:PropTypes.string.isRequired,
    amount:PropTypes.number.isRequired
}

export default Items