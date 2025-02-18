import { User } from '@/types/user';
import { MoreHorizontalIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

export const ActionsCell = ({ user }: { user: User }) => {
  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 text-sm font-medium">
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
