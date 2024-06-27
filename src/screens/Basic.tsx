import React, { useContext, useState, useEffect, useMemo } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, Text, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppContext } from '../context/AppContext';
import { useFormContext } from '../context/FormContext';

const Basic: React.FC = ()=> {

    const { isBasicFilled, setIsBasicFilled } = useFormContext();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setmiddleName] = useState("");
    const [gender, setGender] = useState("");
    const [selectedId, setSelectedId] = useState<string | undefined>();

    const [dateOfBirth, setDateOfBirth] = useState("");
    const [date, setDate] = useState(new Date());
    const [showPicker1, setShowPicker1] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);

    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [citizenship, setCitizenship] = useState("");
    const [snils, setSnils] = useState("");
    const [inn, setInn] = useState("")

    const [mobilePhone, setMobilePhone] = useState("");
    const [homePhone, setHomePhone] = useState("");
    const [email, setEmail] = useState("");

    const [isMobileValid, setIsMobileValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);

    const [passportIndex, setPassportIndex] = useState(""); 
    const [passportAddress, setPassportAddress] = useState(""); 

    const [actualIndex, setActualIndex] = useState(""); 
    const [actualAddress, setActualAddress] = useState("");

    const [passportNumber, setPassportNumber] = useState(""); 
    const [passportSeries, setPassportSeries] = useState("");
    const [passportIssuedBy, setPassportIssuedBy] = useState(""); 
    const [passportIssuedDate, setPassportIssuedDate] = useState("");

    const [isPassportValid, setIsPassportValid] = useState(true); 
    const [isSeriesValid, setIsSeriesValid] = useState(true); 
    const [militaryStatus, setMilitaryStatus] = useState("");
    const [militaryRank, setMilitaryRank] = useState("");
    const [militaryIDnum, setMilitaryIDnum] = useState("");
    const [militaryIDseries, setMilitaryIDseries] = useState("");
    const [issuedBy, setIssuedBy] = useState("");
    const [issueDate, setIssueDate] = useState("");

    const context = useContext(AppContext);
    if (!context) {
        throw new Error('AppContext not found');
      }
      const { BasicResult, setBasicResult } = context!;
      useEffect(() => {
          const Proverka = async () => {
              try {
                  if (
                      firstName &&
                      lastName &&
                      middleName &&
                      isValidMobilePhone(mobilePhone) &&
                      isValidEmail(email) &&
                      militaryStatus && 
                      isValidPassportNumber(passportNumber) &&
                      isValidPassportSeries(passportSeries) &&
                      militaryRank && 
                      militaryIDnum && 
                      militaryIDseries && 
                      issuedBy && 
                      issueDate &&
                      placeOfBirth && 
                      citizenship && 
                      passportSeries && 
                      isSeriesValid && 
                      passportNumber && 
                      isPassportValid && 
                      passportIssuedBy && 
                      passportIssuedDate && 
                      snils && 
                      inn && 
                      actualIndex && 
                      actualAddress 
                  ) {
                      setIsBasicFilled(true);
                  } else {
                      setIsBasicFilled(false);
                  }
              } catch (error) {
                      console.error(error)
                  }
          }
          setBasicResult({name: firstName,
              surname: middleName,
              middle_name: lastName,
              sex: 'муж',
              birthday: dateOfBirth,
              place_of_birth: placeOfBirth,
              citizenship: citizenship,
              passport: {
                id: 0,
                series: Number(passportSeries),
                number: Number(passportNumber),
                issued_by: passportIssuedBy,
                date_of_issue: passportIssuedDate,
                user_id: 0
              },
              snils: snils,
              inn: inn,
              phone_number: mobilePhone,
              home_phone_number: homePhone,
              email: email,
              military_id: {
                id: 0,
                status: militaryStatus,
                rank: militaryRank,
                series: Number(militaryIDnum),
                number: Number(militaryIDseries),
                issued_by: issueDate,
                date_of_issue: '',
                user_id: 0
              },
              address: {
                id: 0,
                passport_address: passportAddress,
                fact_address: actualAddress,
                passport_index: Number(passportIndex),
                fact_index: Number(actualIndex),
                user_id: 0
              },
              drivers_license: '',});
          Proverka()
      }, [firstName, lastName, middleName, mobilePhone, email, militaryStatus, militaryRank, militaryIDnum, militaryIDseries, issuedBy, issueDate, placeOfBirth, citizenship, passportSeries, isSeriesValid, passportNumber, isPassportValid, passportIssuedBy, passportIssuedDate, snils, inn, actualIndex, actualAddress]);
  
    const isValidMobilePhone = (phone: string) => {
        const phoneRegex = /^[0-9]{11}$/;
        return phoneRegex.test(phone);
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleMobileChange = (value: string) => {
        setMobilePhone(value);
        setIsMobileValid(isValidMobilePhone(value));
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        setIsEmailValid(isValidEmail(value));
    };


    const isValidPassportNumber = (passNumber: string) => {
        const passportNumberRegex = /^[0-9]{6}$/;
        return passportNumberRegex.test(passNumber);
    };

    const isValidPassportSeries = (passSeries: string) => {
        const passportSeriesRegex = /^[0-9]{4}$/;
        return passportSeriesRegex.test(passSeries);
    };

    const handlePassportSeries = (value: string) => {
        setPassportSeries(value);
        setIsSeriesValid(isValidPassportSeries(value));
    };
    const handlePassportNumber = (value: string) => {
        setPassportNumber(value);
        setIsPassportValid(isValidPassportNumber(value));
    };

    const radioS: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1',
            label: 'Мужчина',
            value: 'male'
        },
        {
            id: '2',
            label: 'Женщина',
            value: 'female'
        }
    ]), []);

    const toggleDatePicker1 = () => {
        setShowPicker1(!showPicker1)
    };

    const toggleDatePicker2 = () => {
        setShowPicker2(!showPicker2)
    };

    const onChange1 = (event: any, selectedDate: Date | undefined) => {
        if (selectedDate){
            setDate(selectedDate);
            setDateOfBirth(selectedDate.toLocaleDateString());
        }else{
            setShowPicker1(false);
        }
    }
    const onChange2 = (event: any, selectedDate: Date | undefined) => {
        if (selectedDate){
            setDate(selectedDate);
            setPassportIssuedDate(selectedDate.toLocaleDateString());
        }else{
            setShowPicker2(false);
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.inner}>
                    <View>
                        <Text style={styles.label}>Имя</Text>
                        <TextInput
                            placeholder="Имя"
                            value={firstName}
                            onChangeText={setFirstName}
                            style={styles.input}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Отчество</Text>
                        <TextInput
                        placeholder="Отчество"
                        value={middleName}
                        onChangeText={setmiddleName}
                        style={styles.input}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Фамилия</Text>
                        <TextInput
                        placeholder="Фамилия"
                        value={lastName}
                        onChangeText={setLastName}
                        style={styles.input}
                        />
                    </View>
                    <View style={styles.radioButtonContainer}>
                        <Text style={{marginRight: 20}}>Пол:</Text>
                        <RadioGroup labelStyle={{flexDirection:'row'}}
                            radioButtons={radioS} 
                            onPress={setSelectedId}
                            selectedId={selectedId}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Дата Рождения</Text>
                        <TouchableOpacity onPress={toggleDatePicker1} style={styles.dateInput}>
                            <TextInput
                                placeholder="Дата Рождения"
                                value={dateOfBirth}
                                style={styles.input}
                                editable={false}
                                pointerEvents="none"
                            />
                        </TouchableOpacity>

                        {showPicker1 && (
                            <View>
                                <DateTimePicker
                                    mode="date"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    value={date}
                                    onChange={onChange1}
                                />
                            </View>
                        )}
                    </View>
                    <View>
                        <Text style={styles.label}>Место Рождения</Text>
                            <TextInput
                            placeholder="Место Рождения"
                            value={placeOfBirth}
                            onChangeText={setPlaceOfBirth}
                            style={styles.input}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Гражданство</Text>
                            <TextInput
                            placeholder="Гражданство"
                            value={citizenship}
                            onChangeText={setCitizenship}
                            style={styles.input}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Серия паспорта</Text>
                        <TextInput
                            placeholder="Серия паспорта"
                            value={passportSeries}
                            onChangeText={handlePassportSeries}
                            style={[styles.input, !isSeriesValid && styles.invalidInput]}
                            keyboardType="numeric"
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Номер паспорта</Text>
                        <TextInput
                            placeholder="Номер паспорта"
                            value={passportNumber}
                            onChangeText={handlePassportNumber}
                            style={[styles.input, !isPassportValid && styles.invalidInput]}
                            keyboardType="numeric"
                        />
                    </View>
                    
                    <View>
                        <Text style={styles.label}>Кем выдан паспорт</Text>
                        <TextInput
                            placeholder="Кем выдан паспорт"
                            value={passportIssuedBy}
                            onChangeText={setPassportIssuedBy}
                            style={styles.input}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Дата выдачи паспорта</Text>
                        <TouchableOpacity onPress={toggleDatePicker2} style={styles.dateInput}>
                            <TextInput
                                placeholder="Дата выдачи паспорта"
                                value={passportIssuedDate}
                                style={styles.input}
                                editable={false}
                                pointerEvents="none"
                            />
                        </TouchableOpacity>

                        {showPicker2 && (
                            <View>
                                <DateTimePicker
                                    mode="date"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    value={date}
                                    onChange={onChange2}
                                />
                            </View>
                        )}
                    </View>
                    <View>
                        <Text style={styles.label}>Снилс</Text>
                            <TextInput
                            placeholder="Снилс"
                            value={snils}
                            onChangeText={setSnils}
                            style={styles.input}
                            keyboardType="numeric"
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>ИНН</Text>
                            <TextInput
                            placeholder="ИНН"
                            value={inn}
                            onChangeText={setInn}
                            style={styles.input}
                            keyboardType="numeric"
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Мобильный телефон</Text>
                        <TextInput
                            placeholder="Мобильный телефон"
                            value={mobilePhone}
                            onChangeText={handleMobileChange}
                            style={[styles.input, !isMobileValid && styles.invalidInput]}
                            keyboardType="numeric"
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Домашний телефон</Text>
                            <TextInput
                            placeholder="Домашний телефон"
                            value={homePhone}
                            onChangeText={setHomePhone}
                            style={styles.input}
                            keyboardType="numeric"
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={handleEmailChange}
                            style={[styles.input, !isEmailValid && styles.invalidInput]}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Адрес места жительства по паспорту</Text>
                        <TextInput
                            placeholder="Индекс"
                            value={passportIndex}
                            onChangeText={(text) => {
                                const formattedText = text.replace(/[^0-9]/g, '');
                                setPassportIndex(formattedText);
                            }}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Адрес"
                            value={passportAddress}
                            onChangeText={setPassportAddress}
                            style={styles.input}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Фактический адрес места жительства</Text>
                        <TextInput
                            placeholder="Индекс"
                            value={actualIndex}
                            onChangeText={(text) => {
                                const formattedText = text.replace(/[^0-9]/g, '');
                                setActualIndex(formattedText);
                            }}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Адрес"
                            value={actualAddress}
                            onChangeText={setActualAddress}
                            style={styles.input}
                        />
                    </View>
                    <Text style={styles.label}>Фактический адрес места жительства</Text>
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={styles.cellLabel}>Призывник/военнообязанный: </Text>
                            <TextInput
                                style={styles.cellValue}
                                placeholder="____________"
                                value={militaryStatus}
                                onChangeText={setMilitaryStatus}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellLabel}>Воинское звание: </Text>
                            <TextInput
                                style={styles.cellValue}
                                placeholder="____________"
                                value={militaryRank}
                                onChangeText={setMilitaryRank}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellLabel}>Военный билет(серия): </Text>
                            <TextInput
                                style={styles.cellValue}
                                placeholder="____________"
                                value={militaryIDseries}
                                onChangeText={setMilitaryIDseries}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellLabel}>Военный билет(номер): </Text>
                            <TextInput
                                style={styles.cellValue}
                                placeholder="____________"
                                value={militaryIDnum}
                                onChangeText={setMilitaryIDnum}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellLabel}>Кем выдан: </Text>
                            <TextInput
                                style={styles.cellValue}
                                placeholder="____________"
                                value={issuedBy}
                                onChangeText={setIssuedBy}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellLabel}>Дата выдачи: </Text>
                            <TextInput
                                style={styles.cellValue}
                                placeholder="____________"
                                value={issueDate}
                                onChangeText={setIssueDate}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
      },
      inner: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
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
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerContainer: {
    marginBottom: 20,
},
label: {
    marginBottom: 5,
},
dateInput: {
    width: '80%',
},
datePicker: {
    width: '100%',
},
dateText: {
    fontSize: 16,
},
closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#d9534f',
    borderRadius: 5,
    alignItems: 'center',
},
closeButtonText: {
    color: 'white',
    fontSize: 16,
},
invalidInput: {
    borderColor: 'red',
},
scrollViewContent: {
    flexGrow: 1,
},
table: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
},
row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
},
cellLabel: {
    fontWeight: 'bold',
},
cellValue: {
    flex: 1,
},
});

export default Basic;