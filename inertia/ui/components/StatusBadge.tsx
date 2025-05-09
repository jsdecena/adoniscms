import { Badge } from 'flowbite-react';
import { ENUM_CONTENT_STATUS } from '~/pages/admin/contents/pages/_types';

interface StatusBadgeProps {
  status?: string;
}

const statusColorMap: Record<string, string> = {
  [ENUM_CONTENT_STATUS.DRAFT]: 'gray',
  [ENUM_CONTENT_STATUS.PUBLISHED]: 'blue',
  [ENUM_CONTENT_STATUS.ARCHIVED]: 'red',
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  if (!status) return null;
  const color = statusColorMap[status] || 'gray';
  return (
    <Badge className="w-20 flex justify-center items-center" color={color}>
      {status.toUpperCase()}
    </Badge>
  );
}
