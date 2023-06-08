import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Button, Container, Dropdown, Menu } from "semantic-ui-react";
import JobSeekerDropdown from "../menu/dropdowns/JobSeekerDropdown";
import EmployerDropdown from "../menu/dropdowns/EmployerDropdown";

const CustomMenu = () => {
  const history = useHistory();
  const { isArayanLoggedIn, isgverenLoggedIn } = useSelector(
    (state) => state.auth
  );

  const handleIsgverenClick = () => {
    history.push("/EmployerLogin"); // İşveren giriş sayfasına yönlendir
  };

  const handleIsArayanClick = () => {
    history.push("/JobSeekerLogin"); // İş arayan giriş sayfasına yönlendir
  };

  return (
    <Menu secondary style={{ backgroundColor: "#019AA9" }} className="menu">
      <Container position="right">
        <Menu.Item>
          <div>
            <Link to="/home">
              <img
                src="https://res.cloudinary.com/dztwwdpj9/image/upload/v1678226359/ikyss_y6ptkh.png"
                alt="logo"
                className="logo"
              />
            </Link>
          </div>
        </Menu.Item>
        <Menu.Item
          as={NavLink}
          to="/home"
          icon="home"
          content="ANA SAYFA"
          color="black"
        />
        <Menu.Item
          as={NavLink}
          to="/jobAdvertisements"
          icon="bullhorn"
          content="İLANLAR"
          color="black"
        />
        <Menu.Item
          as={NavLink}
          to="/isPozisyonlari"
          icon="list alternate"
          content="POZİSYONLAR"
          color="black"
        />

        <Menu.Item position="right">
          {isgverenLoggedIn || isArayanLoggedIn ? (
            <>
              {isgverenLoggedIn && (
                <Menu.Item>
                  <Dropdown text="İşveren" pointing>
                    <Dropdown.Menu>
                      <EmployerDropdown />
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
              )}

              {isArayanLoggedIn && (
                <Menu.Item>
                  <Dropdown text="İş Arayan" pointing>
                    <Dropdown.Menu>
                      <JobSeekerDropdown />
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
              )}
            </>
          ) : (
            <>
              <Menu.Item style={{ marginLeft: "12em" }}>
                <Button color="black">
                  <Dropdown text="Giriş Yap">
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleIsgverenClick}>
                        İşveren Giriş
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleIsArayanClick}>
                        İş Arayan Giriş
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Button>
             
              
                <Button color="black"  style={{ marginLeft: "0.5em" }} >
                  <Dropdown text="Kayıt ol">
                    <Dropdown.Menu>
                      <Link to="/employerregister">
                        <Dropdown.Item>İşveren Kayıt</Dropdown.Item>
                      </Link>
                      <Link to="/jobseekerregister">
                        <Dropdown.Item>İş Arayan Kayıt</Dropdown.Item>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </Button>
              </Menu.Item>
            </>
          )}
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default CustomMenu;






































// import React from "react";
// import { Container, Menu } from "semantic-ui-react";
// import { Link, NavLink } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { userLogout, userLogin } from "../../store/actions/authActions";
// import SignedIn from "./SignedIn";
// import SignedOut from "./SignedOut";

// export default function Menü() {
//   const isAuthenticated = useSelector((state) => state.auth.authItem[0].loggedIn);
//   const dispatch = useDispatch();

//   function handleSignOut() {
//     dispatch(userLogout());
//   }

//   function handleSignIn() {
//     dispatch(userLogin({ id: 1, userType: 1 }));
//   }

//   return (
//     <div>
//       <Menu secondary style={{ backgroundColor: "#019AA9" }} className="menu">
//         <Container position="right">
//           <Menu.Item>
//             <div>
//               <Link to="/home">
//                 <img
//                   src="https://res.cloudinary.com/dztwwdpj9/image/upload/v1678226359/ikyss_y6ptkh.png"
//                   alt="logo"
//                   className="logo"
//                 />
//               </Link>
//             </div>
//           </Menu.Item>
//           <Menu.Item
//             as={NavLink}
//             to="/home"
//             icon="home"
//             content="ANA SAYFA"
//             color="black"
//           />
//           <Menu.Item
//             as={NavLink}
//             to="/jobAdvertisements"
//             icon="bullhorn"
//             content="İLANLAR"
//             color="black"
//           />
//           <Menu.Item
//             as={NavLink}
//             to="/isPozisyonlari"
//             icon="list alternate"
//             content="POZİSYONLAR"
//             color="black"
//           />
//           <Menu.Menu position="right">
//             {isAuthenticated ? (
//               <Menu.Item>
//                 <SignedIn signOut={handleSignOut} />
//               </Menu.Item>
//             ) : null}
//             {!isAuthenticated ? (
//               <Menu.Item>
//                 <SignedOut signIn={handleSignIn} />
//               </Menu.Item>
//             ) : null}
//           </Menu.Menu>
//         </Container>
//       </Menu>
//     </div>
//   );
// }