import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";


export function Signout(){

    const [cookies, setCookies, removeCookie] = useCookies('admin-id');
    let navigate = useNavigate();

    function handleSignoutClick(){
        removeCookie('admin-id');
        navigate('/');
        window.location.reload();
    }

    return(
        <button onClick={handleSignoutClick} className='btn btn-danger'> {cookies['admin-id']} - Signout</button>
    )
}