import {  BelongsToMany, Model } from "sequelize-typescript";
import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table } from "sequelize-typescript";
import {  IApplicants,IApplicantsCreationAttributes } from "./applicants.types";
import Vacancy from "../vacancy/vacancy.model";
import Vacancy_Applicant from "../vacancy_applicant/vacancy_applicant.model";
import { ERole } from "../auth/auth.type";

@Table({
  tableName: "applicants",
  timestamps: true,
  defaultScope: {
    attributes: {
      exclude: [""],
    },
  },
})
class Applicants extends Model<IApplicants,IApplicantsCreationAttributes>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name:string;

    @AllowNull(false)
    @Column({
        type:DataType.STRING,
        unique:true,
    })
    email:string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password:string;

    @AllowNull(true)
    @Column(DataType.ENUM(...Object.values(ERole)))
    role:ERole;

    
    @Column(DataType.STRING)
    skills:string;

    
    @Column(DataType.STRING)
    address:string;
    
    @AllowNull(true)
    @Column(DataType.STRING)
    profilePath:string;
    
    @AllowNull(true)
    @Column(DataType.STRING)
    cvPath:string;
    
    @BelongsToMany(()=>Vacancy,()=>Vacancy_Applicant)
    declare vacancies?:Vacancy[]
}

export default Applicants