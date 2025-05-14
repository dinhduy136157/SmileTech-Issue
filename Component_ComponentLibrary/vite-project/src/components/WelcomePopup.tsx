import { Button } from "@/components/ui/button";

interface WelcomePopupProps {
  name: string;
  onClose: () => void;
}

export const WelcomePopup = ({ name, onClose }: WelcomePopupProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Chào mừng!</h2>
        <p className="mb-4">Xin chào, {name}!</p>
        <Button onClick={onClose} className="w-full">
          Đóng
        </Button>
      </div>
    </div>
  );
};