import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../actions/cartAction';
import { useState } from 'react';
import type { RootState } from '../store/store';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cartState.cart);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!name.trim() || !price.trim()) return;

    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price)
    };

    dispatch(addProduct(newProduct));
    setName('');
    setPrice('');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Giỏ hàng</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên sản phẩm"
          className="border border-gray-300 p-2 rounded w-full"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Giá"
          className="border border-gray-300 p-2 rounded w-24"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thêm
        </button>
      </div>

      <ul className="mt-4 list-disc list-inside">
        {cart.map(item => (
          <li key={item.id} className="flex justify-between items-center mb-2">
            {item.name} - {item.price}k
            <button
              className="text-red-500 hover:underline"
              onClick={() => dispatch(removeProduct(item.id))}
            >
              Xoá
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
