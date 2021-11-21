import React, { Component } from 'react';
import './ResultList.css'
import userPic from '../user.png'
import {AiFillEye , AiFillStar} from 'react-icons/ai'
import {MdMessage} from 'react-icons/md'
import Cookies from 'universal-cookie';


// 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Drawn_love_hearts.svg/2483px-Drawn_love_hearts.svg.png' 



const ResultList = ({list})=>  {
    

    function redirect(item) {
      const cookies = new Cookies();
      console.log('ddd')
      cookies.set("currentUser", item, { path: '/' });
      window.location.replace("http://localhost:3000/profile")
    }


    const listItems = list.map((item , index) =>
        <div className = 'indivInfo' style = {{backgroundColor : (index%2==0)? 'white': '#EAEAEA'}}>
          
          <div className = 'half-sec' style = {{paddingLeft : 0}}>
              <div className = 'frame'>
              <img style = {{borderRadius : 32}}src= 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Drawn_love_hearts.svg/2483px-Drawn_love_hearts.svg.png'  alt = 'ym picture' width="64" height="64"/>

              </div>
            
              
              <div className = 'nameandrating'>
                  
                    <h2 className = 'h2' style = {{height : 16 , fontSize : 16 , marginTop : 27, }}>{item.name} {item.surname}</h2>
                    <h2 className = 'h2' style = {{height : 16 , fontSize : 14 , marginTop : 0, }}><AiFillStar style = {{alignSelf : 'center' , marginTop : 0, color : '#00CD90', marginRight : 4}} size = {16}/>{item.rating}</h2>
                  
              </div>
          </div>
            <div className = 'half-sec half-sec-end' >
            <button className = 'button' onClick = {()=> redirect(item) }>View Profile<AiFillEye style = {{alignSelf : 'center' , marginLeft : 4}}/></button>
             
             
             
             
             <button className = 'button button-end' onClick = {()=> console.log(5)}>Message<MdMessage style = {{alignSelf : 'center' , marginLeft : 4}}/></button>
           
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