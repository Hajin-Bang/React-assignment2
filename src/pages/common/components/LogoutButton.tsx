import { Button } from '@/components/ui/button';

export const LogoutButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-primary hover:text-primary-dark"
      onClick={onClick}
    >
      로그아웃
    </Button>
  );
};
