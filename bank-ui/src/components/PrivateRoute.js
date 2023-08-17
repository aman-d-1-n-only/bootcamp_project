import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = sessionStorage.getItem('jwtToken')
    // console.log(auth);
    return (
        (auth) ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRoutes;