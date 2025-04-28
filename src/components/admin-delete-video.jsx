import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export function DeleteVideo()
{
    let params = useParams([]);
    let navigate = useNavigate();
    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Description:'', Views:0, Likes:0, Dislikes:0, CategoryId:0}]);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:3030/get-video/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        })
    },[])

    function handleYesClick(){
        axios.delete(`http://127.0.0.1:3030/delete-video/${params.id}`)
        .then(()=>{
            navigate("/admin-dashboard");
        })
    }

    return(
        <div>
            <h3>Delete Video</h3>
            <p>Are you sure? What to Delete?</p>
            <div className="card w-25">
                <div className="card-header">
                    <iframe src={videos[0].Url} width="100%"></iframe>
                </div>
                <div className="card-body">
                    {videos[0].Title}
                </div>
                <div className="card-footer">
                    <button onClick={handleYesClick} className="btn btn-success me-2">Yes</button>
                    <Link className="btn btn-danger" to="/admin-dashboard">No</Link>
                </div>
            </div>
        </div>
    )
}