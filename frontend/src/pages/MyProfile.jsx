import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)

    const [image, setImage] = useState(false)

    const [loading, setLoading] = useState(false)

    const {
        token,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData
    } = useContext(AppContext)

    // Update Profile

    const updateUserProfileData = async () => {

        try {

            setLoading(true)

            const formData = new FormData()

            formData.append(
                'name',
                userData.name || ''
            )

            formData.append(
                'phone',
                userData.phone || ''
            )

            formData.append(
                'address',
                JSON.stringify(
                    userData.address || {}
                )
            )

            formData.append(
                'gender',
                userData.gender &&
                userData.gender !== 'Not Selected'
                    ? userData.gender
                    : ''
            )

            formData.append(
                'dob',
                userData.dob &&
                userData.dob !== 'Not Selected'
                    ? userData.dob
                    : ''
            )

            if (image) {

                formData.append('image', image)

            }

            const { data } = await axios.post(

                backendUrl + '/api/user/update-profile',

                formData,

                {
                    headers: {
                        token,
                        'Content-Type': 'multipart/form-data'
                    }
                }

            )

            if (data.success) {

                toast.success(data.message)

                await loadUserProfileData()

                setIsEdit(false)

                setImage(false)

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

    return userData ? (

        <div className='max-w-lg flex flex-col gap-2 text-sm pt-5'>

            {/* Profile Image */}

            {
                isEdit ? (

                    <label htmlFor='image'>

                        <div className='inline-block relative cursor-pointer'>

                            <img
                                className='w-36 h-36 object-cover rounded opacity-75'
                                src={
                                    image
                                        ? URL.createObjectURL(image)
                                        : userData.image
                                }
                                alt=""
                            />

                            <img
                                className='w-10 absolute bottom-12 right-12'
                                src={assets.upload_icon}
                                alt=""
                            />

                        </div>

                        <input
                            onChange={(e) =>
                                setImage(e.target.files[0])
                            }
                            type="file"
                            id="image"
                            hidden
                            accept='image/*'
                        />

                    </label>

                ) : (

                    <img
                        className='w-36 h-36 object-cover rounded'
                        src={userData.image}
                        alt=""
                    />

                )
            }

            {/* Name */}

            {
                isEdit ? (

                    <input
                        className='bg-gray-50 text-3xl font-medium max-w-60 outline-primary'
                        type="text"
                        value={userData.name || ''}
                        onChange={(e) =>
                            setUserData(prev => ({
                                ...prev,
                                name: e.target.value
                            }))
                        }
                    />

                ) : (

                    <p className='font-medium text-3xl text-[#262626] mt-4'>

                        {userData.name || 'User'}

                    </p>

                )
            }

            <hr className='bg-[#ADADAD] h-[1px] border-none' />

            {/* Contact Info */}

            <div>

                <p className='text-gray-600 underline mt-3'>

                    CONTACT INFORMATION

                </p>

                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>

                    <p className='font-medium'>
                        Email:
                    </p>

                    <p className='text-blue-500 break-all'>
                        {userData.email}
                    </p>

                    <p className='font-medium'>
                        Phone:
                    </p>

                    {
                        isEdit ? (

                            <input
                                className='bg-gray-50 max-w-52 outline-primary'
                                type="text"
                                value={userData.phone || ''}
                                onChange={(e) =>
                                    setUserData(prev => ({
                                        ...prev,
                                        phone: e.target.value
                                    }))
                                }
                            />

                        ) : (

                            <p className='text-blue-500'>
                                {userData.phone || 'Not Added'}
                            </p>

                        )
                    }

                    <p className='font-medium'>
                        Address:
                    </p>

                    {
                        isEdit ? (

                            <div className='flex flex-col gap-2'>

                                <input
                                    className='bg-gray-50 p-1 outline-primary'
                                    type="text"
                                    placeholder='Address Line 1'
                                    value={userData.address?.line1 || ''}
                                    onChange={(e) =>
                                        setUserData(prev => ({
                                            ...prev,
                                            address: {
                                                ...prev.address,
                                                line1: e.target.value
                                            }
                                        }))
                                    }
                                />

                                <input
                                    className='bg-gray-50 p-1 outline-primary'
                                    type="text"
                                    placeholder='Address Line 2'
                                    value={userData.address?.line2 || ''}
                                    onChange={(e) =>
                                        setUserData(prev => ({
                                            ...prev,
                                            address: {
                                                ...prev.address,
                                                line2: e.target.value
                                            }
                                        }))
                                    }
                                />

                            </div>

                        ) : (

                            <p className='text-gray-500'>

                                {userData.address?.line1 || 'Not Added'}

                                <br />

                                {userData.address?.line2}

                            </p>

                        )
                    }

                </div>

            </div>

            {/* Basic Info */}

            <div>

                <p className='text-[#797979] underline mt-3'>

                    BASIC INFORMATION

                </p>

                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>

                    <p className='font-medium'>
                        Gender:
                    </p>

                    {
                        isEdit ? (

                            <select
                                className='max-w-32 bg-gray-50 outline-primary'
                                value={
                                    userData.gender &&
                                    userData.gender !== 'Not Selected'
                                        ? userData.gender
                                        : ''
                                }
                                onChange={(e) =>
                                    setUserData(prev => ({
                                        ...prev,
                                        gender: e.target.value
                                    }))
                                }
                            >

                                <option value="">
                                    Select
                                </option>

                                <option value="Male">
                                    Male
                                </option>

                                <option value="Female">
                                    Female
                                </option>

                            </select>

                        ) : (

                            <p className='text-gray-500'>

                                {
                                    userData.gender &&
                                    userData.gender !== 'Not Selected'
                                        ? userData.gender
                                        : 'Not Added'
                                }

                            </p>

                        )
                    }

                    <p className='font-medium'>
                        Birthday:
                    </p>

                    {
                        isEdit ? (

                            <input
                                className='max-w-40 bg-gray-50 outline-primary'
                                type='date'
                                value={
                                    userData.dob &&
                                    userData.dob !== 'Not Selected'
                                        ? userData.dob
                                        : ''
                                }
                                onChange={(e) =>
                                    setUserData(prev => ({
                                        ...prev,
                                        dob: e.target.value
                                    }))
                                }
                            />

                        ) : (

                            <p className='text-gray-500'>

                                {
                                    userData.dob &&
                                    userData.dob !== 'Not Selected'
                                        ? userData.dob
                                        : 'Not Added'
                                }

                            </p>

                        )
                    }

                </div>

            </div>

            {/* Buttons */}

            <div className='mt-10'>

                {
                    isEdit ? (

                        <button
                            disabled={loading}
                            onClick={updateUserProfileData}
                            className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-50'
                        >

                            {
                                loading
                                    ? 'Saving...'
                                    : 'Save Information'
                            }

                        </button>

                    ) : (

                        <button
                            onClick={() => setIsEdit(true)}
                            className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
                        >

                            Edit

                        </button>

                    )
                }

            </div>

        </div>

    ) : null

}

export default MyProfile