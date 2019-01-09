import React from 'react';
import {  Button } from 'semantic-ui-react'

const Square = (props) => {
    return(
        <Button className={props.className} onClick={() => props.onClick()} style={{ backgroundColor:'white', height: '100%', fontSize: '9vw', padding: '0px', margin: '0px'}} >{ props.value || '-' }</Button>
    );
}
           
export default Square;
