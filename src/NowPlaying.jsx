import { Label, TextInput } from "flowbite-react";
import { useParams } from "react-router-dom";


const iframeContainer = {
  position: 'relative',
  width: '100%',
  paddingBottom:'56.25%',
};
const iframeContent = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '56.25%'
};


const NowPlaying= ({play})=>{
  
    return(
      <div>
      <div style={iframeContainer}>
        {console.log("Now playing", play)}
      <iframe
          style={iframeContent}
          src={`https://vidsrc.in/embed/${play}/`}
          allowFullScreen
      />
      </div>

      </div>

    );
}

export default NowPlaying;