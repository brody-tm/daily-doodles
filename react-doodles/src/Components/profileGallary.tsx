import samplePic1 from "../images/leaderboardPic1.png";
import samplePic2 from "../images/leaderboardPic3.png";
import samplePic3 from "../images/leaderboardPic2.png";
import samplePic4 from "../images/leaderboardPic4.png";


function MyGallary(){
   
return(
    <div id="column2" className="column">
        <div className="headerCenter"><div className="header">My Gallery</div></div>
       <div className="gallaryContainer">
        <img src={samplePic1}  className="center"/>
         <img src={samplePic2}  className="center"/>
         <img src={samplePic3}  className="center"/>
         <img src={samplePic4} className="center"/>
         </div>    
    </div>
 
)
}

export default MyGallary;