import { useState, useEffect } from 'react'
import userApi from "../api/userApi.ts"
import { useNavigate } from 'react-router';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function User() {
    const [dataUser, setUser] = useState<User[]>([]);
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchDataUser = async () => {
            const response = await userApi.getDataUser();
            setUser(response.data);
        }
        fetchDataUser();
    }, [])
    const handleNavigate = (userId : number) => {
        navigate(`user/${userId}`)
    }
    return (

        <div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>STT</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <td>Thao tác</td>
                </tr>
                {dataUser.map((data, index) => (
                <tr>
                    <td key={index}>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>
                    <td>
                        <button onClick={() => handleNavigate(data.id)}>Xem chi tiết</button>
                    </td>
                </tr>
                ))}
            </table>
        </div>
    )
}
