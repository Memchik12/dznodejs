
import {UsersListComponent} from "../../components/UserComponets/ui/UsersListComponent.jsx";
import {usePageTitle} from "../../hooks/usePageTitle.js";

export default function UsersListPage() {
    usePageTitle('Users List Page');
    return(
        <div>
            <h1>Users List Page</h1>
            <UsersListComponent />
        </div>
    )
}