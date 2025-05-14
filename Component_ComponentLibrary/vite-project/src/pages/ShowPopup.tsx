import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WelcomePopup } from "../components/WelcomePopup.tsx";

export const ShowPopup = () => {
  const [name, setName] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setShowPopup(true);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg">
        <h1 className="text-red-500">BÀI 1</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Tên của bạn
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên của bạn"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Gửi lời chào
        </Button>
      </form>

      {showPopup && (
        <WelcomePopup name={name} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};