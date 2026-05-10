import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹'

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [professors, setProfessors] = useState([])

    const [token, setToken] = useState(
        localStorage.getItem('token') || ''
    )

    const [userData, setUserData] = useState(false)

    // Get Professors

    const getProfessorsData = async () => {

        try {

            const { data } = await axios.get(
                backendUrl + '/api/professor/list'
            )

            if (data.success) {

                setProfessors(data.professors)

            } else {

                toast.error(data.message)

            }

        } catch (error) {

            console.log(error)

            toast.error(error.message)

        }

    }

    // Get User Profile

    const loadUserProfileData = async (currentToken) => {

        try {

            const usedToken = currentToken || token

            if (!usedToken) {

                setUserData(false)

                return
            }

            const { data } = await axios.get(

                backendUrl + '/api/user/get-profile',

                {
                    headers: {
                        token: usedToken
                    }
                }

            )

            if (data.success) {

                setUserData(data.userData)

            } else {

                setUserData(false)

            }

        } catch (error) {

             console.log(error)

            setUserData(false)

            setToken('')

            localStorage.removeItem('token')

        }

    }

    useEffect(() => {

        getProfessorsData()

    }, [])

    useEffect(() => {

        if (token) {

            loadUserProfileData(token)

        } else {

            setUserData(false)

        }

    }, [token])

    const value = {

        professors,
        setProfessors,
        getProfessorsData,

        currencySymbol,

        backendUrl,

        token,
        setToken,

        userData,
        setUserData,

        loadUserProfileData

    }

    return (

        <AppContext.Provider value={value}>

            {props.children}

        </AppContext.Provider>

    )

}

export default AppContextProvider