import Tweet from 'components/Tweet'
import { getTweet } from 'lib/data'
import prisma from 'lib/prisma'
import { useSession } from 'next-auth/react'
import {useRouter} from 'next/router'

export default function SingleTweet({tweet}){
    const {data:session,status}=useSession()
    const router=useRouter()
    return (
    <div>
        <Tweet tweet={tweet}/>
        {session && session.user.email===tweet.author.email && (
            <a
                href='#'
                className='flex items-center w-12 px-3 py-2 mt-1 text-base font-medium leading-6 text-gray-500 rounded-full hover:bg-color-accent-hover hover:color-accent-hover'
                onClick={async () => {
                    const res = await fetch('/api/tweet', {
                        body: JSON.stringify({
                        id: tweet.id,
                    }),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'DELETE',
              })

              if (res.status === 401) {
                alert('Not your tweet')
              }
              if (res.status === 200) {
                router.push('/home')
                return
              }
            }}
            >
            delete
          </a> 
        )}
    </div>
    )
}

export async function getServerSideProps({params}){
    let tweet=await getTweet(params.id,prisma)
    tweet=JSON.parse(JSON.stringify(tweet))
    return {
        props:{
            tweet,
        },
    }
}