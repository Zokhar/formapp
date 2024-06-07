import React, { createContext, useState, ReactNode, FC } from 'react';

type IMember = {
  relation_degree : string;
  name: string;
  birth_data : string;
  place_of_work : string;
  address : string;
};
type TableRow1 = {
  date_of_start : string;
  date_of_end : string;
  name : string;
  position : string;
}
type TableRow2 = {
  name: string;
  place_of_work: string;
  position: string;
  phone_number: string;
}

type IMembers = IMember[];

/*const [knowledge_for_work , setInput1] = useState<string>('');
  const [old_achievements , setInput2] = useState<string>('');
  const [hr_data , setInput3] = useState<string>('');*/

interface AppContextInterface {
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