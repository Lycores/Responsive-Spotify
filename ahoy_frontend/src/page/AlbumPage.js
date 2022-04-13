import '../App.css';
import {useEffect, useState} from 'react';
import rightAreaStyle from '../stylesheets/mainBodyStyle/rightAreaStyle/rightAreaStyleSheet'
import {useLocation} from 'react-router-dom'
import RightAreaComponentForCardpresent from '../components/RightAreaComponentForCardPresent'
import RightAreaComponentForTracks from '../components/RightAreaComponentsForTracks'

// const requestUserProfile = async () => {
//   fetch('user/getUserProfile')
//   .then((response) => {return response.json()})
//   .then((userProfile) => {
//     setUserId(userProfile.id)
//   })
// }

function AlbumPage(props) {
    var {token} = props
    var albumList = []
    var album = null
    var {state} = useLocation()
    if(state){
      album = state.album
    }

    const getUserSavedAlbum = () => {
      fetch('album/getSavedAlbum')
      .then((response) => {
        return response.json()
      })
      .then((json)=>{
        json.items.forEach((albumObj)=>{
          albumList.push(albumObj.album)
        })
        setAlbumListState([...albumList])
      })
    }

    var [rightAreaStyleState, setRightAreaStyleState] = useState(rightAreaStyle)
    var [albumListState, setAlbumListState] = useState(albumList)

    useEffect(() => { 
      console.log("album is", album)
      if(!album){
        getUserSavedAlbum()
      }
    }, [token])

  return (     
      <div style={rightAreaStyleState} >
        {(!album) ? <RightAreaComponentForCardpresent itemList={albumListState} type="album"/> :
        <RightAreaComponentForTracks album={album}/>}
      </div>
  );
}

export default AlbumPage
