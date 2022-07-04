import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useContract, useSigner } from 'wagmi';
import axios from 'axios'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../components/contract/contract';
import moment from 'moment';

const courses = [
  'B.Tech',
  'B.Arch',
  'BCA',
  'B.Sc',
  'B.Pharma',
  'BDS',
  'BPT',
  'B.A'
]

const level = [
  'Higher Secondary',
  'Bachelors',
  'Masters',
  'Doctorate'
]

const VerifyStudentDetail = () => {
  const [state, setState] = useState();
  const [date, setDate] = useState();
  const [data, setData] = useState();

  const [submitStatus, updateSubmit] = useState("Verify");
  const [currClass, updateClass] = useState("text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2");
  const [disabledStatus, disabledUpdate] = useState(false);

  let params = useParams();
  const id = params.id;

  const { data: signer } = useSigner();

  const contract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: CONTRACT_ABI,
    signerOrProvider: signer
  })

  useEffect(() => {
    if (signer) {
      getStudents();
      dateFunc();
    }
  }, [signer])

  const location = useLocation();

  const getStudents = async () => {
    const data = await location.state;
    setData(data);
    console.log(data);
  }

  const dateFunc = async () => {
    const isoDate = await data.dob;
    const newDate = moment.utc(isoDate).format("MMM Do, YYYY");
    setDate(newDate);
    console.log(newDate);
  }



  const deleteFun = async (e) => {
    e.preventDefault();

    updateClass("text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2");
    updateSubmit("Verified & Pubished");
    disabledUpdate(true);
    const id = await data._id;
    console.log(id);

    const res = await fetch('https://desidbbackend.herokuapp.com/delete', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id
      })

    });
  }

  if (!signer) {
    return <div className='h-[90vh] w-screen flex items-center justify-center'>Pleae Connect to your metamask wallet</div>
  }

  return (
    <div>
      <form onSubmit={deleteFun}>
        <section className="h-auto px-12 pb-12">
          <p className="mt-1 mb-8 text-3xl font-semibold border-b pb-4 text-gray-900  ">
            Student Info
          </p>
          <div className='grid grid-cols-3 '>
            <div className='col-span-1'>

              <div className='grid grid-cols-2  gap-x-12 max-w-screen-md'>
                <div className="mb-5 col-span-1">
                  <label
                    htmlFor="first-name"
                    className="mb-3  block text-base font-semibold"
                  >
                    First Name
                  </label>
                  <input defaultValue={data?.fname} type="text" className='bg-gray-100 p-1 rounded' />

                </div>

                <div className="mb-5 col-span-1">
                  <label
                    htmlFor="last-name"
                    className="mb-3 block text-base font-semibold"
                  >
                    Last Name
                  </label>
                  <input defaultValue={data?.lname} type="text" className='bg-gray-100 p-1 rounded' />
                </div>

                <div className="mb-5 col-span-1">
                  <label
                    htmlFor="father-name"
                    className="mb-3 block text-base font-medium "
                  >
                    Father's Name
                  </label>
                  <input defaultValue={data?.father} type="text" className='bg-gray-100 p-1 rounded' />
                </div>

                <div className="mb-5 col-span-1">
                  <label
                    htmlFor="mother-name"
                    className="mb-3 block text-base font-semibold "
                  >
                    Mother's Name
                  </label>
                  <input defaultValue={data?.mother} type="text" className='bg-gray-100 p-1 rounded' />
                </div>

                <div className="mb-5 col-span-1">
                  <label
                    htmlFor="gender"
                    className="mb-3 block text-base font-semibold "
                  >
                    Gender
                  </label>
                  <select defaultValue={data?.gender} name='gender' >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-5 col-span-1">
                  <label
                    htmlFor="dob"
                    className="mb-3 block text-base font-semibold"
                  >
                    Date Of Birth
                  </label>
                  <input value={date} type="text" className='bg-gray-100 p-1 rounded' />
                </div>

                <div className="mb-5 col-span-1">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-base font-semibold "
                  >
                    Email
                  </label>
                  <input type="email" defaultValue={data?.email} className='bg-gray-100 p-1 rounded' />
                </div>

                <div className="mb-5 col-span-1">
                  <label
                    htmlFor="college-name"
                    className="mb-3 block text-base font-semibold "
                  >
                    College
                  </label>
                  <input type="text" defaultValue={data?.college} className='bg-gray-100 p-1 rounded' />
                </div>

                <div className='mb-5 col-span-1'>
                  <label
                    htmlFor="mobile-text"
                    className="mb-3 block text-base font-semibold "
                  > Course </label>
                  <select defaultValue={data?.course} name='course' >
                    {courses.map((course, i) => (
                      <option value={course} key={i}>{course}</option>
                    ))}
                  </select>

                </div>
                <div className="mb-5 col-span-1">
                  <label
                    htmlFor="mobile-text"
                    className="mb-3 block text-base font-semibold "
                  >
                    Level
                  </label>
                  <select defaultValue={data?.level} name='level' >
                    {level.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-5 col-span-1">
                  <label
                    htmlFor="mobile-text"
                    className="mb-3 block text-base font-semibold"
                  >
                    Mobile
                  </label>
                  <input type="text" defaultValue={data?.mobile} className='bg-gray-100 p-1 rounded' />
                </div>

                <div className='col-span-2'>
                  <button type='submit' className={currClass} disabled={disabledStatus}>
                    {submitStatus}
                    {/* {loading ? "Processing Transaction..." : "Register Student "} */}
                  </button>
                </div>


              </div>
            </div>
            <div className='col-span-2 flex items-center justify-center '>
              <img src="https://i.postimg.cc/3wPQjJFm/undraw-Scrum-board-re-wk7v.png" className="h-[500px]" alt="..." />
            </div>
          </div>
        </section>
      </form>
      
    </div>
  )
}

export default VerifyStudentDetail