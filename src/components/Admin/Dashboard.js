import React from 'react';

import AdminLayout from '../../hoc/AdminLayout/AdminLayout';
import Zoom from 'react-reveal/Zoom';

const Dashboard = () => {
    return (
        <AdminLayout>
            <div className="user_dashboard">
                <Zoom>
                    <div>
                        Dashboard
                    </div>
                </Zoom>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;