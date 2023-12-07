import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { adminLogOut } from '../../ReduxSlice/AdminSlice';

function AdminDashboardContainer() {
  const navigateTo = useNavigate()
  const dispatch = useDispatch();
  const { isLoggedIN } = useSelector((state) => state.AppAdmin.AdminDetails);
  return (
    <section className='dashboardContainer'>
      {!isLoggedIN && <div className='protectedAreaContainer'>
        <div className="protectedBox">
          <h3 className='protectedMessage'>Admin Dashboard Locked <i className="fa-solid fa-user-lock protectedLOCkIcon"></i></h3>
          <div className="protectedButtonsContainer">
            <button className='protectedNavigateToBtn' onClick={() => navigateTo("/user/admin")}>Sign In </button>
          </div>
        </div>
      </div>}
      <aside className='dashboard__sidebar'>
        <div className='UserName_initials'>U</div>

        <button className='signoutButton' onClick={() => dispatch(adminLogOut())}>Sign Out</button>
      </aside>
      <div className='outletContainer'>
        <Outlet />

      </div>
    </section>
  )
}

export default AdminDashboardContainer
