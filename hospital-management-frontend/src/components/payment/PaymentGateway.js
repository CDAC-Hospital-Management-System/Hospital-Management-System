import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import PaymentLoading from "./PaymentLoading";

function PaymentGateway() {
    const [isFetching, setIsFetching] = useState(true); 
    const location = useLocation();
    const patId = location.state.patId;

    useEffect(() => {
      console.log(patId);
        setTimeout(function () {
          console.log("Delayed for 5 second."); 
          console.log(patId);
          setIsFetching(false); 
        }, 3000);
      }, []);

    return ( 
        <div>
            {isFetching ? <PaymentLoading /> : <PaymentForm patId={patId}/>}
        </div>
     );
}

export default PaymentGateway;