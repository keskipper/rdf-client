import { 
    faTrash, 
    faSignOutAlt, 
    faEdit, 
    faSpinner, 
    faPlusCircle,
    faEnvelope,
    faUser,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
    return library.add(faTrash, faSignOutAlt, faEdit, faSpinner, faPlusCircle, faEnvelope, faUser, faMagnifyingGlass);
};

export default Icons;