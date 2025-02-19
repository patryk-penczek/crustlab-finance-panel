import { User } from '@/types/user';
import { MoreHorizontalIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { DepositDialog } from './dialogs/deposit-dialog';
import { ExchangeDialog } from './dialogs/exchange-dialog';
import { SendDialog } from './dialogs/send-dialog';
import { WithdrawDialog } from './dialogs/withdraw-dialog';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const ActionsCell = ({ user }: { user: User }) => {
  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 text-sm font-medium"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenuItem
            disabled
            className="text-muted-foreground text-xs font-semibold"
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={'/users/' + user.id}
              className="flex items-center w-full"
            >
              <UserIcon className="size-4 mr-1" />
              Profile
            </Link>
          </DropdownMenuItem>
          <hr className="my-1" />
          <DropdownMenuItem
            disabled
            className="text-muted-foreground text-xs font-semibold"
          >
            Operations
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <SendDialog action />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <DepositDialog action />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <WithdrawDialog action />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <ExchangeDialog action />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
