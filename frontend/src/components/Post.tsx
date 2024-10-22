'use client'

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

type PostProps = {
    id: number;
    likes: number;
    comments: number;
    shares: number;
    content: string;
    user: {
        id: number;
        username: string;
        name: string;
        avatar?: string;
    };
    timestamp?: string;
}

export default function Post({postProps}: {postProps: PostProps}) {
    const [liked, setLiked] = useState(false);

    return (
        <div className="p-4">
            <div className="flex space-x-4">
                <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=User${postProps.user.id + 1}`} alt={`@user${postProps.user.id + 1}`} />
                    <AvatarFallback className="dark:bg-orange-600">{`U${postProps.user.id + 1}`}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Usuário {postProps.user.name}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">@user{postProps.user.username}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">· 2h</span>
                    </div>
                    <p className="mt-2 text-gray-800 dark:text-gray-200">{postProps.content}</p>
                    <div className="mt-4 flex space-x-4">
                        <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300" onClick={() => setLiked(!liked)}>
                            <Heart className={`mr-2 h-4 w-4 hover:fill-orange-600 ${liked && 'fill-orange-600'}`}  />
                            {postProps.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            {postProps.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                            <Repeat2 className="mr-2 h-4 w-4" />
                            {postProps.shares}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                            <Share className="mx-auto h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}