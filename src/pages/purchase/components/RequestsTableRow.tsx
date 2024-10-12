import { Label } from '@/components/ui/label';
import { TableCell, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from 'react-hook-form';

export const RequestsTableRow: React.FC = () => {
  const { register } = useFormContext();

  return (
    <TableRow>
      <TableCell>
        <Label htmlFor="requests">요청 사항</Label>
      </TableCell>
      <TableCell>
        <Textarea
          id="requests"
          className="resize-none"
          placeholder="요청 사항을 입력하세요"
          {...register('requests')}
        />
      </TableCell>
    </TableRow>
  );
};
