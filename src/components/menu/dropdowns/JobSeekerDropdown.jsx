import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { logoutUser } from '../../../store/actions/authActions';

export default function JobSeekerDropdown() {

  const jobSeeker = useSelector((state) => state.auth.jobSeeker);
  const id = jobSeeker ? jobSeeker.id : null;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/home');
  };

  return (
    <div>
      <Link to={`/jobSeekerAccount/${id}`}>
        <Dropdown.Item
          text="bilgilerim"
          icon="info"
        />
      </Link>
      <Link to="/jobseekerfavorites">
        <Dropdown.Item
          text="favorilerim"
          icon="star"
          style={{ backgroundColor: 'e6f3f8' }} />
      </Link>

      <Link to={`/resumeDetail/${id}`}>
        <Dropdown.Item
          text="özgeçmişim"
          icon="info"
          style={{ backgroundColor: 'white' }} />
      </Link>

      <Link to="/basvurularım">
        <Dropdown.Item
          text="başvurularım"
          icon="info"
          style={{ backgroundColor: 'white' }} />
      </Link>
      <Dropdown.Item
        text="Çıkış Yap"
        icon="sign-out"
        onClick={handleLogout}
        style={{ backgroundColor: 'white' }} // Set background color to white
      />
    </div>
  );
}
