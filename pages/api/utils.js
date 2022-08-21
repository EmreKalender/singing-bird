import prisma from 'lib/prisma'
import {faker} from '@faker-js/faker'
import {getSession} from 'next-auth/react'

export default async function handler(req,res){

    const session=await getSession({req});
    
    if(req.method!=='POST') return res.end()
    if(req.body.task==='cleanDatabase'){
        await prisma.tweet.deleteMany({})
        await prisma.user.deleteMany({
            where: {
                NOT:{
                    email:{
                        in: [session.user.email],
                    },
                },
            },
        })
    }

    if(req.body.task==='generateRandomUsersRandomTweets'){
        var newUserName;
        for(let count=0;count<5;count++)
        {
            await prisma.user.create({
                data:{
                    name: faker.internet.userName().toLowerCase(),
                    email: faker.internet.email().toLowerCase(),
                    image: faker.internet.avatar(),
                },
            })
         }
        const users=await prisma.user.findMany({})
        users.map(async(user)=>{
            await prisma.tweet.create({
                data:{
                    content: faker.hacker.phrase(),
                    author: {
                        connect: {id: user.id},
                    },
                },
            })
        })
    }

    if(req.body.task==='generateSingleTweet'){
        const users=await prisma.user.findMany({})

        const randomIndex=Math.floor(Math.random()*users.length)
        const user=users[randomIndex]
        await prisma.Tweet.create({
            data:{
                content: faker.hacker.phrase(),
                author: {
                    connect:{id: user.id},
                },
            },
        })
    }

    res.end()

}

