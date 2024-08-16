import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

export const useCheckAuth = (loginPage = false) => {
    const navigate = useNavigate();
    const authTokens = useSelector((state) => state.auth);
    if(authTokens.accessToken === null && !loginPage) {
        navigate('/auth/login');
    } else if (loginPage) {
        navigate('/');
    }
}