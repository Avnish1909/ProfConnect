import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import socket from '../socket'

const Browse = () => {

  const [posts, setPosts] = useState([])

  const navigate = useNavigate()

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  // Get All Posts
  const getPosts = async () => {

    try {

      const { data } = await axios.get(
        backendUrl + "/api/user/posts"
      )

      console.log("RESPONSE:", data)

      if (data.success) {

        setPosts(data.posts)

      }

    } catch (error) {

      console.log("API ERROR:", error)

    }

  }

  useEffect(() => {

    getPosts()

  }, [])

  useEffect(() => {

    socket.on("new-post", (post) => {

        setPosts(prev => [post, ...prev])

    })

    return () => {

        socket.off("new-post")

    }

}, [])

  return (

    <div className='p-6 max-w-2xl mx-auto'>

      <h1 className='text-2xl font-semibold mb-6'>
        Professor Feed
      </h1>

      {
        posts.length === 0 ? (

          <p>No posts yet...</p>

        ) : (

          posts.map((post) => (

            <div
              key={post._id}
              className='border rounded-xl p-4 mb-6 shadow bg-white'
            >

              {/* Professor Info */}

              <div
                className='flex items-center gap-3 cursor-pointer'
                onClick={() => {

                  navigate(`/appointment/${post.professorId}`)

                  scrollTo(0, 0)

                }}
              >

                <img
                  src={post.professorData?.image}
                  className='w-10 h-10 rounded-full object-cover'
                  alt=""
                />

                <div>

                  <p className='font-medium'>
                    {post.professorData?.name}
                  </p>

                  <p className='text-sm text-gray-500'>
                    {post.professorData?.speciality}
                  </p>

                </div>

              </div>

              {/* Content */}

              <p className='mt-3 text-gray-700'>
                {post.content}
              </p>

              {/* Post Image */}

              {
                post.image && (

                  <img
                    src={post.image}
                    className='mt-3 rounded-lg w-full max-h-[500px] object-cover'
                    alt=""
                  />

                )
              }

            </div>

          ))
        )
      }

    </div>

  )

}

export default Browse