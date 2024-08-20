import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "../app/services/restApi"

export const useUpdateUser = () => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state=>state.auth.user);
    const {data} = useGetUserQuery(loggedInUser.id);

    const updateUser = async () => {
        dispatch(updateUser(data));
    }

    return {updateUser};
}

