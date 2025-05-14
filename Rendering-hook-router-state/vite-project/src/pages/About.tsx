import { useNavigate } from 'react-router-dom';


export default function About() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home'); 
    };
    return (
        <>
            <h1>About</h1>
            <p>Đây là trang About hehehe</p>
            <button 
                onClick={handleClick}
                className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
            >
                Về trang Home
            </button>

        </>
    )
}