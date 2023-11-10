const color1 = {
 backgroundColor:'blue',
}
const color2 = {
    backgroundColor:'red',
}

const color3 = {
    backgroundColor:'purple',
}

const color4 = {
    backgroundColor:'green',
}


const color5 = {
    backgroundColor:'yellow',
}

function Pallet(){
   
return(
<div>   
    <div>My Pallet: </div>
<ul className='colors'>
    <li className="color"style={color1}></li>
    <li className="color"style={color2}></li>
    <li className="color" style={color3}> </li>
    <li className="color"style={color4}></li>
    <li className="color"style={color5}> </li>
</ul>
</div> 
)
}

export default Pallet;