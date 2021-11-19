import React , {useState} from 'react';
import './SearchScreen.css';
import ResultList from './component/ResultList';
import CatagoryItem from './component/CatagoryItem';
import axios from 'axios';


function SearchScreen() {
  
  const [result , setResult] = useState('a') ; 
  
  const [inputVal , setinputVal] = useState(''); 
  const [minVal , setMinVal] = useState(0.00); 
  const [maxVal , setMaxVal] = useState(10000.00); 
  const [minStar ,setMinStar] = useState(0); 
  const [maxStar , setMaxStar] = useState(0) ; 

  const [searchTagVal , setSearchTagVal] = useState('')

  const [tags , setTags]  = useState([]);
  const [tagsTest ,setTagsTest ]  = useState(['3d' , 'portrait' , 'landscape' , '3d artwork' , '4d artwork' , 'Nasa Cant bring you back' , 
  'i dont know shit', 'hell' , 'think but cant reach' , 'Dek due tong done a rai ka?' , 'Done Pong']) ; 

  function removeFromTagTest(text){
    var newTag = tagsTest.filter((item)=> {
      return item!== text 
    })
    setTagsTest(newTag); 
  }
  
  function getApiOfTag(){
    //hashIt(password);
    axios({method:"GET", url:"http://localhost:8000/api/paintplz/v1/tags"})
    .then(function (response) {
      console.log(response);
      setTags(response.data.tags)
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  
  
  return (
    <div className = 'bg'>
    <div  style={{display:'flex',justifyContent:"center"}}>
    <div id = 'container'>
      <div id = 'search-pane'>
          
          <div className = 'area'>
            
             
              <input 
                value = {inputVal}
                type = 'search' 
                id = 'search-text'
                placeholder="Search by Artist's name" //Search by Artist's name
                onChange = {(e) => setinputVal(e.target.value)}
                
                
              >
            
              </input>

              
            
           
            <input className = 'button text-style' type="button"
              onClick ={getApiOfTag}
              value = 'Submit'
            />
          
            </div>
          
          <div className = 'area-gap'></div>
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
            
            <input id = 'searchTag' 
                  type = 'text' 
                  placeholder = 'Search Tag'
                  value = {searchTagVal}
                  onChange = {(e)=> setSearchTagVal(e.target.value)}      
            >
                  
            </input>

            
            {/* <div className = 'dd-list'>

            
            {tagsTest.filter((val)=> {
              if (searchTagVal == ""){
                return null;  
              }else if (val.toLowerCase().includes(searchTagVal.toLowerCase())){
                return null; 
              }
            }).map((val , key)=>{
              return <button className="dd-list-item">
                {val}
              </button>
            })}
            </div> */}
           
          </div>
           
          
          <div className = 'catagory-rend'>
          {tagsTest.map((tag) => {return <div><CatagoryItem text = {tag} func = {removeFromTagTest}/></div>})}
              {/* tag.tagName */}
          </div>
        
    

      </div>
     
    </div>
    </div>


    <div style={{display:'flex',justifyContent:"center"}}>
    {result.includes('a')  ? 
    
    <div id = 'result-pane'>
      <div id = 'header'>
          <text style = {{alignSelf : 'center'}}>Result</text>
          
      </div>
      
      {result=='aa'?  <div id  = 'notfound-result-pane' >
          Artist Not Found 
           
      </div>
       :<ResultList />}
     
      




    </div> 
    
    
    
    
    
    
    
    : null}
    </div>
      
    </div>
    
    
  );
}

export default SearchScreen;
