import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const initialUsers = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a.nguyen@example.com', role: 'Admin' },
  { id: 2, name: 'Trần Thị B', email: 'b.tran@example.com', role: 'User' },
  { id: 3, name: 'Lê Văn C', email: 'c.le@example.com', role: 'User' },
  { id: 4, name: 'Phạm Thị D', email: 'd.pham@example.com', role: 'Editor' },
  { id: 5, name: 'Hoàng Văn E', email: 'e.hoang@example.com', role: 'User' },
  { id: 6, name: 'Vũ Thị F', email: 'f.vu@example.com', role: 'User' },
  { id: 7, name: 'Đặng Văn G', email: 'g.dang@example.com', role: 'Editor' },
  { id: 8, name: 'Bùi Thị H', email: 'h.bui@example.com', role: 'User' },
  { id: 9, name: 'Đỗ Văn I', email: 'i.do@example.com', role: 'Admin' },
  { id: 10, name: 'Ngô Thị K', email: 'k.ngo@example.com', role: 'User' },
];

export function UserTable() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(currentUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleCheckboxChange = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedUsers.length === 0) return;
    
    if (confirm(`Xóa ${selectedUsers.length} người dùng đã chọn?`)) {
      setUsers(users.filter(user => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
      
      const remainingItems = users.length - selectedUsers.length;
      const newTotalPages = Math.ceil(remainingItems / usersPerPage);
      
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages > 0 ? newTotalPages : 1);
      }
    }
  };

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-4">
    <h1 className="text-red-500">Bài 2</h1>
      {selectedUsers.length > 0 && (

        <div className="flex justify-end">
          <Button onClick={handleDeleteSelected}>
            Xóa đã chọn ({selectedUsers.length})
          </Button>
        </div>
      )}

      <div className="rounded-md border">
        <Table>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Họ tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => handleCheckboxChange(user.id)}
                  />
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>



      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => paginate(currentPage - 1)}
              className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => paginate(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext

              onClick={() => paginate(currentPage + 1)}
              className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}