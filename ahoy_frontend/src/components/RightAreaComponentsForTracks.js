import 'bootstrap/dist/css/bootstrap-grid.css';
import TrackEntryComponent from './TrackEntryComponent'
import {albumOverviewStyle, coverStyle, albumDescriptionStyle, backgroundFilterStyle} from '../stylesheets/mainBodyStyle/rightAreaStyle/albumOverviewStyle'
import globalStyle from '../stylesheets/globalStyle/globalStyleSheet';
import React,{useState, useEffect, useRef} from 'react'
import TrackListComponent from './TrackListComponent'
import {DesktopOrTablet, Mobile} from '../MediaQuery'
// import '../stylesheets/css/typography.css'
// import styled from "styled-components"

function RightAreaComponentForTracks(props) {
    
    var {album} = props
    // var {tracks, trackCover, setTrack} = props
    
    let heightOfTracks = `calc(100% - ${albumOverviewStyle.height}px) `

    var [coverStyleState, setCoverStyleState] = useState(coverStyle)
    var [albumOverviewStyleState, setAlbumOverviewStyleStyleState] = useState(albumOverviewStyle)

    const albumOverviewRef =  useRef(null)
    // const widthOfTitleAndSubtitle = albumOverviewRef.current.offsetWidth
    // const changeWidthOfTitleAndSubtitle= ()=> {
    //     widthOfTitleAndSubtitle  = albumOverviewRef.current.offsetWidth
    // }

    useEffect(()=>{
        setCoverStyleState({
            ...coverStyleState,
            backgroundImage: `url(${album.images[1].url})`
        })
        setAlbumOverviewStyleStyleState({
            ...albumOverviewStyleState,
            backgroundImage: `url(${album.images[0].url})`,
            backgroundSize: 'cover'
        })
        // window.addEventListener('resize', changeWidthOfTitleAndSubtitle);
        console.log(albumOverviewRef.current.offsetWidth)
    },[album])
        
        
    return(
        <div style={{height: '100%', overflow: 'scroll'}}>
            <div ref={albumOverviewRef} style={albumOverviewStyleState}>
                <div style={backgroundFilterStyle}>
                    <div style={coverStyleState}></div>
                    <DesktopOrTablet>
                        <div style={albumDescriptionStyle}>
                            <div style={{ width:'100%', marginTop:'100px', textAlign:'left', fontSize:'clamp(40px, 6vw, 80px)'}}>{album.name}</div>
                        </div>
                    </DesktopOrTablet>
                    
                    
                    
                </div>
            </div>
            <TrackListComponent album={album}/>
        </div>
        
        
    )
    
}

export default React.memo(RightAreaComponentForTracks)