import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

const useNotify = () => useContext(NotificationContext)

export default useNotify