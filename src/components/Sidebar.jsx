import {useState, useEffect} from 'react'
import { userChatStore } from '../store/userChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { User } from 'lucide-react';
import { userAuthStore } from '../store/userAuthStore';

const Sidebar = () => {
  const {getUsers,users,selectedUser,setselectedUser,isUsersLoading}=userChatStore();
 const {onlineUsers}=userAuthStore();
  useEffect(() => {
    getUsers();
  }, [getUsers])

  if(isUsersLoading) return <SidebarSkeleton/>
  
  return (
    <aside className='h-full w-20 lg:w-72 border-base-300 flex flex-col transition-all duration-200'>
      <div className='border-b border-base-300 w-full p-5'>
        <div className='flex items-center gap-2'>
          <User className='size-6'/>
          <span className='font-medium hidden lg:block'>Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
      </div>

      <div className='overflow-y-auto w-full py-3'>
        {
          users.map((user)=>(
            <button
            key={user._id}
            onClick={()=>setselectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
              ${selectedUser?._id===user._id?"bg-base-300 ring-1 ring-base-300":""}
              `}            
            >
              <div className='relative mx-auto lg:mx-0'>
                <img src={user.profilePic || './avatar.png'} alt={user.name} className='size-12 object-cover rounded-full'/>
                {onlineUsers.includes(user._id) && (
                  <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900'></span>
                )}
              </div>

              <div className='hidden lg:block text-left min-w-0'>
                <div className='font-medium truncate'>{user.fullName}</div>
                <div className='text-sm text-zinc-400'>
                  {onlineUsers.includes(user._id)?"Online":"Offline"}
                </div>
              </div>
            </button>
          ))
        }

      </div>

    </aside>
  )
}

export default Sidebar