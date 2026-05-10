import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [aToken, setAToken] = useState(
        localStorage.getItem("aToken")
            ? localStorage.getItem("aToken")
            : ""
    );

    const [appointments, setAppointments] = useState([]);

    const [professors, setProfessors] = useState([]);

    const [dashData, setDashData] = useState(false);



    // Axios Config
    const axiosConfig = {
        headers: {
            token: aToken
        }
    };



    // Getting all Professors data from Database using API
    const getAllProfessors = async () => {

    try {

        const { data } = await axios.get(
            backendUrl + '/api/admin/all-professors',
            {
                headers: {
                    token: aToken
                }
            }
        )

        console.log(data)

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


    // Function to change professor availability using API
    const changeAvailability = async (professorId) => {

        try {

            const { data } = await axios.post(
                `${backendUrl}/api/admin/change-availability`,
                { professorId },
                axiosConfig
            );

            if (data.success) {

                toast.success(data.message);

                getAllProfessors();

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



    // Getting all appointment data from Database using API
    const getAllAppointments = async () => {

        try {

            const { data } = await axios.get(
                `${backendUrl}/api/admin/appointments`,
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



    // Function to cancel appointment using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(
                `${backendUrl}/api/admin/cancel-appointment`,
                { appointmentId },
                axiosConfig
            );

            if (data.success) {

                toast.success(data.message);

                getAllAppointments();

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



    // Getting Admin Dashboard data from Database using API
    const getDashData = async () => {

        try {

            const { data } = await axios.get(
                `${backendUrl}/api/admin/dashboard`,
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

        aToken,
        setAToken,

        professors,
        getAllProfessors,
        changeAvailability,

        appointments,
        getAllAppointments,
        cancelAppointment,

        dashData,
        getDashData
    };



    return (

        <AdminContext.Provider value={value}>

            {props.children}

        </AdminContext.Provider>
    );
};

export default AdminContextProvider;