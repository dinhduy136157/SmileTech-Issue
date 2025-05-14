import { useNavigate } from 'react-router-dom';


export default function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/contact'); 
    };
    return (
        <>
            <p>Đề bài: Tạo 3 trang: Home, About, Contact. Có navigation bar để chuyển trang</p>
            <h1>Home</h1>
            <p>Đây là trang Home huhuhuj</p>
            <button 
                onClick={handleClick}
                className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
            >
                Đi đến trang Contact
            </button>

        </>
    )
}