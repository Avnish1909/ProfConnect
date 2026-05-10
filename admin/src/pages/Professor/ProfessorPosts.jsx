import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

import { ProfessorContext } from '../../context/ProfessorContext'
import { AppContext } from '../../context/AppContext'

const ProfessorPosts = () => {

  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const {
    pToken,
    profileData,
    getProfileData
  } = useContext(ProfessorContext)

  const {
    backendUrl
  } = useContext(AppContext)

  // Load professor profile
  useEffect(() => {

    if (pToken && !profileData) {
      getProfileData()
    }

  }, [pToken])

  const onSubmitHandler = async (e) => {

    e.preventDefault()

    if (!profileData) {
      return toast.error("Professor profile not loaded")
    }

    try {

      setLoading(true)

      const formData = new FormData()

      formData.append('content', content)

      if (image) {
        formData.append('image', image)
      }

      const { data } = await axios.post(

    backendUrl + "/api/professor/create-post",

    formData,

    {
        headers: {
            ptoken: pToken
        }
    }

)

      if (data.success) {

        toast.success(data.message)

        setContent('')

        setImage(null)

      } else {

        toast.error(data.message)
      }

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        error.message
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <form
      onSubmit={onSubmitHandler}
      className="p-6 w-full"
    >

      <p className="text-xl font-semibold text-gray-700 mb-5">
        Create Post
      </p>

      <div className="bg-white p-6 rounded-xl border shadow-sm max-w-2xl">

        {/* Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share an announcement, guidance, or update with students..."
          className="w-full border rounded-lg p-4 mb-5 outline-primary min-h-[140px]"
          required
        />

        {/* Image Upload */}
        <div className="mb-5">

          <input
            type="file"
            accept='image/*'
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 rounded-lg w-full"
          />

        </div>

        {/* Preview */}
        {
          image && (

            <img
              src={URL.createObjectURL(image)}
              className="w-full max-h-[400px] object-cover rounded-lg mb-5"
              alt="Preview"
            />

          )
        }

        {/* Submit */}
        <button
          type='submit'
          disabled={loading}
          className="bg-primary text-white px-8 py-2 rounded-full hover:opacity-90 transition-all disabled:opacity-50"
        >

          {
            loading
              ? "Publishing..."
              : "Publish Post"
          }

        </button>

      </div>

    </form>
  )
}

export default ProfessorPosts