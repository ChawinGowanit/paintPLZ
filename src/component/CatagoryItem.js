import React , {useState} from 'react'
import './CategoryItem.css'

import {ImCross} from 'react-icons/all'
function CatagoryItem({text , func}) {
    
    
    return (
        <div className = 'outer'>
            <button className = 'container' style = {{backgroundColor : '#4CD75F'}}
            type = 'button'
            
            >{text}</button>
            <div className = 'circle' onClick = {()=> func(text)}>
                <ImCross style = {{ alignSelf : 'center'}}size = {6}/>
            </div>
            
           
        </div>
            
        
    )
}

export default CatagoryItem
