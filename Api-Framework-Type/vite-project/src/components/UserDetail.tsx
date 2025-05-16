import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import userApi from "../api/userApi";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await userApi.getDataUserById(Number(id));
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user detail:", error);
      }
    };

    fetchUserDetail();
  }, [id]);

  if (!user) return <p>Đang tải thông tin người dùng...</p>;

  return (
    <div>
      <h2>Thông tin chi tiết người dùng</h2>
      <p><strong>Tên:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Điện thoại:</strong> {user.phone}</p>
    </div>
  );
}
