import React, { createContext, useState, ReactNode, FC } from 'react';

type IMember = {
  id: number;
  relation_degree: string;
  name: string;
  birth_data: string;
  place_of_work: string;
  address: string;
  user_id: number;
};
type TableRow1 = {
  date_of_start: string;
  date_of_end: string;
  name: string;
  position: string;
}
type TableRow2 = {
  name: string;
  place_of_work: string;
  position: string;
  phone_number: string;
}

type IMembers = IMember[];

type Family = {
  family_status: string;
  relatives: Relative[];
}
type Relative = {
  id: number;
  relation_degree: string;
  name: string;
  birth_data: string;
  place_of_work: string;
  address: string;
  user_id: number;
}

type WorkExperience = {
  works_experience: WorkExperienceDetail[];
  old_achievements: string;
  knowledge_for_work: string;
  recommendations: Recommendation[];
  hr_data: string;
  first_24: number;
  second_24: number;
}

type Recommendation = {
  id?: 0;
  name: string;
  place_of_work: string;
  position: string;
  phone_number: string;
  user_id?: 0;
}

type WorkExperienceDetail = {
  id?: 0;
  name: string;
  position: string;
  date_of_start: string;
  date_of_end: string;
  user_id?: 0;
}

interface Education {
  academic_degree: string;
  diplom: string;
  academic_tile: string;
  languages: string;
  educations: EducationDetail[];
  post_educations: PostEducationDetail[];
  skill_upgrades: SkillsUpgrades[];
}

interface EducationDetail {
  id?: 0,
  education_type: string,
  name: string,
  number: string,
  degree: string,
  date_of_end: string,
  speciality: string,
  user_id?: 0
}
interface PostEducationDetail {
  id?: 0,
  education_type: string,
  name: string,
  number: string,
  speciality: string,
  user_id?: 0
}

interface SkillsUpgrades {
  id?: 0,
  speciality: string,
  name: string,
  date_of_end: string,
  user_id?: 0,
}

interface Form {
  name: string;
  surname: string;
  middle_name: string;
  sex: string;
  birthday: string;
  place_of_birth: string;
  citizenship: string;
  passport: Passport;
  snils: string;
  inn: string;
  phone_number: string;
  home_phone_number: string;
  email: string;
  military_id: MilitaryId;
  address: Address;
  drivers_license: string;
}
interface Passport {
  id?: number;
  series: number;
  number: number;
  issued_by: string;
  date_of_issue: string;
  user_id?: number;
}
interface MilitaryId {
  id?: number;
  status: string;
  rank: string;
  series: number;
  number: number;
  issued_by: string;
  date_of_issue: string;
  user_id?: number;
}
interface Address {
  id?: number;
  passport_address: string;
  fact_address: string;
  passport_index: number;
  fact_index: number;
  user_id?: number;
}




/*const [knowledge_for_work , setInput1] = useState<string>('');
  const [old_achievements , setInput2] = useState<string>('');
  const [hr_data , setInput3] = useState<string>('');*/

interface AppContextInterface {

  FamilyResult: Family;
  setFamilyResult: React.Dispatch<React.SetStateAction<Family>>

  WorkResult: WorkExperience;
  setWorkResult: React.Dispatch<React.SetStateAction<WorkExperience>>;

  EducationResult: Education;
  setEducationResult: React.Dispatch<React.SetStateAction<Education>>;

  BasicResult: Form;
  setBasicResult: React.Dispatch<React.SetStateAction<Form>>

  members: IMembers;
  setMembers: React.Dispatch<React.SetStateAction<IMembers>>;
  family_status: string;
  setfamily_status: React.Dispatch<React.SetStateAction<string>>;
  table1Data: TableRow1[]
  setTable1Data: React.Dispatch<React.SetStateAction<TableRow1[]>>;
  table2Data: TableRow2[]
  setTable2Data: React.Dispatch<React.SetStateAction<TableRow2[]>>;

