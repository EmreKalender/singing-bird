import prisma from 'lib/prisma'
import {getUserTweets} from 'lib/data.js'
import {getUserImage} from 'lib/data.js'
import Image from 'next/image'

import Tweets from 'components/Tweets'

export default function UserProfile({name, tweets, ImageURL}){
    console.log(ImageURL)
    return (
    <>
    <div className='flex justify-center'>
    <Image
        className='rounded-full content-center'
        src={ImageURL}
        alt=''
        width='200'
        height='200'
    />
    </div>
    <p className='text-center p-5'>User Profile of {name}</p>
    <Tweets tweets={tweets}/>
    </>
    )
}

export async function getServerSideProps({params}){
    let tweets=await getUserTweets(params.name, prisma)
    let ImageURL=await getUserImage(params.name,prisma)
    console.log(ImageURL)
    tweets=JSON.parse(JSON.stringify(tweets))
    ImageURL=JSON.parse(JSON.stringify(ImageURL))
    return {
        props: {
            name:params.name,
            tweets,
            ImageURL,
        },
    }
}