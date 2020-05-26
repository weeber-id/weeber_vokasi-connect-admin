import React, { useState } from 'react';

import Cookies from 'js-cookie';

import './account.scss';
import { CircularProgress } from '@material-ui/core';
import CreateAccount from './create-account';
import EditPassword from './edit-password';
import AdminLists from './admin-lists';

const Account = ({ user }) => {
  const [create, setCreate] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [adminLists, setAdminLists] = useState(false);

  return (
    <>
      {editPassword ? <EditPassword toggleClose={setEditPassword} /> : null}
      {create ? <CreateAccount toggleClose={setCreate} /> : null}
      {adminLists ? <AdminLists toggleClose={setAdminLists} /> : null}
      <div className="account">
        <div className="account__superadmin">
          <div className="account__username">
            {!user ? (
              <CircularProgress color="inherit" size="3rem" />
            ) : (
              user?.username
            )}
          </div>
          {user?.role === 1 ? (
            <div className="account__crud">
              <span
                onClick={() => {
                  setCreate(true);
                }}
                className="account__crud-item"
              >
                Create Account
              </span>
              <span
                onClick={() => {
                  setEditPassword(true);
                }}
                className="account__crud-item"
              >
                Edit Password
              </span>
              <span
                onClick={() => setAdminLists(true)}
                className="account__crud-item account__crud-item--span"
              >
                Admin Lists
              </span>
            </div>
          ) : (
            <div className="account__crud">
              <span
                onClick={() => {
                  setEditPassword(true);
                }}
                className="account__crud-item"
              >
                Edit Password
              </span>

              <span className="account__crud-item">Delete</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
