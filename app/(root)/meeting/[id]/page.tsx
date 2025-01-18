"use client";
import { useUser } from '@clerk/nextjs'
const Meeting = ({params}:{params:{id:string}}) => {
  const {user,isLoaded}=useUser();
  return (
    <main className='h-screen w-full'>

    </main>
  )
}

export default Meeting
