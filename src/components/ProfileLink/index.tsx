import Link from 'next/link';
import { Marble } from '@worldcoin/mini-apps-ui-kit-react';

interface ProfileLinkProps {
  userId: string;
  name: string;
  profilePicture?: string;
  className?: string;
}

export const ProfileLink = ({ 
  userId, 
  name, 
  profilePicture, 
  className = ''
}: ProfileLinkProps) => {
  return (
    <Link 
      href={`/profile/${userId}`} 
      className={`flex items-center gap-3 hover:bg-gray-50 p-2 rounded-md transition-colors ${className}`}
    >
      <Marble 
        src={profilePicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'} 
        className="w-10 h-10" 
      />
      <div className="flex-1">
        <p className="font-medium text-sm">{name}</p>
      </div>
      <span className="text-blue-600 text-sm font-medium hover:text-blue-700">
        View Profile
      </span>
    </Link>
  );
};
