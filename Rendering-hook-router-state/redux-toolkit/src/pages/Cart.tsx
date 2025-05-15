import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../slices/cartSlice';
import { useState } from 'react';
import type { RootState, AppDispatch } from '../store/store';

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
const cart = useSelector((state: RootState) => state.cart.cart);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!name || !price) return;
    dispatch(addProduct({
      id: Date.now(),
      name,
      price: Number(price)
    }));
    setName('');
    setPrice('');
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Tên sản phẩm"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mr-2 rounded"
      />
      <input
        type="number"
        placeholder="Giá sản phẩm"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 mr-2 rounded"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAdd}
      >
        Thêm sản phẩm
      </button>

      <ul className="mt-4">
        {cart.map(item => (
          <li key={item.id} className="flex justify-between items-center mb-2">
            {item.name} - {item.price}k
            <button
              className="text-red-500 hover:underline"
              onClick={() => dispatch(removeProduct(item.id))}
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
