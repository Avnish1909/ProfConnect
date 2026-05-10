import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currency =
        import.meta.env.VITE_CURRENCY;

    const backendUrl =
        import.meta.env.VITE_BACKEND_URL;


    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];


    // Function to format booking date
    const slotDateFormat = (slotDate) => {

        if (!slotDate) return "";

        const dateArray =
            slotDate.split('_');

        return (
            dateArray[0] +
            " " +
            months[Number(dateArray[1])] +
            " " +
            dateArray[2]
        );
    };


    // Function to calculate age
    const calculateAge = (dob) => {

        if (!dob) return "";

        const today = new Date();

        const birthDate = new Date(dob);

        let age =
            today.getFullYear() -
            birthDate.getFullYear();

        const monthDifference =
            today.getMonth() -
            birthDate.getMonth();

        if (
            monthDifference < 0 ||
            (
                monthDifference === 0 &&
                today.getDate() < birthDate.getDate()
            )
        ) {
            age--;
        }

        return age;
    };


    const value = {

        backendUrl,

        currency,

        slotDateFormat,

        calculateAge,
    };


    return (

        <AppContext.Provider value={value}>

            {props.children}

        </AppContext.Provider>
    );
};

export default AppContextProvider;