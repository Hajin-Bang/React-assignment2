import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TableCell, TableRow } from '@/components/ui/table';
import { Building, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

export const PaymentMethodTableRow = () => {
  const { control } = useFormContext();

  const paymentMethods = [
    { value: 'accountTransfer', label: '계좌이체', icon: Building },
    { value: 'creditCard', label: '신용/체크카드', icon: CreditCard },
    { value: 'phone', label: '휴대폰', icon: Smartphone },
    { value: 'depositWithoutPassbook', label: '무통장입금', icon: Wallet },
  ];

  return (
    <TableRow>
      <TableCell className="font-bold w-[120px]">
        <Label className="flex items-center">
          <CreditCard className="mr-2 h-4 w-4" />
          결제 방법
        </Label>
      </TableCell>
      <TableCell>
        <Controller
          name="payment"
          control={control}
          rules={{ required: '결제 방법을 선택하세요' }}
          render={({ field }) => (
            <RadioGroup
              {...field}
              onValueChange={(value) => field.onChange(value)}
              className="flex flex-wrap gap-4"
            >
              {paymentMethods.map(({ value, label, icon: Icon }) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={value} />
                  <Label
                    htmlFor={value}
                    className="flex items-center cursor-pointer"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
      </TableCell>
    </TableRow>
  );
};
