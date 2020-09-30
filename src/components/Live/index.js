import React from 'react';
import ReactTitchEmbedVideo from 'react-twitch-embed-video';
import {useParams} from 'react-router-dom';

const Live = () => {

let {slug} = useParams();
console.log(slug);
return (
  <div className="containerDecale">
    <ReactTitchEmbedVideo height="754" width="100%" channel={slug} />
  </div>
)

}

export default Live;
