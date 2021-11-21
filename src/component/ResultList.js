import React, { Component } from 'react';
import './ResultList.css'
import userPic from '../user.png'
// 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Drawn_love_hearts.svg/2483px-Drawn_love_hearts.svg.png' 
const ResultList = ({list})=>  {
    
    const listItems = list.map((item , index) =>
        <div className = 'indivInfo' style = {{backgroundColor : (index%2==1)? 'white': '#EAEAEA'}}>
          
          <div className = 'half-sec' style = {{paddingLeft : 0}}>
              <div className = 'frame'>
              <img style = {{borderRadius : 32}}src= 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Drawn_love_hearts.svg/2483px-Drawn_love_hearts.svg.png'  alt = 'ym picture' width="64" height="64"/>

              </div>
            
              
              <div className = 'nameandrating'>
                  <text>{item.name} {item.surname}</text>
                  <text>{item.rating}</text>
              </div>
          </div>
            <div className = 'half-sec half-sec-end' >
            <input className = 'button' type="button"
              
              value = 'View Profile'
            />
             <input className = 'button button-end' type="button"
              
              value = 'Message'
            />
            </div>
       
          
        </div>
    );
    return (
      <div>
        {listItems}
      </div>        
    );
  
}
 
export default ResultList;