import React , {useEffect} from "react";
import {useNavigate , useRoutes} from "react-router-dom";

//pages list
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import CreateRepository from "./components/repo/CreateRepo";
import StarredRepositories from "./components/repo/StarredRepositories";
import Issue from "./components/issue/issue";


//auth context which is custom hook
import {useAuth} from "./authContext";

const ProjectRoutes = ()=>{
    const {currentUser, setCurrentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const userIdFromStorage = localStorage.getItem("userId");

        if(userIdFromStorage && !currentUser){
            setCurrentUser(userIdFromStorage);
        }

        if(!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname))
        {
            navigate("/auth");
        }

        if(userIdFromStorage && window.location.pathname=='/auth'){
            navigate("/");
        }
    }, [currentUser, navigate, setCurrentUser]);

    let element = useRoutes([
        {
            path:"/",
            element:<Dashboard/>
        },
        {
            path:"/auth",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
            path:"/profile",
            element:<Profile/>
        },
        {
            path:"/create" ,
            element:<CreateRepository />
        },
        {
            path: "/starredRepo",
            element : <StarredRepositories/>
        },
        {
           path : "/issue",
           element: < Issue/>
        },
        
    ]);

    return element;
}

export default ProjectRoutes;