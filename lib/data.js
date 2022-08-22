export const getTweets=async (prisma,take)=>{
    const tweets= await prisma.Tweet.findMany({
        where: {
            parent: null,
        },
        orderBy: [{
            id: 'desc',
        }],
        include: {
            author: true,
        },
        take,
    })
    return tweets
}

export const getUserTweets=async (name,prisma)=>{
    const tweets=await prisma.Tweet.findMany({
        where:{
            author:{name: name,},
            parent: null,
        },
        orderBy:{id:'desc',},
        include:{author: true,},
    })
    return tweets
}

export const getUserImage=async (name,prisma)=>{
    const user=await prisma.User.findMany({
        where:{
            name: name,
        },
        orderBy:{id:'desc',},
    })
    return user[0].image
}

export const getTweet=async (id,prisma)=>{
    const tweet= await prisma.Tweet.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            author: true,
        },
    })
    if(tweet.parent){
        tweet.parentData=await prisma.Tweet.findUnique({
            where:{
                id: parseInt(tweet.parent),
            },
            include:{
                author: true,
            },
        })
    }
    return tweet
}

export const getReplies=async(id,prisma)=>{
    return await prisma.Tweet.findMany({
        where: {
            parent: parseInt(id),
        },
        orderBy: [{
            id: 'desc',
        }],
        include: {
            author: true,
        },
    })
}