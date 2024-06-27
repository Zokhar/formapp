import React, { useContext, useState,useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Touchable } from 'react-native';
import { AppContext } from '../context/AppContext';
import axios from 'axios';


type StayAbroad = {
  id?: number;
  date_of_start?: string;
  date_of_end?: string;
  country?: string;
  goal?: string;
  user_id?: number;
};

type IVisits = StayAbroad[];

type Answers = {
  first?: string;
  second?: string;
  third?: string;
  fourth?: StayAbroad[];
  fifth?: string;
  sixth?: string;
  seventh?: string;
};

type VisitProps = {
  visit: StayAbroad;
  onChange: (field: keyof StayAbroad, value: string) => void;
  onRemove: () => void;
};
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

interface EducationDetail {
  id?: number,
  education_type: string,
  name: string,
  number: string,
  degree: string,
  date_of_end: string,
  speciality: string,
  user_id?: number
}
interface PostEducationDetail {
  id?: number,
  education_type: string,
  name: string,
  number: string,
  speciality: string,
  user_id?: number
}
interface SkillsUpgrades {
  id?: number,
  speciality: string,
  name: string,
  date_of_end: string,
  user_id?: number,
}

interface WorkExperienceDetail {
  id?: number;
  name: string;
  position: string;
  date_of_start: string;
  date_of_end: string;
  user_id?: number;
}

interface Recommendation {
  id?: number;
  name: string;
  place_of_work: string;
  position: string;
  phone_number: string;
  user_id?: number;
}

interface Relative {
  id: number;
  relation_degree: string;
  name: string;
  birth_data: string;
  place_of_work: string;
  address: string;
  user_id: number;
}

/*interface StayAbroad {
  id: number;
  date_of_start: string;
  date_of_end: string;
  country: string;
  goal: string;
  user_id: number;
}*/

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

interface Education {
  academic_degree: string;
  diplom: string;
  academic_tile: string;
  languages: string;
  educations: EducationDetail[];
  post_educations: PostEducationDetail[];
  skill_upgrades: SkillsUpgrades[];
}

interface WorkExperience {
  works_experience: WorkExperienceDetail[];
  old_achievements: string;
  knowledge_for_work: string;
  recommendations: Recommendation[];
  hr_data: string;
  first_24: number;
  second_24: number;
}

interface Family {
  family_status: string;
  relatives: Relative[];
}

interface Info {
  ad_disad?: string;
  government_awards?: string;
  stays_abroad?: StayAbroad[];
  criminal_liabilities?: string;
  pc_experience?: string;
  additional_information?: string;
  date_of_completion?: string;
  hobbies?: string;
}

interface UserData {
  form: Form;
  education: Education;
  work_experience: WorkExperience;
  family: Family;
  info: Info;
}



// Создание константы userData

const VisitItem: React.FC<VisitProps> = ({ visit, onChange, onRemove }) => {
  return (
    <View style={styles.visitContainer}>
      <TextInput
        style={styles.input}
        placeholder="Дата отправления"
        value={visit.date_of_start}
        onChangeText={(text) => onChange('date_of_start', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Дата прибытия"
        value={visit.date_of_end}
        onChangeText={(text) => onChange('date_of_end', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Страна"
        value={visit.country}
        onChangeText={(text) => onChange('country', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Цель поездки"
        value={visit.goal}
        onChangeText={(text) => onChange('goal', text)}
      />
      <Button title="Удалить" onPress={onRemove} />
    </View>
  );
};

const About: React.FC<{ setIsAboutFilled: (isFilled: boolean) => void }> = ({ setIsAboutFilled }) => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('AppContext not found');
  }
  const { family_status, members, table1Data, table2Data, FamilyResult, WorkResult, EducationResult,BasicResult} = context!;
  const [answers, setAnswers] = useState<Answers>({});
  /*const [visits, setVisits] = useState<IVisits>([]);*/

  const InfoResult: Info = {
    ad_disad: answers.first,
    government_awards: answers.third,
    stays_abroad: answers.fourth,
    criminal_liabilities: answers.fifth,
    pc_experience: answers.sixth,
    additional_information: answers.seventh,
    date_of_completion: "01.01.2002",
    hobbies: answers.second,
  }

  const handleInputChange = (question: string, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: value,
    }));
  };

  const handleAbroadStayChange = (index: number, field: keyof StayAbroad, value: string) => {
    const newListAnsw = answers.fourth ? [...answers.fourth] : [];
    newListAnsw[index] = { ...newListAnsw[index], [field]: value };
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      fourth: newListAnsw,
    }));
  };

  const addAbroadStay = () => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      fourth: [...(prevAnswers.fourth || []), { id: 0, date_of_start: '', date_of_end: '', country: '', goal: '', user_id: 0 }],
    }));
  };

  const removeAbroadStay = (index: number) => {
    const newListAnsw = answers.fourth ? [...answers.fourth] : [];
    newListAnsw.splice(index, 1);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      fourth: newListAnsw,
    }));
  };

  const userData: UserData = {
    form: BasicResult,
    education: EducationResult,
    work_experience: WorkResult,
    family: FamilyResult,
    info: InfoResult
  };
  
  const sendUserData = async (userData: UserData) => {
    try {
      const response = await axios.post('http://85.193.86.4:777/users', userData);
      console.log('Response:', response.data.family);
      //console.log(JSON.stringify(userData, null, 2))
      console.log("Данные успешно отправлены")

    } catch (error) {
      console.error('Error sending user data:', error);
    }
  };

  const isFieldFilled = (field: string | undefined): boolean => {
    return !!field;
  };


  useEffect(() => {
      if (isFieldFilled(answers.first) &&
      isFieldFilled(answers.second) &&
      isFieldFilled(answers.third) &&
      isFieldFilled(answers.fifth) &&
      isFieldFilled(answers.sixth) &&
      isFieldFilled(answers.seventh)){
        setIsAboutFilled(true)
      }else{
        setIsAboutFilled(false)
      }
   
  }, [answers.first, answers.second, answers.third, answers.seventh, answers.fifth, answers.sixth, setIsAboutFilled]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>О себе</Text>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Укажите свои достоинства и недостатки*:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange('first', text)}
        />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Ваши увлечения*:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange('second', text)}
        />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Имеете ли Вы государственные награды, почетные звания*:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange('third', text)}
        />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Пребывание за границей</Text>
        {(answers.fourth || []).map((visit, index) => (
          <VisitItem
            key={index}
            visit={visit}
            onChange={(field, value) => handleAbroadStayChange(index, field, value)}
            onRemove={() => removeAbroadStay(index)}
          />
        ))}
        <Button title="Добавить поездку" onPress={addAbroadStay} />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Привлекались ли Вы к уголовной ответственности и административной ответственности*:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange('fifth', text)}
        />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Опыт работы на персональном компьютере*:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange('sixth', text)}
        />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Дополнительные сведения о себе, которые Вы хотели бы указать*:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange('seventh', text)}
        />
      </View>
      <Button title="Добавить анкету" onPress={() => sendUserData(userData)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 35,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    width: '95%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    margin: 3,
},
  visitContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
});

export default About;

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
