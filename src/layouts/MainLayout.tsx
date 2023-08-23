import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="body-main">
            <Outlet />
        </div>
    )
}

export default MainLayout;