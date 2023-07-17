'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@components/ui/button';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import useUser from '../../hooks/useUser';
import CreateRecipeDialog from '../elements/CreateRecipeDialog';
import {
  UserCircle2,
  Settings,
  Bookmark,
  ArrowUpRightSquare,
} from 'lucide-react';

const UserProfile = () => {
  const { session, user } = useUser();

  if (!user) {
    return (
      <Link
        href={'/api/auth/signin'}
        className="px-2 p-1 bg-yellow rounded-md text-black font-semibold"
      >
        Login
      </Link>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Image
          width={42}
          height={42}
          src={
            user?.image ||
            'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt="user profile picture"
          className="rounded-full w-10 h-10 cursor-pointer object-cover"
        />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-fit">
        <Link href={`/${user?.id}`} className="flex flex-row gap-1">
          <UserCircle2 /> Profile
        </Link>
        <Link href={`/${user?.id}/bookmarks`} className="flex flex-row gap-1">
          {' '}
          <Bookmark />
          Bookmarks
        </Link>
        <CreateRecipeDialog />
        <Link href={`/${user?.id}/settings`} className="flex flex-row gap-1">
          {' '}
          <Settings />
          Settings
        </Link>
        <Link href={'/api/auth/signout'} className="flex flex-row gap-1">
          {' '}
          <ArrowUpRightSquare />
          Signout
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
