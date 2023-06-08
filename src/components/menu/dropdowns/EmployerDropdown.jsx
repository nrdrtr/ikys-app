import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { logoutUser } from '../../../store/actions/authActions';

export default function EmployerDropdown() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(state => state.auth.userId); // Get the user ID from the Redux store

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/home');
  };

  return (
    <div backgroundColor="blue">
      <Link to={`/employerAccount/${userId}`}>
        <Dropdown.Item text="bilgilerim" icon="info" backgroundColor="blue"/>
      </Link>

      <Link to="/employeralerts">
        <Dropdown.Item text="bildirimlerim" icon="info" />
      </Link>

      <Link to="/employerjobadvertisements">
        <Dropdown.Item text="ilanlarım" icon="info" backgroundColor="blue"/>
      </Link>

      <Dropdown.Item text="Çıkış Yap" icon="sign-out" onClick={handleLogout} />
    </div>
  )
}
