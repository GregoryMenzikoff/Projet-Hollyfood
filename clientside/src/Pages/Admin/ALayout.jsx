import React from 'react';
import { Outlet } from 'react-router-dom';

import './admin.css'

import AHeader from '../../Components/admin/AHeader/index';
import Footer from '../../Components/public/Footer';
import Header from '../../Components/public/Header';

const ALayout = () => {
    return (
        <div className="ALayout">
             
            <AHeader /> 
            <div id="admin" className="border-t border-gray-200 mt-4"> {/* Ajout d'une bordure en haut avec une marge */}
                <div id='admin_body'>
                    <Outlet />
                </div>
            </div>
            
        </div>
    );
};

export default ALayout;
