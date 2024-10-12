import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TableCell, TableRow } from '@/components/ui/table';
import { useFormContext } from 'react-hook-form';

export const NameTableRow: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TableRow>
      <TableCell>
        <Label htmlFor="name">이름</Label>
      </TableCell>
      <TableCell>
        <Input
          id="name"
          type="text"
          placeholder="이름을 입력하세요"
          {...register('name', { required: '이름을 입력하세요' })}
        />
        {errors.name?.message && typeof errors.name.message === 'string' && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </TableCell>
    </TableRow>
  );
};
