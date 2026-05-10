import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>

        <img
          className='w-full md:max-w-[360px]'
          src={assets.about_image}
          alt=""
        />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>

          <p>
            Welcome to ProfConnect, your trusted platform for connecting
            students with professors conveniently and efficiently.
            We understand the challenges students face when it comes to
            scheduling meetings, discussing academic queries,
            project guidance, placements, and mentorship.
          </p>

          <p>
            ProfConnect is committed to improving academic communication
            through smart and efficient technology. Our platform helps
            students easily book appointments with professors across
            multiple departments including Computer Science, ECE,
            Electrical, Mechanical, Civil, and PIE.
            Whether you're seeking academic guidance, project mentorship,
            or career advice, ProfConnect is here to support you.
          </p>

          <b className='text-gray-800'>Our Vision</b>

          <p>
            Our vision at ProfConnect is to create a seamless academic
            interaction experience for every student and professor.
            We aim to bridge the gap between students and faculty members,
            making communication, mentorship, and appointment scheduling
            simpler and more accessible.
          </p>

        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>

          <b>EFFICIENCY:</b>

          <p>
            Streamlined appointment scheduling that fits into students'
            and professors' busy academic schedules.
          </p>

        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>

          <b>CONVENIENCE:</b>

          <p>
            Easy access to experienced professors across multiple
            engineering departments in one platform.
          </p>

        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>

          <b>PERSONALIZATION:</b>

          <p>
            Personalized appointment management and academic guidance
            tailored to students' learning and career goals.
          </p>

        </div>
      </div>

    </div>
  )
}

export default About