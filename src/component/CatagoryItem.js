import React , {useState} from 'react'
import './CategoryItem.css'

import {ImCross} from 'react-icons/all'
function CatagoryItem({text , func}) {
    
    
    return (
        <div className = 'outer'>
            <button className = 'container' style = {{backgroundColor : '#4CD75F'}}
            type = 'button'
            
            >{text}   
            <div className = 'circle' onClick = {()=> func(text)}>
                <ImCross style = {{ alignSelf : 'center' }}size = {6}/>
            </div>
            
             </button>
            
            
           
        </div>
            
        
    )
}

export default CatagoryItem
