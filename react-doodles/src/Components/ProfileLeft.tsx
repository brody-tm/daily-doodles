import Pallet from "../Components/profilePallet";

function LeftSide(){
    var name ='John Doe';
    var description ='Just here to have a good time';
return(
    
    <div className="column" id="column1">
<ul className='leftgroup'>
<li className="list-group-item">{name}</li>
<li className="list-group-item">{description}</li>
<li className="list-group-item"><Pallet></Pallet></li>
<li className="list-group-item"><button>Edit Profile</button></li>
<li className="list-group-item"><button>Sign Out</button></li>
</ul>
</div>
)
}

export default LeftSide;