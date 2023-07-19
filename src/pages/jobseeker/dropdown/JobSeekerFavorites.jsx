import React, { useEffect, useState } from 'react';
import { Table, Container } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import FavoriServis from '../../../services/FavoriService';
import HrmsModalDeleteButton from '../../../utilities/customFormControls/HrmsModalDeleteButton';  
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'; 

const JobSeekerFavorites = () => {
  const jobSeeker = useSelector((state) => state.auth.jobSeeker);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let favoriService = new FavoriServis();
    favoriService.getFavoriteByJobSeekerId(jobSeeker.id).then((result) => setFavorites(result.data.data));
  }, [jobSeeker.id]);

  const handleDeleteClick = (id) => {
    let favoriService = new FavoriServis();
    favoriService.deleteFavorite(id)
      .then(result => toast.success(result.data.message))
      .catch(error => toast.error("İşlem tamamlanamadı"));

    let newList = favorites.filter(favori => favori.id !== id);
    setFavorites(newList);
  };

  return (
    <div>
      <Container style={{ height: '50vh', marginTop: '10px' }} verticalAlign='middle'>
        <h1>Favorilerin</h1>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>İlan Açıklaması</Table.HeaderCell>
              <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
              <Table.HeaderCell>İşveren Şirket Adı</Table.HeaderCell>
              <Table.HeaderCell>İşlemler</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {favorites.map((favorite) => (
              <Table.Row key={favorite.id}>
                <Table.Cell>{favorite.jobAdvertisement.explanation}</Table.Cell>
                <Table.Cell>{favorite.jobAdvertisement.jobPosition.jobName}</Table.Cell>
                <Table.Cell>
                  <Link to={`/employer/${favorite.jobAdvertisement.employer.id}`}>
                    {favorite.jobAdvertisement.employer.companyName}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <HrmsModalDeleteButton back={true} onClick={() => handleDeleteClick(favorite.id)}>
                    Sil
                  </HrmsModalDeleteButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    </div>
  );
};

export default JobSeekerFavorites;