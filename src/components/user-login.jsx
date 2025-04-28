import axios from "axios"
import { useFormik } from "formik"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"


export function UserLogin(){


    let navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies('user-id');

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        onSubmit: (user)=> {
            axios.get('http://127.0.0.1:3030/get-users')
            .then(response=>{
                  var data = response.data.find(item => item.UserId===user.UserId);
                  if(data){
                     if(data.Password===user.Password){
                         setCookies('user-id', user.UserId);
                         navigate('/user-dashboard');
                     } else {
                         navigate('/user-error');
                     }
                  } else {
                     navigate('/user-error');
                  }
            })
        }
    })

    return(
        <div>
            <h2>User Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning">Login</button>
            </form>
        </div>
    )
}