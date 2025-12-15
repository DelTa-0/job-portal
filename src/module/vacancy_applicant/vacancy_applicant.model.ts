import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Vacancy from "../vacancy/vacancy.model";
import Applicants from "../applicants/applicants.model";
import {
  IVacancy_Applicant,
  IVacancy_ApplicantCreationAttributes,
} from "./vacancy_applicant.type";

@Table({
  tableName: "vacancy_applicant",
  timestamps: true,
  defaultScope: {
    attributes: {
      exclude: [""],
    },
  },
})
class Vacancy_Applicant extends Model<
  IVacancy_Applicant,
  IVacancy_ApplicantCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Vacancy)
  @Column(DataType.STRING)
  vacancy_id: string;

  @ForeignKey(() => Applicants)
  @Column(DataType.NUMBER)
  applicant_id: number;
}

export default Vacancy_Applicant;
