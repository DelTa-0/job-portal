import VacancyContoller from "./vacancy.controller";
import Vacancy from "./vacancy.model";
import VacancyService from "./vacancy.service";

const vacancyService=new VacancyService(Vacancy);

const vacancyController=new VacancyContoller(vacancyService);

export {
    vacancyController,vacancyService
}