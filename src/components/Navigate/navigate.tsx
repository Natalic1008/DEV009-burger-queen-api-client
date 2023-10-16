import { useNavigate } from "react-router-dom";

export default function NavigateTo(path: string){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(path);
    };

    return handleClick;
}