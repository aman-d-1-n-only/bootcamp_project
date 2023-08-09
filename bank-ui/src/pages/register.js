import react, { useState } from "react"

const customer_details = () => {
    const [name , setName] = useState("");
    const [address , setAddress] = useState("");
    const [email , setEmail] = useState("");
    const [contact , setContact] = useState(0);
    const [pinNo, setPinNo] = usestate(0);
    const [city, setCity] = useState("");
    const [balance , setBalance] = useState(0.00);

    return (
        <form>
       <p>User Login</p>
           <lable>
               <p>Name</p>
               <input type = "text"
               value = {name}
               onChange={() => {this.}}/>
           </lable>
           <lable>
               <p>Address</p>
               <input type = "text"/>
           </lable>
           <lable>
               <p>Email</p>
               <input type = "email"/>
           </lable>
           <lable>
               <p>Contact</p>
               <input type = "tel"/>
           </lable>
           <lable>
               <p>Pin No</p>
               <input type = "number"/>
           </lable>
           <lable>
               <p>City</p>
               <input type = "text"/>
           </lable>
           <lable for = "acc-typr">Acc type : </lable>
           <select name = "acc-types">
            <option values = ""></option>
            <option values = ""></option>
           </select>
          
           <lable>
               <p>Accoun No</p>
               <input type = "number"/>
           </lable>
           <lable>
               <p>Balance</p>
               <input type = "number"/>
           </lable>
           <div> <button type = "submit">Submit </button></div>
           <div> <button type = "reset">Reset</button></div>
   
        </form>
     )
}