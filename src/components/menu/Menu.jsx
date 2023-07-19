import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Button, Container, Dropdown, Menu } from "semantic-ui-react";
import JobSeekerDropdown from "../menu/dropdowns/JobSeekerDropdown";
import EmployerDropdown from "../menu/dropdowns/EmployerDropdown";

const CustomMenu = () => {
  const history = useHistory();
  const { jobseekerLoggedIn, employerLoggedIn } = useSelector(
    (state) => state.auth
  );

  const handleIsgverenClick = () => {
    history.push("/EmployerLogin"); // İşveren giriş sayfasına yönlendir
  };

  const handleIsArayanClick = () => {
    history.push("/JobSeekerLogin"); // İş arayan giriş sayfasına yönlendir
  };

  return (
    <Menu secondary style={{ backgroundColor: "#0473cb" }} className="menu">
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
          style={{ color: "white" }}
          content={<span style={{ color: "white" }}>Ana Sayfa</span>}
          color="black"
        />
        <Menu.Item
          as={NavLink}
          to="/jobAdvertisements"
          icon="bullhorn"
          style={{ color: "white" }}
          content={<span style={{ color: "white" }}>İlanlar</span>}
          color="black"
        />
        <Menu.Item
          as={NavLink}
          to="/isPozisyonlari"
          icon="list alternate"
          style={{ color: "white" }}
          content={<span style={{ color: "white" }}>İş Pozisyonları</span>}
          color="black"
        />


        <Menu.Item position="right">
          {employerLoggedIn || jobseekerLoggedIn ? (
            <>
              {employerLoggedIn && (
                <Menu.Item>
                  <Dropdown text="İşveren" pointing>
                    <Dropdown.Menu>
                      <EmployerDropdown />
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
              )}

              {jobseekerLoggedIn && (
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
                <Button color="#185e86" style={{ color: "#022440" }}>
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
                <Button color="#0b4668" style={{ marginLeft: "0.5em", color: "#022440" }}>
                  <Dropdown text="Kayıt Ol">
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
