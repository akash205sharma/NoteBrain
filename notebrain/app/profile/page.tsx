'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Save, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');

  if (status === 'loading') return <div className="text-white text-center mt-10">Loading...</div>;
  if (!session) return <div className="text-white text-center mt-10">Not logged in</div>;

  const handleSave = () => {
    // NOTE: NextAuth doesn't persist edits to GitHub profile.
    // You would need your own backend for saving these.
    setEditMode(false);
    console.log('Save clicked:', { name, email });
  };

  const user = session.user;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#0d0d0d] text-white border border-gray-800">
        <CardHeader className="flex flex-col items-center gap-3">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.image || ''} alt={user?.name || 'User'} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-center text-white">Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          <div className="space-y-1">
            <label className="text-gray-400 text-sm">Name</label>
            {editMode ? (
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black border-gray-700 text-white"
              />
            ) : (
              <p className="text-gray-200">{name}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-gray-400 text-sm">Email</label>
            {editMode ? (
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border-gray-700 text-white"
              />
            ) : (
              <p className="text-gray-200">{email}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-gray-400 text-sm">Signed in via</label>
            <p className="text-gray-200">GitHub</p>
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => {
                editMode ? handleSave() : setEditMode(true);
              }}
              className="flex items-center gap-2"
            >
              {editMode ? <Save className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
              {editMode ? 'Save' : 'Edit'}
            </Button>

            <Button
              variant="destructive"
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
