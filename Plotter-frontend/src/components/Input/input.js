import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react"
import { storage } from "../../config/firebase";
import LinearProgress from '@mui/material/LinearProgress';
import './input.scss'

const Upload=()=>{
    const [image,setImage]=useState({});
    const [progressbar,setProgress]=useState(0);
    console.log(process.env )
    function output(msg) {
        // Response
        var m = document.getElementById('messages');
        m.innerHTML = msg;
      }
    function parseFile(file) {
        if(!file){
            return;
        }
        console.log(file.name);
        output(
          '<strong>' + encodeURI(file.name) + '</strong>'
        );
        
        // var fileType = file.type;
        // console.log(fileType);
        var imageName = file.name;
    
        var isGood = (/\.(?=gif|jpg|png|jpeg|svg)/gi).test(imageName);
        if (isGood) {
          document.getElementById('start').classList.add("hidden");
          document.getElementById('response').classList.remove("hidden");
          document.getElementById('notimage').classList.add("hidden");
          document.getElementById('Submit_Button').classList.remove("hidden");
          // Thumbnail Preview
          document.getElementById('file-image').classList.remove("hidden");
          
          document.getElementById('file-image').src = URL.createObjectURL(file);
        }
        else {
          document.getElementById('file-image').classList.add("hidden");
          document.getElementById('notimage').classList.remove("hidden");
          document.getElementById('start').classList.remove("hidden");
          document.getElementById('response').classList.add("hidden");
          document.getElementById("file-upload-form").reset();
        }
      }
    function HandleUpload(e){
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            
            parseFile(e.target.files[0]);
        }

    }
    
    

    const uploadFile=()=>{
        if(!image){
            return;
        }
        const storageRef=ref(storage,'/files/upload.png');
        const uploadtask=uploadBytesResumable(storageRef,image);
        uploadtask.on("state_changed",(snapshot)=>{
            const progress=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
            setProgress(progress);

        },err=>{
            console.log(err)
        },
        () => {
            getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
            });
    })
}
    return(
        <div>   
            <h2>File Upload & Image Preview</h2>
            <p className="lead">No Plugins <b>Just Javascript</b></p>


            <div id="file-upload-form" className="uploader">
                <input id="file-upload" type="file" name="fileUpload" onChange={HandleUpload} accept="image/*" />

                <label htmlFor="file-upload" id="file-drag">
                    <img id="file-image" src="#" alt="Preview" className="hidden"/>
                    <div id="start">
                    <i className="fa fa-download" aria-hidden="true"></i>
                    <div>Select a file or drag here</div>
                    <div id="notimage" className="hidden">Please select an image</div>
                    <span id="file-upload-btn" className="btn btn-primary">Select a file</span>
                    
                    </div>
                    <div id="response" className="hidden">
                    <div id="messages"></div>
                    <div style={{display:"flex",justifyContent:"center"}}>
                    <LinearProgress variant="determinate"  style={{width:"80%"}} value={progressbar} />
                    </div>
               
                    </div>
                </label>
                <button onClick={uploadFile} id="Submit_Button" className="btn btn-primary hidden">Submit</button>
                
            </div>
            
        </div>
      
    )
}
export default Upload;