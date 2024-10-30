"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Post, { PostProps } from "@/components/Post"
import Form from "next/form"
import axios from "axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { usePostStore } from "@/store/usePostStore"



export default function FeedPage() {
  const userFullName = JSON.parse(localStorage.getItem('user') || '{}').fullName;
  const queryClient = useQueryClient();
  const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
  const { posts, setPosts } = usePostStore();

  const handleSubmitNewPost = async (formData: FormData) => {
    try {
      await axios.post('http://localhost:8080/api/post', {
        userId,
        content: formData.get('content')
      })
    } catch (error) {
      console.log(error)
    }
  }

  const {isPending, data} = useQuery({
    queryKey: ['postsData'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8080/api/post').then(res => res.json());
      setPosts(response);
      return response;
    },
    throwOnError: true,
    staleTime: 500
  }, queryClient);

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts])

  return (
      <div className="flex flex-col items-center">
        {/* Post Form */}
        <div className="py-4 px-20 border-b w-full border-gray-200 dark:border-gray-800">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@username" />
              <AvatarFallback className="dark:bg-orange-600">{userFullName.split(' ')[0][0]}{userFullName.split(' ')[1][0]}</AvatarFallback>
            </Avatar>
            <Form action={handleSubmitNewPost} className="flex-1 space-y-4">
              <Input
                placeholder="O que está acontecendo na universidade?"
                name="content"
                id="content"
                type="text"
                className="mb-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Postar</Button>
            </Form>
          </div>
        </div>

        {/* Feed */}
        <div className="divide-y divide-gray-200 dark:divide-gray-800 w-[800px]">
          {isPending ? <p>Carregando...</p> : (
            posts.map((post: PostProps) => <Post key={post.id} postProps={post} />)
          )}
        </div>
      </div>
  )
}