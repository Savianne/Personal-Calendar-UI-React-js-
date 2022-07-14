import { useState, useEffect } from "react";
import getAllEvents from "../controller/get-all-events";

const useEventListFetcher = () => {
    const [list, UpdateList] = useState([])
    
    useEffect(() => {

    }, [])
    return {list}
}