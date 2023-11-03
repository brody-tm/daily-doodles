import { useQuery } from '@'
import {makeRequest} from "../../axios"
const Posts = () => {

    const{isLoading,error, data} = useQuery(['posts'],()=> 
    makeRequest.get("/posts").then((res)=>{
        return res.data;
    }));
   console.log(data)
    return(
        <div className="posts">
            {error? "something went wrong" :
            isLoading ? "loading" : data.map((post)=>{
                <Post post={post} key={post.id}/>
            })}
        </div>
    )
}

export default Posts;