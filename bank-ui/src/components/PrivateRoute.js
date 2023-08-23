import { Outlet, Navigate } from 'react-router-dom'
import { Nav } from './Nav';

const PrivateRoutes = () => {
    let auth = sessionStorage.getItem('jwtToken')
    // console.log(auth);
    return (
    (auth) ? <>
    
     <Nav/>
     <div className="">
     <Outlet /> 
    </div>
    </>: <Navigate to="/" /> 
    )
}

export default PrivateRoutes;