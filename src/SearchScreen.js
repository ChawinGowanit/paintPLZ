import React , {useState , useEffect} from 'react';
import './SearchScreen.css';
import ResultList from './component/ResultList';
import CatagoryItem from './component/CatagoryItem';
import axios from 'axios';
import logo from './logo.png'
import userPic from './user.png'
import {AiOutlineSearch, AiOutlineInfoCircle , AiOutlineCheck} from 'react-icons/ai'
import {HiHome} from 'react-icons/hi'
import {MdBlock} from 'react-icons/md'
import Cookies from "universal-cookie";

function SearchScreen() {
  
  const [result , setResult] = useState(null) ; 
  const [profile , setProfile] = useState(null); 
  const [inputVal , setinputVal] = useState(''); 
  const [minVal , setMinVal] = useState(0); 
  const [maxVal , setMaxVal] = useState(0); 
  const [minStar ,setMinStar] = useState(0.00); 
  const [maxStar , setMaxStar] = useState(0.00) ; 


  const [searchHidden , setSearchHidden] = useState('')
  const [searchTagVal , setSearchTagVal] = useState('')
  
  
  const [allTag , setTags] = useState([]); 
  const [tagsTest ,setTagsTest ]  = useState([]) ; 

//   const searchResult = [
//     {
//      "userID": "00000002",
//      "name" : "Zedong",
//      "surname" : "Mao",
//      "rating" : 5.0
//     },
//     {
//      "userID": "00000003",
//      "name" : "Vladimir",
//      "surname" : "Lenin",
//      "rating" : 5.0
//     }
//  ]





  function removeFromTagTest(text){
    var newTag = tagsTest.filter((item)=> {
      return item.tagName!== text 
    })
    setTagsTest(newTag); 
  }
  
  function addTag(x, t) {
    var i ; 
    var y = x.slice(0); 
    console.log(y)
    for (i = 0 ; i< y.length ; i++ ){
      if (y[i].tagName === t.tagName){
        
        setTagsTest(y);
        setSearchTagVal(''); 
        setSearchHidden(t.tagName);
        return null ; 
      }
    }
    y.push(t); 
    setTagsTest(y) ; 
    setSearchTagVal(''); 
    setSearchHidden(t.tagName);

  }

 
  
  function getApiOfTag(){
    axios({method:"GET", url:"http://localhost:1323/api/paintplz/v1/tags"})
    .then(function (response) {
      console.log(response);
      setTags(response.data.tags)
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  
useEffect(() => {
  getApiOfTag();
  const cookies = new Cookies();
  setProfile(cookies.get("currentUser"));
  
}, []);

  function getSearchResult(){
    axios({method:"POST", url:"http://localhost:1323/api/paintplz/v1/search_artist",
      data:{artistName:inputVal,minimumPriceRate:parseInt(minVal),maximumPriceRate:parseInt(maxVal),
            minimumRating:parseFloat(minStar),maximumRating:parseFloat(maxStar),artTag:tagsTest
            }})
    .then(function (response) {
      console.log(response);
      setResult(response.data.searchResult)
      
    })
    .catch(function (error) {
      console.log(error);
      
    });
  }
  
  
  return (
    <div className = 'bg'>
   
    <div id = 'navbar'>

      
    <img src= {logo} alt = 'ym picture' width="433" height="112"/>

    <div id = 'user-zone'>
      <div className = 'half-user' >
      <img className = 'user-profile' src= {userPic} alt = 'ym picture' width="24" height="24"/>
      <text className = 'user-name'>{profile.name} {profile.surname}</text>
      </div>
      <div className = 'half-user'>
        <div className = 'home-button'>
            <HiHome style = {{alignSelf : 'center', marginBottom : 4 , marginRight : 4 }} />Home
        </div>
        <div className = 'search-button'>
        <AiOutlineSearch style = {{alignSelf : 'center', marginBottom : 4, marginRight : 4}}  size = {20}/>Search Artist
        </div>
        <div className = 'home-button'>
            <AiOutlineInfoCircle style = {{alignSelf : 'center', marginBottom : 4, marginRight : 4}}  size = {20}/>About
        </div>
      </div>
    </div>
    </div>
    
    <div id = 'container'>
      <div id = 'search-pane'>
          
          <div className = 'area'>
            
             
              <input 
                value = {inputVal}
                type = 'search' 
                id = 'search-text'
                placeholder="Search by Artist's name" //Search by Artist's name
                onChange = {(e) => setinputVal(e.target.value)}
                autoComplete = 'off'
                autoCorrect = 'off'
                
              >
            
              </input>

              
            
           
            <button className = 'button-main' 
              onClick ={getSearchResult}
              
            >Submit<AiOutlineCheck style = {{alignSelf : 'center', marginLeft : 4}}/></button>
          
            </div>
          
          <div className = 'area-gap'>

          


          </div>
          <div className = 'area areaB'>
          <div className = 'text-add'>
            <text className = 'text-style'>Price Rate</text>
            </div>
            <div className = 'input-zone'>

         
            <input 
              className = 'blank text-style-small'
              type = 'text'
              value = {minVal}
              onChange = {(e) => setMinVal(e.target.value)}
              
              
            ></input>
             <text className = 'text-style dash'>-</text>
             <input 
              className = 'blank text-style-small'
              type = 'text'
              value = {maxVal}
              onChange = {(e) => setMaxVal(e.target.value)}
              
            ></input>

            </div>
            
              <text className = 'text-style text-end'>Baht</text>
          </div>
          <div className = 'area-gap'>
       
          </div>
          <div className = 'area areaB'>
          <div className = 'text-add'>

          
          <text className = 'text-style text-front'>Rating</text>
          </div>
            <div className = 'input-zone'>
            <input 
              className = 'blank text-style-small'
              value = {minStar}
              type = 'text'
              onChange = {(e) => setMinStar(e.target.value)}
              
            ></input>
             <text className = 'text-style dash'>-</text>
             <input 
              className = 'blank text-style-small'
              type = 'text'
              value = {maxStar}
              onChange = {(e) => setMaxStar(e.target.value)}
            ></input>
            </div>
            
            
            <text className = 'text-style text-end'>Stars</text>




          </div>
          <div className = 'area-gap'>
          {/* <input value = 'show'type="button" onClick = {()=> setResult('aa')}/>
          <input value = 'unshow' type="button" onClick = {()=> setResult('a')}/>
 */}

          </div>
          <div className = 'area'>
            <div className = 'text-add'>
              <text className = 'text-style'>Artwork Tag</text>
            </div>
            

            <div className = 'tag-search-zone' >
            <input id = 'searchTag' 
                  type = 'search' 
                  placeholder = 'Search Tag'
                  value = {searchHidden}
                  onChange = {(e)=> {{setSearchTagVal(e.target.value);  setSearchHidden(e.target.value);}}  }
                  onFocus = {()=> setSearchTagVal(searchHidden)}
                  
                  autoComplete = "off"

            >
                  
            </input>
         
              <div  className = 'dd-list'>

            
                {allTag.filter((val)=> {
                  if (searchTagVal == ""){
                    return null;  
                  }else if (val.tagName.toLowerCase().includes(searchTagVal.toLowerCase())){
                    return val.tagName; 
                  }
                }).map((val)=>{
                  return (
                    <input className = 'dd-list-item' type="button" 
                      onClick ={()=> addTag(tagsTest,val)}
                      value = {val.tagName}
                      
                    /> 
                  )
                })}
              </div> 

          

            </div>
            

            
            
           
          </div>
           
          
          <div className = 'catagory-rend'>
          {tagsTest.map((tag) => {return <div><CatagoryItem text = {tag.tagName} func = {removeFromTagTest}/></div>})}
              {/* tag.tagName */}
          </div>
        
    

      </div>
     
    </div>
   


    <div style={{display:'flex',justifyContent:"center"}}>
    {result !==null  ? 
    
    <div id = 'result-pane'>
      <div id = 'header'>
          Result<AiOutlineSearch style = {{alignSelf : 'center'}}  size = {24}/>
          
      </div>
      
      {result.length === 0 ?  <div id  = 'notfound-result-pane' >
          <MdBlock style =  {{alignSelf : 'center'}} size = {64}/>Artist Not Found 
           
      </div>
       :<ResultList list = {result}/>}
     
      




    </div> 
    
    
    
    
    
    
    
    : null}
    </div>
      
    </div>
    
    
  );
}

export default SearchScreen;
