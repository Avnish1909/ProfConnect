import { createContext, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

export const ProfessorContext = createContext();

const ProfessorContextProvider = (props) => {

    const backendUrl =
        import.meta.env.VITE_BACKEND_URL;

    const [pToken, setPToken] = useState(
        localStorage.getItem("pToken")
            ? localStorage.getItem("pToken")
            : ""
    );

    const [appointments, setAppointments] =
        useState([]);

    const [dashData, setDashData] =
        useState(false);

    const [profileData, setProfileData] =
        useState(false);



    // Axios Config
    const axiosConfig = {
        headers: {
            ptoken: pToken
        }
    };



    // Getting Professor appointment data from Database using API
    const getAppointments = async () => {

        try {

            const { data } = await axios.get(
                `${backendUrl}/api/professor/appointments`,
                axiosConfig
            );

            if (data.success) {

                setAppointments(
                    data.appointments.reverse()
                );

            } else {

                toast.error(data.message);
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                error.message
            );
        }
    };



    // Getting Professor profile data from Database using API
    const getProfileData = async () => {

        try {

            const { data } = await axios.get(
                `${backendUrl}/api/professor/profile`,
                axiosConfig
            );

            if (data.success) {

                setProfileData(data.profileData);

            } else {

                toast.error(data.message);
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                error.message
            );
        }
    };



    // Function to cancel appointment using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(
                `${backendUrl}/api/professor/cancel-appointment`,
                { appointmentId },
                axiosConfig
            );

            if (data.success) {

                toast.success(data.message);

                getAppointments();

                getDashData();

            } else {

                toast.error(data.message);
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                error.message
            );
        }
    };



    // Function to mark appointment completed
    const completeAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(
                `${backendUrl}/api/professor/complete-appointment`,
                { appointmentId },
                axiosConfig
            );

            if (data.success) {

                toast.success(data.message);

                getAppointments();

                getDashData();

            } else {

                toast.error(data.message);
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                error.message
            );
        }
    };



    // Getting Professor dashboard data
    const getDashData = async () => {

        try {

            const { data } = await axios.get(
                `${backendUrl}/api/professor/dashboard`,
                axiosConfig
            );

            if (data.success) {

                setDashData(data.dashData);

            } else {

                toast.error(data.message);
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                error.message
            );
        }
    };



    const value = {

        pToken,
        setPToken,

        backendUrl,

        appointments,
        getAppointments,

        cancelAppointment,
        completeAppointment,

        dashData,
        getDashData,

        profileData,
        setProfileData,

        getProfileData,
    };



    return (

        <ProfessorContext.Provider value={value}>

            {props.children}

        </ProfessorContext.Provider>
    );
};

export default ProfessorContextProvider;