import axios from "axios";


export default class SchoolService {

    add(school) {
        return axios.post("http://localhost:8080/api/education/save",school);
    }

    update(school) {
        return axios.post("http://localhost:8080/api/education/update",school);
    }

    delete(id) {
        return axios.post("http://localhost:8080/api/education/delete?id="+id);
    }
    getAllSchool(){
        return axios.get("http://localhost:8080/api/okullar/getall");
    }
    getAllDepartments(){
        return axios.get("http://localhost:8080/api/bolumler/getall");
    }
                

    getAll() {
        return axios.get("http://localhost:8080/api/education/getAll");
    }

    getById(id) {
        return axios.get("http://localhost:8080/api/education/getById?id="+id);
    }

    findAllByEmployeeIdOrderBySchoolGraduationDateDesc(employeeId) {
        return axios.get("http://localhost:8080/api/education/findAllByEmployeeIdOrderBySchoolGraduationDateDesc?employeeId="+employeeId);
    }
}