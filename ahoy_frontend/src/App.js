import './App.css';
import {useState, useEffect} from 'react'
import {BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom'
import HomePage from './page/HomePage';
import AlbumPage from './page/AlbumPage';
import WelcomePage from './page/WelcomePage'
import ArtistsPage from './page/ArtistsPage'
import TraditionalMusicPlayerPage from './page/TraditionalMusicPlayerPage'
import { userProfileState} from './recoilInfo'
import {useRecoilState} from 'recoil'
function App() {

  var [token, setToken] = useState(null);
  var [userProfile, setUserProfile] = useRecoilState(userProfileState)
  // var [deviceId, setDeviceId] = useState(null)

  async function getToken() {
    fetch('/auth/token').then((response)=>{
      return response.json()
    }).then((json)=>{
      setToken(json.access_token)
    })
  }

  async function getUserProfile() {
    fetch('/user/getUserProfile')
    .then((response)=>{
      return response.json()
    }).then((json)=>{
      setUserProfile(json)
    })
    
    
  }


  useEffect(() => {

    if(!token){
      getToken();
    }
    if(!userProfile){
      getUserProfile()
    }
  }, [])

  return (

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<WelcomePage />}/>
      <Route path="/traditional" element={<TraditionalMusicPlayerPage token={token} />}>
        <Route exact path="album" element={<AlbumPage token={token} />}/>
        <Route exact path="artists" element={<ArtistsPage token={token} /> }/>
      </Route>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
