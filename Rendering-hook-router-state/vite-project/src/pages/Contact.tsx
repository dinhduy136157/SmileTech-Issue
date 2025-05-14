import { useNavigate } from 'react-router-dom';


export default function Contact() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/about'); 
    };
    return (
        <>
            <h1>Contact</h1>
            <p>Đây là trang Contact hihihi</p>
            <button 
                onClick={handleClick}
                className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
            >
                Đi đến trang About
            </button>
        </>
    )
}