import React , {useState} from 'react';
import './SearchScreen.css';
import ResultList from './component/ResultList';
import CatagoryItem from './component/CatagoryItem';
import axios from 'axios';
import logo from './logo.png'
import userPic from './user.png'
function SearchScreen() {
  
  const [result , setResult] = useState('a') ; 
  
  const [inputVal , setinputVal] = useState(''); 
  const [minVal , setMinVal] = useState(0); 
  const [maxVal , setMaxVal] = useState(0); 
  const [minStar ,setMinStar] = useState(0); 
  const [maxStar , setMaxStar] = useState(0) ; 


  const [searchHidden , setSearchHidden] = useState('')
  const [searchTagVal , setSearchTagVal] = useState('')
  
  
  const [tags , setTags] = useState(''); 
  const [tagsTest ,setTagsTest ]  = useState([]) ; 
  
const allTag = [{"tagID" : "a91530b6-2f49-447b-84a7-9137f9853213","tagName" : "character design"},
,{"tagID" : "9faf83d2-325e-45f3-9827-d02b4d954690","tagName" : "3d"},
,{"tagID" : "b2e323fc-97db-43c9-9c97-76fdc5fdda01","tagName" : "4d"},
,{"tagID" : "d046c9c3-ba55-44ff-b7f8-56ec0b5943fb","tagName" : "background"},
,{"tagID" : "ba48f4ff-84f7-486b-aad4-dbeb682e20bc","tagName" : "fantasy"},
,{"tagID" : "2609aaf5-2563-4024-acee-951e2476b49c","tagName" : "comics"},
,{"tagID" : "b3c04852-04b7-4abb-be33-b74f09f195f8","tagName" : "fan art"},
,{"tagID" : "c71a0599-090a-48d4-9c86-afd770d879ff","tagName" : "fractal"},
,{"tagID" : "087ed5d2-7163-444b-bbee-51274e129f9b","tagName" : "horror"},
,{"tagID" : "04472b39-1aac-4600-a58e-af3c42d8dd55","tagName" : "pixel art"},
,{"tagID" : "ee235e7b-4f9e-4ace-bfcc-5b6cd1a8254e","tagName" : "wallpaper"},
,{"tagID" : "45ce62f2-10a5-47da-9171-59ef56cb78ab","tagName" : "vector"},
,{"tagID" : "bcf96918-8193-4aaf-8692-f01d1c2d4505","tagName" : "emoji"},
,{"tagID" : "223d2e48-647f-47c3-a9d3-f0a19b68e07f","tagName" : "dog"},
,{"tagID" : "4517917a-af12-48bc-955f-064fa2ea0730","tagName" : "cat"},
,{"tagID" : "3e18565f-bcd4-4429-8df5-5438487d28f1","tagName" : "rainbow"},
,{"tagID" : "427733b9-3de2-47d0-8e6a-7a0fd91e3613","tagName" : "space"},
,{"tagID" : "b6ce9b0d-4ef5-4192-8275-01941658f764","tagName" : "scenery"},
,{"tagID" : "730c136c-2971-4451-8734-443408f912dc","tagName" : "room layout"},
,{"tagID" : "aa9e214c-f598-4341-a382-7b4894737291","tagName" : "oriental"},
,{"tagID" : "d38bdd24-1e5a-4923-a66b-d8098a5e8cf0","tagName" : "realism"},
,{"tagID" : "3ae2f4fe-f122-4dff-8a46-3ed06fec9104","tagName" : "abstract"}]
  
  function removeFromTagTest(text){
    var newTag = tagsTest.filter((item)=> {
      return item!== text 
    })
    setTagsTest(newTag); 
  }
  
  function addTag(x, t) {
    
    var y = x.slice(0); 
    
    var result = y.filter(item => item.tagName != t.tagName)
    result.push(t); 

    setTagsTest(result) ; 
    setSearchTagVal(''); 
    setSearchHidden(t.tagName);

  }

 
  
  function getApiOfTag(){
    //hashIt(password);
    axios({method:"GET", url:"http://localhost:1323/api/paintplz/v1/tags"})
    .then(function (response) {
      console.log(response);
      setTags(response.data.tags)
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  

  function getSearchResult(){
    axios({method:"POST", url:"http://localhost:1323/api/paintplz/v1/search_artist",
      data:{artistName:inputVal,minimumPriceRate:minVal,maximumPriceRate:maxVal,
            minimumRating:minStar,maximumRating:maxStar,artTag:tagsTest
            }})
    .then(function (response) {
      console.log(response);
      
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
      <text className = 'user-name'>Chawin Gowanit</text>
      </div>
      <div className = 'half-user'>
        <div className = 'home-button'>
            Home
        </div>
        <div className = 'search-button'>
            Search Artist
        </div>
        <div className = 'home-button'>
            About
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
                
                
              >
            
              </input>

              
            
           
            <input className = 'button text-style' type="button"
              onClick ={getSearchResult}
              value = 'Submit'
            />
          
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
