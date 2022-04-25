import TrackEntryComponent from "./TrackEntryComponent";
import React, { useEffect, useState } from "react";
import RightAreaComponentForCardPresent from "./RightAreaComponentForCardPresent";
import PlaceholderCardComponent from "./PlaceholderCardComponent";
import PlaceholderTrackEntryComponent from "./PlaceholderTrackEntryComponent";
import "../stylesheets/css/placeholderCardComponentStyleSheet.css";
import styled from "styled-components";
import { GridStyle, RightAreaContainerStyle } from "./ReusableStyleComponent";

const StyleForTrackContainer = styled.div`
  box-shadow: var(--global-box-shadow);
  border-radius: var(--global-border-radius);
  margin: var(--global-margin);
  overflow: hidden;
`;
const CommonContainer = styled.div`
  margin: var(--global-margin);
  border-radius: var(--global-border-radius);
  box-shadow: var(--global-box-shadow);
`;

var increaseKey = 999;
const TrackListComponent = React.memo((props) => {
  var { album, artistTopTrack, artistAlbums } = props;
  var renderQueue = [];
  var [tracksState, setTracksState] = useState([]);
  const loadTrackList = () => {
    if (tracksState.length == 0) {
      for (var i = 0; i < 10; i++) {
        renderQueue.push(
          <PlaceholderTrackEntryComponent key={increaseKey + i} />
        );
      }
      increaseKey += 10;
    } else {
      renderQueue.push(
        <StyleForTrackContainer key={increaseKey + 1}>
          {tracksState.map((track, index) => {
            return (
              <TrackEntryComponent
                key={track.id}
                track={track}
                albumId={album.id}
                positionInAlbum={index}
                images={album.images}
              />
            );
          })}
        </StyleForTrackContainer>
      );
      increaseKey++;
    }
  };
  const userProfileState = JSON.parse(localStorage.getItem("userProfile"));
  useEffect(() => {
    if (album) {
      let tracks = null;
      try {
        tracks = album.tracks.items;
        setTracksState(tracks);
      } catch {
        fetch(
          `/album/getAlbum?albumId=${album.id}&market=${userProfileState.country}`
        )
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            setTracksState(json.tracks.items);
          });
      }
    }
  }, []);

  if (album) {
    loadTrackList();
  } else {
    if (artistTopTrack) {
      var tracks = artistTopTrack.tracks;
      renderQueue.push(
        <StyleForTrackContainer key={increaseKey + 1}>
          {tracks.map((track, index) => {
            return (
              <TrackEntryComponent
                key={track.id}
                track={track}
                albumId={track.album.id}
                positionInAlbum={track.track_number - 1}
                images={track.album.images}
              />
            );
          })}
        </StyleForTrackContainer>
      );
      increaseKey++;
    } else {
      for (var i = 0; i < 10; i++) {
        renderQueue.push(
          <PlaceholderTrackEntryComponent key={increaseKey + i} />
        );
      }
      increaseKey += 10;
    }
    if (artistAlbums) {
      renderQueue.push(
        <CommonContainer key={increaseKey + 1}>
          <RightAreaComponentForCardPresent
            itemList={artistAlbums.items}
            type="album"
          />
        </CommonContainer>
      );
      increaseKey++;
    } else {
      renderQueue.push(
        <CommonContainer key={increaseKey + 1}>
          <RightAreaContainerStyle>
            <GridStyle>
              <PlaceholderCardComponent />
              <PlaceholderCardComponent />
              <PlaceholderCardComponent />
              <PlaceholderCardComponent />
              <PlaceholderCardComponent />
              <PlaceholderCardComponent />
              <PlaceholderCardComponent />
            </GridStyle>
          </RightAreaContainerStyle>
        </CommonContainer>
      );
      increaseKey++;
    }
  }
  return renderQueue;
});

export default TrackListComponent;
