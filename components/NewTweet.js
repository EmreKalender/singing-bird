import { useSession} from 'next-auth/react'
import { useRouter } from 'next/router';
import {useState} from 'react'
export default function ({tweets,setTweets}){
    const {data: session,status}=useSession();
    const [content,setContent]=useState('')
    const router=useRouter()
    if(!session || !session.user) return null;
    return(
        <form
        onSubmit={ async (event)=>{
            event.preventDefault();
            if(!content){
                alert('no content')
                return
            }
            const res=await fetch('api/tweet',{
                body: JSON.stringify({
                    content,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                })

            const tweet=await res.json()
            setTweets([...tweet, ...tweets])
            setContent('')
        }}>
            <div className='flex'>
                <div className='flex-1 px-1 pt-2 mt-2 mr-1 ml-1'>
                    <textarea
                        className='border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary'
                        rows={2}
                        cols={50}
                        placeholder="What do you sing?"
                        name='content'
                        value={content}
                        onChange={(event)=>setContent(event.target.value)}
                        />
                </div>
            </div>   
            <div className='flex'>
                <div className='flex-1 mb-5'>
                    <button className='border float-right px-8 py-2 mt-0 mr-2 font-bold rounded-full'>
                        Sing
                    </button>
                </div>

            </div>
        </form>
    )
}