  basicInfo: {
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    placeOfBirth: string;
    citizenship: string;
    snils: string;
    inn: string;
    mobilePhone: string;
    homePhone: string;
    email: string;
    passportIndex: string;
    passportAddress: string;
    actualIndex: string;
    actualAddress: string;
    passportNumber: string;
    passportSeries: string;
    passportIssuedBy: string;
    passportIssuedDate: string;
    militaryStatus: string;
    militaryRank: string;
    militaryID: string;
    issuedBy: string;
    issueDate: string;
  };
  setBasicInfo: React.Dispatch<React.SetStateAction<{
    firstName: string;
    lastName: string;
    middleName: string;
    gender: string;
    dateOfBirth: string;
    placeOfBirth: string;
    citizenship: string;
    snils: string;
    inn: string;
    mobilePhone: string;
    homePhone: string;
    email: string;
    passportIndex: string;
    passportAddress: string;
    actualIndex: string;
    actualAddress: string;
    passportNumber: string;
    passportSeries: string;
    passportIssuedBy: string;
    passportIssuedDate: string;
    militaryStatus: string;
    militaryRank: string;
    militaryID: string;
    issuedBy: string;
    issueDate: string;
  }>>;

  knowledge_for_work: string;
  setKnowledge_for_work: React.Dispatch<React.SetStateAction<string>>;
  old_achievements: string;
  setOld_achievements: React.Dispatch<React.SetStateAction<string>>;
  hr_data: string;
  setHr_data: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextInterface | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [FamilyResult, setFamilyResult] = useState<Family>({ family_status: '', relatives: [] });
  const [WorkResult, setWorkResult] = useState<WorkExperience>({ works_experience: [], old_achievements: '', knowledge_for_work: '', recommendations: [], hr_data: '', first_24: 0, second_24: 0, })
  const [EducationResult, setEducationResult] = useState<Education>({ academic_degree: '', diplom: '', academic_tile: '', languages: '', educations: [], post_educations: [], skill_upgrades: [], })
  const [BasicResult, setBasicResult] = useState<Form>({
    name: '',
    surname: '',
    middle_name: '',
    sex: '',
    birthday: '',
    place_of_birth: '',
    citizenship: '',
    passport: {
      series: 0,
      number: 0,
      issued_by: '',
      date_of_issue: '',
    },
    snils: '',
    inn: '',
    phone_number: '',
    home_phone_number: '',
    email: '',
    military_id: {
      status: '',
      rank: '',
      series: 0,
      number: 0,
      issued_by: '',
      date_of_issue: '',
    },
    address: {
      passport_address: '',
      fact_address: '',
      passport_index: 0,
      fact_index: 0,
    },
    drivers_license: '',
  })

  const [members, setMembers] = useState<IMembers>([]);
  const [family_status, setfamily_status] = useState<string>('');
  const [table1Data, setTable1Data] = useState<TableRow1[]>([]);
  const [table2Data, setTable2Data] = useState<TableRow2[]>([]);
  const [knowledge_for_work, setKnowledge_for_work] = useState<string>('');
  const [old_achievements, setOld_achievements] = useState<string>('');
  const [hr_data, setHr_data] = useState<string>('');
  const [basicInfo, setBasicInfo] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    dateOfBirth: '',
    placeOfBirth: '',
    citizenship: '',
    snils: '',
    inn: '',
    mobilePhone: '',
    homePhone: '',
    email: '',
    passportIndex: '',
    passportAddress: '',
    actualIndex: '',
    actualAddress: '',
    passportNumber: '',
    passportSeries: '',
    passportIssuedBy: '',
    passportIssuedDate: '',
    militaryStatus: '',
    militaryRank: '',
    militaryID: '',
    issuedBy: '',
    issueDate: '',
  });
  return (
    <AppContext.Provider
      value={{
        BasicResult,
        setBasicResult,
        EducationResult,
        setEducationResult,
        WorkResult,
        setWorkResult,
        FamilyResult,
        setFamilyResult,
        members,
        setMembers,
        family_status,
        setfamily_status,
        table1Data,
        setTable1Data,
        table2Data,
        setTable2Data,
        knowledge_for_work,
        setKnowledge_for_work,
        old_achievements,
        setOld_achievements,
        hr_data,
        setHr_data,
        basicInfo,
        setBasicInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};