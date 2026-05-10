import React, { useContext, useState } from 'react';

import { assets } from '../../assets/assets';

import { toast } from 'react-toastify';

import axios from 'axios';

import { AdminContext } from '../../context/AdminContext';

import { AppContext } from '../../context/AppContext';

const AddProfessor = () => {

    const [professorImg, setProfessorImg] =
        useState(false);

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [experience, setExperience] =
        useState('1 Year');

    const [fees, setFees] = useState('');

    const [about, setAbout] = useState('');

    const [speciality, setSpeciality] =
        useState('Computer Science');

    const [degree, setDegree] = useState('');

    const [address1, setAddress1] =
        useState('');

    const [address2, setAddress2] =
        useState('');

    const [loading, setLoading] =
        useState(false);



    const { backendUrl } =
        useContext(AppContext);

    const { aToken } =
        useContext(AdminContext);



    const resetForm = () => {

        setProfessorImg(false);

        setName('');

        setEmail('');

        setPassword('');

        setExperience('1 Year');

        setFees('');

        setAbout('');

        setSpeciality('Computer Science');

        setDegree('');

        setAddress1('');

        setAddress2('');
    };



    const onSubmitHandler = async (event) => {

        event.preventDefault();

        try {

            setLoading(true);

            if (!professorImg) {

                setLoading(false);

                return toast.error(
                    'Image Not Selected'
                );
            }

            const formData = new FormData();

            formData.append(
                'image',
                professorImg
            );

            formData.append(
                'name',
                name
            );

            formData.append(
                'email',
                email
            );

            formData.append(
                'password',
                password
            );

            formData.append(
                'experience',
                experience
            );

            formData.append(
                'fees',
                Number(fees)
            );

            formData.append(
                'about',
                about
            );

            formData.append(
                'speciality',
                speciality
            );

            formData.append(
                'degree',
                degree
            );

            formData.append(
                'address',
                JSON.stringify({
                    line1: address1,
                    line2: address2
                })
            );



           const { data } = await axios.post(

  `${backendUrl}/api/admin/add-professor`,

  formData,

  {
    headers: {
      token: aToken,
      'Content-Type': 'multipart/form-data'
    }
  }
)



            if (data.success) {

                toast.success(data.message);

                resetForm();

            } else {

                toast.error(data.message);
            }

        } catch (error) {
    
                 console.log("ADD PROFESSOR ERROR:")

    console.log(error)

    console.log(
        error.response?.data
    )

    toast.error(
        error.response?.data?.message ||
        error.message
    )


        } 
        finally {

            setLoading(false);
        }
    };



    return (

        <form
            onSubmit={onSubmitHandler}
            className='m-5 w-full'
        >

            <p className='mb-3 text-lg font-medium'>

                Add Professor

            </p>



            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>



                {/* Upload Image */}

                <div className='flex items-center gap-4 mb-8 text-gray-500'>

                    <label htmlFor="professor-img">

                        <img
                            className='w-16 h-16 object-cover bg-gray-100 rounded-full cursor-pointer'
                            src={
                                professorImg
                                    ? URL.createObjectURL(professorImg)
                                    : assets.upload_area
                            }
                            alt="Upload"
                        />

                    </label>

                    <input
                        onChange={(e) =>
                            setProfessorImg(
                                e.target.files[0]
                            )
                        }
                        type="file"
                        id="professor-img"
                        hidden
                        accept='image/*'
                    />

                    <p>

                        Upload professor
                        <br />
                        picture

                    </p>

                </div>



                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>



                    {/* Left Side */}

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>



                        <div className='flex flex-col gap-1'>

                            <p>Professor Name</p>

                            <input
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                value={name}
                                className='border rounded px-3 py-2'
                                type="text"
                                placeholder='Professor Name'
                                required
                            />

                        </div>



                        <div className='flex flex-col gap-1'>

                            <p>Professor Email</p>

                            <input
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                value={email}
                                className='border rounded px-3 py-2'
                                type="email"
                                placeholder='Professor Email'
                                required
                            />

                        </div>



                        <div className='flex flex-col gap-1'>

                            <p>Set Password</p>

                            <input
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                value={password}
                                className='border rounded px-3 py-2'
                                type="password"
                                placeholder='Password'
                                required
                            />

                        </div>



                        <div className='flex flex-col gap-1'>

                            <p>Experience</p>

                            <select
                                onChange={(e) =>
                                    setExperience(
                                        e.target.value
                                    )
                                }
                                value={experience}
                                className='border rounded px-2 py-2'
                            >

                                <option value="1 Year">
                                    1 Year
                                </option>

                                <option value="2 Years">
                                    2 Years
                                </option>

                                <option value="3 Years">
                                    3 Years
                                </option>

                                <option value="4 Years">
                                    4 Years
                                </option>

                                <option value="5 Years">
                                    5 Years
                                </option>

                                <option value="6 Years">
                                    6 Years
                                </option>

                                <option value="7 Years">
                                    7 Years
                                </option>

                                <option value="8 Years">
                                    8 Years
                                </option>

                                <option value="9 Years">
                                    9 Years
                                </option>

                                <option value="10 Years">
                                    10 Years
                                </option>

                            </select>

                        </div>



                        <div className='flex flex-col gap-1'>

    <p> Fees</p>

    <input
        value={0}
        className='border rounded px-3 py-2 bg-gray-100 cursor-not-allowed'
        type="number"
        readOnly
    />

</div>

                    </div>



                    {/* Right Side */}

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>



                       <div className='flex flex-col gap-1'>

                            <p>Department</p>

                            <select
                                onChange={(e) =>
                                    setSpeciality(
                                        e.target.value
                                    )
                                }
                                value={speciality}
                                className='border rounded px-2 py-2'
                            >

                                <option value="Computer Science">
                                    Computer Science
                                </option>

                                <option value="Electronics">
                                    ECE
                                </option>

                                <option value="Electrical">
                                    Electrical
                                </option>

                                <option value="Mechanical">
                                    Mechanical
                                </option>

                                <option value="Civil">
                                    Civil
                                </option>

                                <option value="PIE">
                                    PIE
                                </option>

                            </select>

                </div>



                        <div className='flex flex-col gap-1'>

                            <p>Qualification</p>

                            <input
                                onChange={(e) =>
                                    setDegree(
                                        e.target.value
                                    )
                                }
                                value={degree}
                                className='border rounded px-3 py-2'
                                type="text"
                                placeholder='Qualification'
                                required
                            />

                        </div>



                        <div className='flex flex-col gap-1'>

                            <p>Office Address</p>

                            <input
                                onChange={(e) =>
                                    setAddress1(
                                        e.target.value
                                    )
                                }
                                value={address1}
                                className='border rounded px-3 py-2'
                                type="text"
                                placeholder='Building / Block'
                                required
                            />

                            <input
                                onChange={(e) =>
                                    setAddress2(
                                        e.target.value
                                    )
                                }
                                value={address2}
                                className='border rounded px-3 py-2'
                                type="text"
                                placeholder='Room Number'
                                required
                            />

                        </div>

                    </div>

                </div>



                {/* About */}

                <div>

                    <p className='mt-4 mb-2'>

                        About Professor

                    </p>

                    <textarea
                        onChange={(e) =>
                            setAbout(
                                e.target.value
                            )
                        }
                        value={about}
                        className='w-full px-4 pt-2 border rounded'
                        rows={5}
                        placeholder='Write about professor'
                        required
                    />

                </div>



                <button
                    type='submit'
                    disabled={loading}
                    className='bg-primary px-10 py-3 mt-4 text-white rounded-full disabled:opacity-50'
                >

                    {
                        loading
                            ? "Adding..."
                            : "Add Professor"
                    }

                </button>

            </div>

        </form>
    );
};

export default AddProfessor;