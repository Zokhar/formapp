import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { AppContext } from '../context/AppContext';

type Member = {
  col1?: string;
  col2?: string;
  col3?: string;
  col4?: string;
  col5?: string;
};

type Answers = {
  first?: IMember[];
  second?: string;
};

type IMember = {
  relation_degree : string;
  name: string;
  birth_data : string;
  place_of_work : string;
  address : string;
};
type IMembers = IMember[];

const Family: React.FC<{ setIsFamilyFilled: (isFilled: boolean) => void }> = ({ setIsFamilyFilled }) => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('AppContext not found');
  }
  const { members, setMembers, family_status, setfamily_status } = context!;

  const [newRow, setNewRow] = useState<IMember>({ relation_degree: '', name: '', birth_data: '', place_of_work: '', address: '' });
  /*const [familyStatus, setFamilyStatus] = useState('');
  const [members, setMembers] = useState<IMembers>([]);*/

  const handleInputChange = (key: string, value: string) => {
    setNewRow(prevRow => ({
      ...prevRow,
      [key]: value,
    }));
  };

  /*const convertToIMembers = (data: Member[]): IMembers => {
    return data.map(item => ({
      step: item.col1 || '',
      name: item.col2 || '',
      dateOfBirth: item.col3 || '',
      placeWork: item.col4 || '',
      address: item.col5 || '',
    }));
  };*/

  const addRow = () => {
    setMembers(prevMembers => [...prevMembers, newRow]);
    setNewRow({ relation_degree: '', name: '', birth_data: '', place_of_work: '', address: '' });
  };

  const removeRow = () => {
    setMembers(prevMembers => prevMembers.slice(0, -1));
  };

  const showData = () => {
    console.log(family_status);
    console.log(members);
  };
  useEffect(() => {
    const isFilled = members.length > 0 && family_status.trim() !== '';
    setIsFamilyFilled(isFilled);
  }, [members, family_status, setIsFamilyFilled]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Семья</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Ваши близкие родственники (дети, жена, муж, отец, мать, взрослые братья, сестры).</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Степень родства</Text>
            <Text style={styles.tableHeader}>ФИО</Text>
            <Text style={styles.tableHeader}>Дата рождения</Text>
            <Text style={styles.tableHeader}>Место работы, должность</Text>
            <Text style={styles.tableHeader}>Адрес, телефон</Text>
          </View>
          {members.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{row.relation_degree}</Text>
              <Text style={styles.tableCell}>{row.name}</Text>
              <Text style={styles.tableCell}>{row.birth_data}</Text>
              <Text style={styles.tableCell}>{row.place_of_work}</Text>
              <Text style={styles.tableCell}>{row.address}</Text>
            </View>
          ))}
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Степень родства"
            value={newRow.relation_degree}
            onChangeText={text => handleInputChange('relation_degree', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="ФИО"
            value={newRow.name}
            onChangeText={text => handleInputChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Дата рождения"
            value={newRow.birth_data}
            onChangeText={text => handleInputChange('birth_data', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Место работы, должность"
            value={newRow.place_of_work}
            onChangeText={text => handleInputChange('place_of_work', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Адрес, телефон"
            value={newRow.address}
            onChangeText={text => handleInputChange('address', text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Добавить строку" onPress={addRow} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Удалить последнюю строку" onPress={removeRow} />
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Семейное положение на момент заполнения личного листка:</Text>
        <TextInput
          style={styles.input}
          value={family_status}
          onChangeText={setfamily_status}
        />
      </View>
     
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
  table: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    padding: 8,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginVertical: 4,
  },
  buttonContainer: {
    marginVertical: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default Family;