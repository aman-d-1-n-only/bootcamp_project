import React from "react";

customer_details = () => {
    const [data, setData ] = useState([]);

    useEffect (() => {
      fetch_data();
    }, []);


    const fetch_data = async () => {
       const response = await fetch ("");
        setData(await response.json);

        
    }
    return (
        <div>
            
        </div>
    )
}
