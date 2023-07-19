import React, { useState, useEffect } from "react";
import { Segment, Checkbox, Button, Menu, Label, Dropdown, Container } from "semantic-ui-react";
import CityService from "../services/CityService";
import JobPositionService from "../services/JobPositionService";
import WorkTypesService from "../services/WorkTypesService";
import { persistReducer } from 'redux-persist';

export default function Filter({ handleFilter }) {
  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [workTimes, setWorkTimes] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedJobPosition, setSelectedJobPosition] = useState("");
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);

  const selecedWorktime = [
    { key: "1", text: "Tam Zamanlı", value: "Tam Zamanlı" },
    { key: "2", text: "Yarı Zamanlı", value: "Yarı Zamanlı" },
  ];

  useEffect(() => {
    const cityService = new CityService();
    cityService.getAll().then((result) => setCities(result.data.data));
  }, []);

  useEffect(() => {
    const jobPositionService = new JobPositionService();
    jobPositionService.getAll().then((result) => setJobPositions(result.data.data));
  }, []);

  useEffect(() => {
    const workTimeService = new WorkTypesService();
    workTimeService.getAll().then((result) => setWorkTimes(result.data.data));
  }, []);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleJobPositionChange = (e) => {
    setSelectedJobPosition(e.target.value);
  };

  const handleWorkTypeChange = (workType) => {
    const isSelected = selectedWorkTypes.includes(workType);

    if (isSelected) {
      setSelectedWorkTypes(selectedWorkTypes.filter((type) => type !== workType));
    } else {
      setSelectedWorkTypes([...selectedWorkTypes, workType]);
    }
  };

  const handleApplyFilter = () => {
    const filters = {
      city: selectedCity,
      jobPosition: selectedJobPosition,
      workTypes: selectedWorkTypes,
    };

    handleFilter(filters);
  };

  return (
    <div>
      <Segment color=" " raised style={{ textAlign: 'left' }}>

        <Label size="large" >Şehir</Label>
        <p></p>
        <Dropdown
          placeholder="Şehir seçiniz"
          selection
          search
          multiple
          clearable
          options={cities.map((city, index) => {
            return { text: city.cityName, key: city.index, value: city.id }
          })}
          onChange={handleCityChange}
          value={selectedCity}
        />
      </Segment>

      <Segment color=" " raised style={{ textAlign: 'left' }}>
        <Label size="large">İş Pozisyonu</Label>
        <p></p>
        <Dropdown
          placeholder="İş Pozisyonu seçiniz"
          selection
          search
          multiple
          clearable
          options={jobPositions.map((jobPosition) =>
            ({ text: jobPosition.jobName, key: jobPosition.id, value: jobPosition.jobName })
          )}
          onChange={handleJobPositionChange}
          value={selectedJobPosition}
        />
      </Segment>

      <Segment color=" " raised style={{ textAlign: 'left' }}>
        <Label size="large">Çalışma Şekli</Label><p></p>
        <Dropdown
          placeholder="Çalışma Şekli seçiniz"
          selection
          search
          multiple
          clearable
          options={workTimes.map((workTime) =>
            ({ text: workTime.name, key: workTime.id, value: workTime.name })
          )}
          onChange={(e, { value }) => handleWorkTypeChange(value)}
          value={selectedWorkTypes}
        />
      </Segment>

  

      <Button color="green" style={{ width: 260, fontSize: 14, padding: "8px 16px" }} onClick={handleApplyFilter}>
        Filtrele
      </Button>
    </div>

  );
}
