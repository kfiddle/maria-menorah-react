

import Item from './Item'

import styles from "./Item.module.css";

const Items = (props) => {

    const displayableItems = props.list.map(item => (
        <Item key={item.id} item={item}/>
    )) 

return <div className={styles.outerContainer}>{displayableItems}</div>

};

export default Items;
