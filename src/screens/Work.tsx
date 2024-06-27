import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AppContext } from '../context/AppContext';

interface TableRow1 {
  date_of_start: string;
  date_of_end: string;
  name: string;
  position: string;
}
interface TableRow2 {
  name: string;
  place_of_work: string;
  position: string;
  phone_number: string;
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

interface Recommendation {
  id: 0;
  name: string;
  place_of_work: string;
  position: string;
  phone_number: string;
  user_id: 0;
}

interface WorkExperienceDetail {
  id: 0;
  name: string;
  position: string;
  date_of_start: string;
  date_of_end: string;
  user_id: 0;
}

const Work: React.FC<{ setIsWorkFilled: (isFilled: boolean) => void }> = ({setIsWorkFilled}) => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('AppContext not found');
  }
  const { table1Data, setTable1Data, table2Data, setTable2Data, knowledge_for_work,
    setKnowledge_for_work,
    old_achievements,
    setOld_achievements,
    hr_data,
    setHr_data,
    WorkResult,
    setWorkResult,
  } = context!;

  useEffect(() => {
    setIsWorkFilled(knowledge_for_work.length > 0 || old_achievements.length > 0 || hr_data.length > 0);
}, [knowledge_for_work, old_achievements, hr_data, setIsWorkFilled]);
  /*const [table1Data, setTable1Data] = useState<TableRow1[]>([]);
  const [table2Data, setTable2Data] = useState<TableRow2[]>([]);*/
  /*const [knowledge_for_work , setInput1] = useState<string>('');
  const [old_achievements , setInput2] = useState<string>('');
  const [hr_data , setInput3] = useState<string>('');*/

  const [question24, setQuestion6] = useState<{ subQuestion1: number; subQuestion2: number }>({ subQuestion1: 0, subQuestion2: 0 });

  const addTable1Row = () => {
    setTable1Data([...table1Data, { date_of_start: '', date_of_end: '', name: '', position: '' }]);
  };

  const removeLastTable1Row = () => {
    setTable1Data(table1Data.slice(0, -1));
  };

  const addTable2Row = () => {
    setTable2Data([...table2Data, { name: '', place_of_work: '', position: '', phone_number: '' }]);
  };

  const removeLastTable2Row = () => {
    setTable2Data(table2Data.slice(0, -1));
  };

  const handleTableChange1 = (index: number, column: keyof TableRow1, value: string, tableSetter: React.Dispatch<React.SetStateAction<TableRow1[]>>, tableData: TableRow1[]) => {
    const newData = [...tableData];
    newData[index][column] = value;
    tableSetter(newData);
  };
  const handleTableChange2 = (index: number, column: keyof TableRow2, value: string, tableSetter: React.Dispatch<React.SetStateAction<TableRow2[]>>, tableData: TableRow2[]) => {
    const newData = [...tableData];
    newData[index][column] = value;
    tableSetter(newData);
  };

  const handleSubQuestionChange = (subQuestion: keyof typeof question24, value: number) => {
    setQuestion6({ ...question24, [subQuestion]: value });
  };

  const handleSubmit = () => {
    console.log(WorkResult)
  };
  useEffect(() => {
    setWorkResult({
      old_achievements: old_achievements,
      knowledge_for_work: knowledge_for_work,
      hr_data: hr_data,
      first_24: question24.subQuestion1,
      second_24: question24.subQuestion2,
      works_experience: table1Data,
      recommendations: table2Data
    });
  }, [old_achievements, knowledge_for_work,hr_data,question24,table1Data,table2Data])
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.tableContainer}>Опыт работы и/или знания, которые на Ваш взгляд могли бы быть использованы при работе*</Text>
        <TextInput style={styles.input} value={knowledge_for_work} onChangeText={setKnowledge_for_work} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.tableContainer}>Какие из своих достижений на прежних местах работы Вы считаете самыми важными </Text>
        <TextInput style={styles.input} value={old_achievements} onChangeText={setOld_achievements} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.tableContainer}>Фамилия, имя, отчество и телефон руководителя кадровой службы (непосредственного руководителя) на прежнем месте работы</Text>
        <TextInput style={styles.input} value={hr_data} onChangeText={setHr_data} />
      </View>

      <View style={styles.tableContainer}>
        <Text style={styles.questionText}>Выполняемая работа с начала трудовой деятельности:</Text>
        {table1Data.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <TextInput
              style={styles.tableInput}
              value={row.date_of_start}
              onChangeText={(text) => handleTableChange1(index, 'date_of_start', text, setTable1Data, table1Data)}
              placeholder="Дата приема"
            />
            <TextInput
              style={styles.tableInput}
              value={row.date_of_end}
              onChangeText={(text) => handleTableChange1(index, 'date_of_end', text, setTable1Data, table1Data)}
              placeholder="Дата увольнения."
            />
            <TextInput
              style={styles.tableInput}
              value={row.name}
              onChangeText={(text) => handleTableChange1(index, 'name', text, setTable1Data, table1Data)}
              placeholder="Наименование и местонахождение работы"
            />
            <TextInput
              style={styles.tableInput}
              value={row.position}
              onChangeText={(text) => handleTableChange1(index, 'position', text, setTable1Data, table1Data)}
              placeholder="Должность и функции"
            />
          </View>
        ))}
        <View style={styles.inputContainer}><Button title="Добавить" onPress={addTable1Row} /></View>
        <View style={styles.inputContainer}><Button title="Удалить" onPress={removeLastTable1Row} /></View>

      </View>

      <View style={styles.tableContainer}>
        <Text style={styles.questionText}>Рекомендации должностных лиц Банка и/или других структур АКБ «Алмазэргиэнбанк» АО если таковые имеются:</Text>
        {table2Data.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <TextInput
              style={styles.tableInput}
              value={row.name}
              onChangeText={(text) => handleTableChange2(index, 'name', text, setTable2Data, table2Data)}
              placeholder="ФИО"
            />
            <TextInput
              style={styles.tableInput}
              value={row.place_of_work}
              onChangeText={(text) => handleTableChange2(index, 'place_of_work', text, setTable2Data, table2Data)}
              placeholder="Место работы"
            />
            <TextInput
              style={styles.tableInput}
              value={row.position}
              onChangeText={(text) => handleTableChange2(index, 'position', text, setTable2Data, table2Data)}
              placeholder="Должность"
            />
            <TextInput
              style={styles.tableInput}
              value={row.phone_number}
              onChangeText={(text) => handleTableChange2(index, 'phone_number', text, setTable2Data, table2Data)}
              placeholder="Телефон"
            />
          </View>
        ))}
        <View style={styles.inputContainer}><Button title="Добавить" onPress={addTable2Row} /></View>
        <View style={styles.inputContainer}><Button title="Удалить" onPress={removeLastTable2Row} /></View>


      </View>

      <View style={styles.questionText}>
        <Text style={styles.questionText}>Стаж работы в государственной или муниципальной службе за последние 2 года (есть/нет), если есть:</Text>
        <View >
          <Text style={styles.questionText}>Входили ли в Ваши должностные (служебные) обязанности отдельные функции по управлению АКБ «Алмазэргиэнбанк»:</Text>
          <TouchableOpacity onPress={() => handleSubQuestionChange('subQuestion1', 1)}>
            <Text style={question24.subQuestion1 ? styles.selected : styles.unselected}>ДА</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSubQuestionChange('subQuestion1', 0)}>
            <Text style={!question24.subQuestion1 ? styles.selected : styles.unselected}>НЕТ</Text>
          </TouchableOpacity>
        </View>
        <View >
          <Text style={styles.questionText}>Требуется ли согласие соответствующей комиссии по соблюдению требований к служебному поведению государственных или муниципальных служащих и урегулированию конфликта интересов</Text>
          <TouchableOpacity onPress={() => handleSubQuestionChange('subQuestion2', 1)}>
            <Text style={question24.subQuestion2 ? styles.selected : styles.unselected}>ДА</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSubQuestionChange('subQuestion2', 0)}>
            <Text style={!question24.subQuestion2 ? styles.selected : styles.unselected}>НЕТ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}><Button title="Отправить" onPress={handleSubmit} /></View>


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
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
  tableContainer: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: -1, // this will create a grid effect
  },
  tableInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 0, // to remove the rounded corners
    marginHorizontal: -1, // this will create a grid effect
  },
  subQuestionContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  selected: {
    flex: 1,

    fontWeight: 'bold',
    color: 'green',

  },
  unselected: {
    flex: 1,
    color: 'gray',
  },
});

export default Work;