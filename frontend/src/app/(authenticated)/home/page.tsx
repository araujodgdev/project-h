"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Post from "@/components/Post"
import Form from "next/form"
import axios from "axios"
import { useUserStore } from "@/store/useUserStore"
export default function FeedPage() {
  const userId = useUserStore(state => state.id);

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

  return (
      <div className="flex flex-col items-center h-screen">
        {/* Post Form */}
        <div className="py-4 px-20 border-b w-full border-gray-200 dark:border-gray-800">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@username" />
              <AvatarFallback className="dark:bg-orange-600">JD</AvatarFallback>
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
          {[...Array(2)].map((_, i) => {
            const post = {
              id: i,
              likes: Math.floor(Math.random() * 100),
              comments: Math.floor(Math.random() * 100),
              shares: Math.floor(Math.random() * 100),
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec lacus nec nunc, lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec lacus nec nunc.",
              user: {
                id: i,
                username: `user${i + 1}`,
                name: `User ${i + 1}`,
              },
            } 
            return <Post key={i} postProps={post} />
          })}
        </div>
      </div>
  )
}