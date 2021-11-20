import './Home.css';
import Modal from 'react-modal';
import React from 'react';
import axios from 'axios';
import logo from './logo.png'
import Cookies from 'universal-cookie';




function Home() {
  const [modal1, setIsOpen1] = React.useState(false);
  const [modal2, setIsOpen2] = React.useState(false);
  const [modal3, setIsOpen3] = React.useState(false);
  const [modal4, setIsOpen4] = React.useState(false);
  const [modal5, setIsOpen5] = React.useState(false);
  const [modal6, setIsOpen6] = React.useState(false);
  const [modal7, setIsOpen7] = React.useState(false);



  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [customerUserName,setCustomerUserName]    = React.useState("");
  const [customerName,setCustomerName]            = React.useState("");
  const [customerSurName,setCustomerSurName]      = React.useState("");
  const [customerPassword,setCustomerPassword]    = React.useState("");
  const [customercitizenID,setCustomercitizenID]  = React.useState("");
  const [customerEmail,setCustomerEmail]          = React.useState("");

  const [artistUserName,setArtistUserName]    = React.useState("");
  const [artistName,setArtistName]            = React.useState("");
  const [artistSurName,setArtistSurName]      = React.useState("");
  const [artistPassword,setArtistPassword]    = React.useState("");
  const [artistcitizenID,setArtistcitizenID]  = React.useState("");
  const [artistEmail,setArtistEmail]          = React.useState("");
  const [artistMaxPrice,setArtistMaxPrice]    = React.useState(0);
  const [artistMinPrice,setArtistMinPrice]    = React.useState(0);
  const [artistDesc,setArtistDesc]            = React.useState("");



  function logIn(){
    axios({method:"POST", url:"http://localhost:1323/api/paintplz/v1/login",
      data:{username:username,password:password}})
    .then(function (response) {
      console.log(response);
      const cookies = new Cookies();
      cookies.set("currentUser", response.data, { path: '/' })
      if (response.data.userType){
        window.location.replace("http://localhost:3000/profile")
      }
      else {
        window.location.replace("http://localhost:3000/search")
      }
    })
    .catch(function (error) {
      console.log(error);
      openModal5()
    });
  }

  function customerRegister(){
    axios({method:"POST", url:"http://localhost:1323/api/paintplz/v1/register",
      data:{name:customerName,surname:customerSurName,citizenID:customercitizenID,
            email:customerEmail,username:customerUserName,password:customerPassword,
            userType:false}})
    .then(function (response) {
      console.log(response);
      openModal6()
    })
    .catch(function (error) {
      console.log(error);
      openModal7()
    });
  }

  function artistRegister(){
    axios({method:"POST", url:"http://localhost:1323/api/paintplz/v1/register",
      data:{name:artistName,surname:artistSurName,citizenID:artistcitizenID,
            email:artistEmail,username:artistUserName,password:artistPassword,
            minimumPriceRate:int(artistMinPrice),maximumPriceRate:int(artistMaxPrice),
            biography:artistDesc,userType:true}})
    .then(function (response) {
      console.log(response);
      openModal6()
    })
    .catch(function (error) {
      console.log(error);
      openModal7()
    });
  }

  function openModal1() {
    setIsOpen1(true);
  }
  function openModal2() {
    setIsOpen2(true);
  }
  function openModal3() {
    setIsOpen3(true);
  }
  function openModal4() {
    setIsOpen4(true);
  }
  function openModal5() {
    setIsOpen5(true);
  }
  function openModal6() {
    setIsOpen6(true);
  }
  function openModal7() {
    setIsOpen7(true);
  }

  function closeModal1() {
    setIsOpen1(false);
    setUserName("");
    setPassword("");
  }
  function closeModal2() {
    setIsOpen2(false);
    setUserName("");
    setPassword("");
  }
  function closeModal3() {
    setIsOpen3(false);
    setCustomerUserName("");
    setCustomerPassword("");
    setCustomerSurName("");
    setCustomerName("");
    setCustomerEmail("");
    setCustomercitizenID("");
  }
  function closeModal4() {
    setIsOpen4(false);
    setArtistUserName("");
    setArtistPassword("");
    setArtistSurName("");
    setArtistName("");
    setArtistEmail("");
    setArtistcitizenID("");
    setArtistMinPrice(0);
    setArtistMaxPrice(0);
    setArtistDesc("");
  }
  function closeModal5() {
    setIsOpen5(false);
  }
  function closeModal6() {
    setIsOpen6(false);
    setIsOpen3(false);
  }
  function closeModal7() {
    setIsOpen7(false);
  }
  return (
    <div className = 'bg-1'>
    <div className="App">

      <div className="box">
        <img src= {logo} alt = 'ym picture' width="305" height="64"/>
        <div className="button-control">
          <button className="green-btn length-btn"onClick={openModal1}>Login</button>
          <button className="green-btn length-btn"onClick={openModal2}>Register</button>
        </div>
      </div>

      <Modal
        isOpen={modal1}
        onRequestClose={closeModal1}
        contentLabel="Login modal"
        className="modal "
      >
        <div className="modal-content login-modal">
          <div className="button-close">
            <span className="close" onClick={closeModal1}>&times;</span>
          </div>          
          <h2>Login</h2>
          <form>
            <div className="form-control">
              <label>Username: <input type="text" name="username" 
              value={username} onChange={e => setUserName(e.target.value)} required/>
              </label>
            </div>
            <div className="form-control">
              <label>Password: <input type="password" name="password" 
              value={password} onChange={e => setPassword(e.target.value)} required/>
              </label>
            </div>
            <div className="button-submit">
              <input type="button" value="Login" className="green-btn length-btn" onClick={()=>{logIn()}}/>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={modal2}
        onRequestClose={closeModal2}
        contentLabel="Register modal"
        className="modal"
      >
        <div className="modal-content register-choice-modal">
          <div className="button-close">
            <span className="close" onClick={closeModal2}>&times;</span>
          </div>
          <div className="button-control">
            <button className="green-btn" onClick={openModal3}>Register as customer</button>
            <button className="red-btn" onClick={openModal4}>Register as artist</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modal3}
        onRequestClose={closeModal3}
        contentLabel="Register Customer modal"
        className="modal"
      >
        <div className="modal-content register-modal">
          <div className="button-close">
            <span className="close" onClick={closeModal3}>&times;</span>
          </div>
          <h2>Customer registration</h2>
          <form>
            <div className="form-control">
              <label>Name: <input type="text" name="name" 
              value={customerName} onChange={e => setCustomerName(e.target.value)} required /></label>
              <label>Surname: <input type="text" name="surname" 
              value={customerSurName} onChange={e => setCustomerSurName(e.target.value)} required /></label>
            </div>
            <div className="form-control">
              <label>Email: <input type="email" name="email" 
              value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} required /></label>
              <label>CitizenID: <input type="text" name="citizenId"
              value={customercitizenID} onChange={e => setCustomercitizenID(e.target.value)} required /></label>

            </div>
            <div className="form-control">
              <label>Username: <input type="text" name="username"
              value={customerUserName} onChange={e => setCustomerUserName(e.target.value)} required /></label>
              <label>Password: <input type="text" name="password"
              value={customerPassword} onChange={e => setCustomerPassword(e.target.value)} required /></label>

            </div>
            <div className="button-submit">
              <input type="button" value="Register" className="green-btn length-btn" onClick={()=>{customerRegister()}}/>
            </div>

          </form>
        </div>
      </Modal>

      <Modal
        isOpen={modal4}
        onRequestClose={closeModal4}
        contentLabel="Register Customer modal"
        className="modal"
      >
        <div className="modal-content register-modal">
          <div className="button-close">
            <span className="close" onClick={closeModal4}>&times;</span>
          </div>
          <h2>Artist registration</h2>
          <form>
            <div className="form-control">
              <label>Name: <input type="text" name="name"
              value={artistName} onChange={e => setArtistName(e.target.value)} required/>
              </label>
              <label>Surname: <input type="text" name="surname"
              value={artistSurName} onChange={e => setArtistSurName(e.target.value)} required/>
              </label>
            </div>
            <div className="form-control">
              <label>Email: <input type="email" name="email"
              value={artistEmail} onChange={e => setArtistEmail(e.target.value)} required/>
              </label>
              <label>CitizenID: <input type="text" name="citizenId"
              value={artistcitizenID} onChange={e => setArtistcitizenID(e.target.value)} required/>
              </label>
            </div>
            <div className="form-control">
              <label>Username: <input type="text" name="username"
              value={artistUserName} onChange={e => setArtistUserName(e.target.value)} required/>
              </label>
              <label>Password: <input type="text" name="password"
              value={artistPassword} onChange={e => setArtistPassword(e.target.value)} required/>
              </label>
            </div>
            <div className="form-control">
              <label>Min Price Rate: <input type="number" name="minPrice"
              value={artistMinPrice} onChange={e => setArtistMinPrice(e.target.value)} required/>
              </label>
              <label>Max Price Rate: <input type="number" name="maxPrice"
              value={artistMaxPrice} onChange={e => setArtistMaxPrice(e.target.value)} required/>
              </label>
            </div>
            <div className="form-control">
              <label>Biography: <textarea id="text" name="desc"
              value={artistDesc} onChange={e => setArtistDesc(e.target.value)}/>
              </label>
            </div>
            <div className="button-submit">
              <input type="button" value="Register" className="red-btn length-btn " onClick={()=>{artistRegister()}}/>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={modal5}
        onRequestClose={closeModal5}
        contentLabel="Register Customer modal"
        className="modal"
      >
        <div className="modal-content loginfail-modal">
          <div className="button-close">
            <span className="close" onClick={closeModal5}>&times;</span>
          </div>
          <div className="center">
            <h2>Incorrect username or password</h2>
            <button className="red-btn" onClick={closeModal5}>close</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modal6}
        onRequestClose={closeModal6}
        contentLabel="Register Customer modal"
        className="modal"
      >
        <div className="modal-content registerSuccess-modal">
          <div className="button-close">
            <span className="close" onClick={closeModal6}>&times;</span>
          </div>
          <div className="center">
            <h2>Registration success</h2>
            <button className="green-btn" onClick={closeModal6}>close</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modal7}
        onRequestClose={closeModal7}
        contentLabel="Register Customer modal"
        className="modal"
      >
        <div className="modal-content registerSuccess-modal">
          <div className="button-close">
            <span className="close" onClick={closeModal7}>&times;</span>
          </div>
          <div className="center">
            <h2>Invalid Information</h2>
            <button className="red-btn" onClick={closeModal7}>close</button>
          </div>
        </div>
      </Modal>
    </div>

</div>    
  );
}

export default Home;
