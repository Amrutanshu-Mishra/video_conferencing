import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {
  const now = new Date();
  const time=now.toLocaleTimeString(['en-US'],{hour:'2-digit',minute:'2-digit'});
  const days_arr=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months_arr=['January','February','March','April','May','June','July','August','September','October','Novemeber','December']
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      {/* <h1 className='text-3xl font-bold'>
        Home
      </h1> */}
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
          <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11 '>
            <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming Meeting at: 12:30 PM</h2>
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl font-extrabold lg:text-7xl' >

                {time}
              </h1>
              <p className='text-lg font-medium text-sky-1'>{days_arr[now.getDay()]}, {months_arr[now.getMonth()]}, {now.getFullYear()}</p>
            </div>
          </div>
      </div>
      <MeetingTypeList/>
    </section>
  )
}

export default Home
