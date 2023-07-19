import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { logoutUser } from '../../../store/actions/authActions';

export default function EmployerDropdown() {

  const employer = useSelector(state => state.auth.employer); 
  const id = employer ? employer.id : null;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/home');
  };

  return (
    <div  >
      <Link to={`/employeraccount/${id}`}>
        <Dropdown.Item text="bilgilerim" icon="info" style={{ backgroundColor: 'white' }}/>
      </Link>

      <Link to="/employerjobadvertisements">
        <Dropdown.Item text="ilanlarım" icon="info" style={{ backgroundColor: 'white' }}/>
      </Link>

      <Link to="/employeralerts">
        <Dropdown.Item text="bildirimlerim" icon="info"  style={{ backgroundColor: 'white' }}/>
      </Link>


      <Dropdown.Item text="Çıkış Yap" icon="sign-out" onClick={handleLogout} style={{ backgroundColor: 'white' }} />
    </div>
  )
}
