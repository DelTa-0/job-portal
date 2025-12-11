import { Default, HasMany, Model } from "sequelize-typescript";
import {  ICompany, ICompanyCreationAttributes } from "./company.types";
import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table } from "sequelize-typescript";
import Vacancy from "../vacancy/vacancy.model";
import { ERole } from "../auth/auth.type";
@Table({
  tableName: "company",
  timestamps: true,
  defaultScope: {
    attributes: {
      exclude: [""],
    },
  },
})
class Company extends Model<ICompany,ICompanyCreationAttributes>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!:number;

    @Column(DataType.STRING)
    name:string;

    @Column(DataType.STRING)
    address:string;

    @AllowNull(true)
    @Column(DataType.ENUM(...Object.values(ERole)))
    role:ERole;
    
    @AllowNull(false)
    @Column(DataType.STRING)
    email:string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password:string

    @Column(DataType.STRING)
    profilePath:string;
    
    @HasMany(() => Vacancy, "companyId")
    declare vacancies?: Vacancy[]; 
}

export default Company