import React, {
    useEffect,
    useState,
    useContext
} from "react";

import axios from "axios";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend
} from "recharts";

import { AdminContext } from "../../context/AdminContext";

import { AppContext } from "../../context/AppContext";

import { toast } from "react-toastify";

const Analytics = () => {

    const [data, setData] = useState([]);

    const [loading, setLoading] =
        useState(false);



    const { aToken } =
        useContext(AdminContext);

    const { backendUrl } =
        useContext(AppContext);



    // Fetch analytics data
    const getStats = async () => {

        try {

            setLoading(true);

            const { data } = await axios.get(

                `${backendUrl}/api/admin/speciality-stats`,

                {
                    headers: {
                        token: aToken
                    }
                }
            );



            if (data.success) {

                setData(data.stats);

            } else {

                toast.error(data.message);
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                error.message
            );

        } finally {

            setLoading(false);
        }
    };



    useEffect(() => {

        if (aToken) {

            getStats();
        }

    }, [aToken]);



    return (

        <div className="m-5 w-full">

            {/* Heading */}

            <div className="mb-5">

                <h1 className="text-2xl font-semibold text-gray-700">

                    Appointment Analytics

                </h1>

                <p className="text-sm text-gray-500 mt-1">

                    Total appointments by department

                </p>

            </div>



            {/* Chart Container */}

            <div className="bg-white p-5 rounded-xl shadow border w-full max-w-5xl">

                {

                    loading ? (

                        <div className="h-[450px] flex items-center justify-center">

                            <p className="text-gray-500">

                                Loading Analytics...

                            </p>

                        </div>

                    ) : data.length > 0 ? (

                        <ResponsiveContainer
                            width="100%"
                            height={450}
                        >

                            <BarChart
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 10,
                                    bottom: 20
                                }}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="speciality"
                                />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Bar
                                    dataKey="totalAppointments"
                                    radius={[8, 8, 0, 0]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    ) : (

                        <div className="h-[450px] flex items-center justify-center">

                            <p className="text-gray-500">

                                No Analytics Data Found

                            </p>

                        </div>

                    )
                }

            </div>

        </div>
    );
};

export default Analytics;