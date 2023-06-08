import React, { useState, useEffect } from "react";
import { Segment, Checkbox, Button } from "semantic-ui-react";
import CityService from "../services/CityService";
import JobPositionService from "../services/JobPositionService";
import WorkTimeService from "../services/WorkTimeService";

export default function Filter({ handleFilter }) {
  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [workTimes, setWorkTimes] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedJobPosition, setSelectedJobPosition] = useState("");
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);

  useEffect(() => {
    const cityService = new CityService();
    cityService.getAll().then((result) => setCities(result.data.data));
  }, []);

  useEffect(() => {
    const jobPositionService = new JobPositionService();
    jobPositionService.getAll().then((result) => setJobPositions(result.data.data));
  }, []);

  useEffect(() => {
    const workTimeService = new WorkTimeService();
    workTimeService.getWorkTimes().then((result) => setWorkTimes(result.data.data));
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
    <div style={{ marginTop: 90 }}>
      <Segment as="h3">Şehir</Segment>
      <Segment.Group>
        <Segment>
          <select style={{ width: "200px", height: "30px" }} value={selectedCity} onChange={handleCityChange}>
            <option value="">Tümü</option>
            {cities.map((city) => (
              <option key={city.id} value={city.cityName}>
                {city.cityName}
              </option>
            ))}
          </select>
        </Segment>
      </Segment.Group>

      <div className="myBox">
        <Segment as="h3">Çalışma Şekli</Segment>
        <Segment.Group as="h3" attached="top">
          {workTimes.map((workTime) => (
            <Segment textAlign="left" key={workTime.id}>
              <Checkbox
                label={workTime.name}
                checked={selectedWorkTypes.includes(workTime.name)}
                onChange={() => handleWorkTypeChange(workTime.name)}
              />
            </Segment>
          ))}
        </Segment.Group>
      </div>

      <div className="myBox">
        <Segment as="h3">Pozisyon</Segment>
        <Segment.Group as="h3" attached="top">
          <select style={{ width: "200px", height: "30px" }} value={selectedJobPosition} onChange={handleJobPositionChange}>
            <option value="">Tümü</option>
            {jobPositions.map((position) => (
              <option key={position.id} value={position.jobName}>
                {position.jobName}
              </option>
            ))}
          </select>
        </Segment.Group>
        <Button color="green" style={{ width: 260, fontSize: 14, padding: "8px 16px" }} onClick={handleApplyFilter}>
          Filtrele
        </Button>

      </div>
    </div>
  );
}
