
'use client'
import { useGetCalls } from '@/hooks/useGetCalls'
import { CallRecording } from '@stream-io/node-sdk'
import { Call } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard'
import Loader from './Loader'

const CallList = ({type}:{type:'ended' | 'upcoming' | 'recordings'}) => {
  // @ts-expect-error
  const {endedCalls,upcomingCalls,callRecordings,isLoading}= useGetCalls();
  const router=useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const getCalls=()=>{
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  }
  const getNoCallsMessage=()=>{
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'recordings':
        return 'No Recordings';
      case 'upcoming':
        return 'No Upcoming Calls';
      default:
        return '';
    }
  }

  useEffect(()=>{
    const fetchRecordings=async ()=>{
      // @ts-expect-error
      const callData=await Promise.all(callRecordings.map((meeting)=>meeting.queryRecordings()));
      // [['rec1','rec2'],['rec3']]
      
      const recordings=callData
      // @ts-expect-error
        .filter(call=>call.recordings.length>0)
        .flatMap()
      setRecordings(recordings);
    }

    if (type==='recordings') {
      fetchRecordings();
    }

  },[type,callRecordings]);

  const calls=getCalls();
  const noCallsMessage=getNoCallsMessage();
  if(isLoading) return <Loader/>

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length>0 ? calls.map((meeting:
        Call | CallRecording)=>(
          <MeetingCard
          key={(meeting as Call)?.id}
          icon={
            type==='ended'
            ? '/icons/previous.svg'
            : type==='upcoming'
            ? '/icons/upcoming.svg'
            :'/icons/recordings.svg'
          }
          // @ts-expect-error
          title={(meeting as Call).state?.custom.description.substring(0,26) || meeting.filename.substring(0,20) || 'No description'}
          // @ts-expect-error
          date={meeting.state.startsAt?.toLocaleString()||meeting.start_time.toLocaleString()}
          isPreviousMeeting={type=='ended'}
          buttonIcon1={type==='recordings' ? '/icons/play.svg':undefined}
          // @ts-expect-error
          handleClick={type==='recordings' ? ()=> router.push(`${meeting.url}`) : ()=>router.push(`/meeting/${meeting.id}`) }
          // @ts-expect-error
          link={type==='recordings' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
          buttonText={type==='recordings' ? 'Play' : 'Start'}
          />
        )
      ):(
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  )
}

export default CallList