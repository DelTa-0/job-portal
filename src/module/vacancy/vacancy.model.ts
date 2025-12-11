import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, PrimaryKey } from "sequelize-typescript";
import { IVacancy,IVacancyCreationAttributes } from "./vacancy.type";
import { Table } from "sequelize-typescript";
import Company from "../company/company.model";
import Applicants from "../applicants/applicants.model";
import Vacancy_Applicant from "../vacancy_applicant/vacancy_applicant.model";

@Table({
  tableName: "vacancy",
  timestamps: true,
  defaultScope: {
    attributes: {
      exclude: [""],
    },
  },
})
class Vacancy extends Model<IVacancy,IVacancyCreationAttributes>{
    @PrimaryKey
        @AutoIncrement
        @Column(DataType.INTEGER)
        id!: number;
    
        @AllowNull(false)
        @Column(DataType.STRING)
        name:string;

        @AllowNull(false)
        @Column(DataType.STRING)
        description:string;

        @ForeignKey(() => Company)
        @Column({
         type: DataType.INTEGER,
            allowNull: false
         })
        companyId!: number;

        @BelongsTo(() => Company)
        declare company?: Company;

        @BelongsToMany(()=>Applicants,()=>Vacancy_Applicant)
        declare applicants?:Applicants[]
}

export default Vacancy