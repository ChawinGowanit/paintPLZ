import React, { Component } from 'react';
import './ResultList.css'


const ResultList = ()=>  {
    const numbers = [1, 2, 3, 4 , 5 , 6 , 7 , 8 , 9, 100 ];
    const listItems = numbers.map((numbers , index) =>
        <div className = 'indivInfo' style = {{backgroundColor : (index%2==1)? 'white': '#EAEAEA'}}>
          
          <div className = 'half-sec' style = {{paddingLeft : 0}}>
              <div className = 'frame'>
              <img src= 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Drawn_love_hearts.svg/2483px-Drawn_love_hearts.svg.png' alt = 'ym picture' width="64" height="64"/>

              </div>
            
              
              <div className = 'nameandrating'>
                  <text>Chawin Gowanit</text>
                  <text>4.85</text>
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