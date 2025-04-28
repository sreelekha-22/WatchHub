import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";


export function EditVideo(){


    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Description:'', Views:0, Likes:0, Dislikes:0, CategoryId:0}])
    const [categories, setCategories] = useState([{CategoryId:0, CategoryName:''}]);

    let params = useParams();
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {VideoId:videos[0].VideoId, Title:videos[0].Title, Url:videos[0].Url, Description:videos[0].Description, Views:videos[0].Views, Likes:videos[0].Likes, Dislikes:videos[0].Dislikes, CategoryId:videos[0].CategoryId},
        onSubmit: (video)=>{
           axios.put(`http://127.0.0.1:3030/edit-video/${video.VideoId}`, video)
           .then(()=>{
              alert('Video Updated Successfully..');
              navigate('/admin-dashboard');
           })
        },
        enableReinitialize: true
    })

    function LoadVideo(){
        axios.get(`http://127.0.0.1:3030/get-video/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        })
    }
    function LoadCategories(){
        axios.get('http://127.0.0.1:3030/get-categories')
        .then(response=>{
            response.data.unshift({CategoryId:'-1', CategoryName:'Select Category'});
            setCategories(response.data);
        })
    }

    useEffect(()=>{
        LoadVideo();
        LoadCategories();
    },[])

   

    return(
        <div>
            <h4 className="text-warning">Edit Video</h4>
            <form onSubmit={formik.handleSubmit}>
            <dl className="row">
                    <dt className="col-3">Video Id</dt>
                    <dd className="col-9"><input tpye="number" onChange={formik.handleChange} value={formik.values.VideoId} name="VideoId" /></dd>
                    <dt className="col-3">Title</dt>
                    <dd className="col-9"><input  type="text" onChange={formik.handleChange} value={formik.values.Title} name="Title" /></dd>
                    <dt className="col-3">URL</dt>
                    <dd className="col-9"><input  type="text" onChange={formik.handleChange} value={formik.values.Url} name="Url" /></dd>
                    <dt className="col-3">Description</dt>
                    <dd className="col-9"><textarea  rows="4" onChange={formik.handleChange} value={formik.values.Description} cols="40" name="Description"></textarea></dd>
                    <dt className="col-3">Views</dt>
                    <dd className="col-9"><input  type="number" onChange={formik.handleChange} value={formik.values.Views} name="Views" /></dd>
                    <dt className="col-3">Likes</dt>
                    <dd className="col-9"><input  type="number" onChange={formik.handleChange} value={formik.values.Likes} name="Likes" /></dd>
                    <dt className="col-3">Dislikes</dt>
                    <dd className="col-9"><input  type="number" onChange={formik.handleChange} value={formik.values.Dislikes} name="Dislikes" /></dd>
                    <dt className="col-3">Category</dt>
                    <dd className="col-9">
                        <select name="CategoryId" onChange={formik.handleChange} value={formik.values.CategoryId}>
                            {
                                categories.map(category=><option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>)
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-success">Save</button>
                <Link to="/admin-dashboard" className="btn btn-warning ms-2">Cancel</Link>
            </form>
        </div>
    )
}