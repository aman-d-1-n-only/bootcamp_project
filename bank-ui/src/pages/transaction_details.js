import react from "react";

const transaction_details = () => {
    const [traqnsactions, setTransactions] = useState([]);


    useEffect (() => {
        fetch_data();

    }, [])
    const fetch_data = async () => {
     const response = await fetch ("");
     setTransactions(await response.json);
    }
    return()
}