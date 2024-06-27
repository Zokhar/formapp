import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, Text, ScrollView } from 'react-native';
import { AppContext } from '../context/AppContext';
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
const Education: React.FC<{ setIsEducationFilled: (isFilled: boolean) => void }> = ({ setIsEducationFilled }) => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('AppContext not found');
    }
    const { setEducationResult, EducationResult } = context!;

    const [education, setEducation] = useState<EducationDetail[]>([]);
    const [postGraduateEducation, setPostGraduateEducation] = useState<PostEducationDetail[]>([]);
    const [educationFormData, setEducationFormData] = useState<EducationDetail>({
        id: 0,
        education_type: '',
        name: '',
        number: '',
        degree: '',
        date_of_end: '',
        speciality: '',
        user_id: 0
    });
    const [postGraduateFormData, setPostGraduateFormData] = useState<PostEducationDetail>({
        id: 0,
        name: '',
        education_type: '',
        number: '',
        speciality: '',
        user_id: 0
    });
    const [diploma, setDiploma] = useState("");
    const [academicTitle, setAcademicTitle] = useState("");
    const [languages, setLanguages] = useState("");
    const [academicDegree, setAcademicDegree] = useState("")

    useEffect(() => {
        setIsEducationFilled(education.length > 0 );
    }, [education, setIsEducationFilled]);

    const addEducation = () => {
        if (educationFormData.name.trim() !== '' && educationFormData.number.trim() !== '' && educationFormData.date_of_end.trim() !== '' && educationFormData.degree.trim() !== '' && educationFormData.speciality.trim() !== '') {
            const newEducation: EducationDetail = {
                ...educationFormData
            };
            setEducation(prevEducation => [...prevEducation, newEducation]);
            setEducationFormData({
                id: 0,
                name: '',
                number: '',
                date_of_end: '',
                degree: '',
                speciality: '',
                education_type: '',
                user_id: 0
            });
        }
    };
    const [qualificationCourses, setQualificationCourses] = useState<SkillsUpgrades[]>([]);
    const [qualificationFormData, setQualificationFormData] = useState<SkillsUpgrades>({
        id: 0,
        name: '',
        date_of_end: '',
        speciality: '',
        user_id: 0
    });

    const addQualificationCourse = () => {
        if (qualificationFormData.name.trim() !== ''  && qualificationFormData.date_of_end.trim() !== '' && qualificationFormData.speciality.trim() !== '') {
            setQualificationCourses(prevCourses => [...prevCourses, qualificationFormData]);
            setQualificationFormData({
                id: 0,
                name: '',
                date_of_end: '',
                speciality: '',
                user_id: 0
            });
        }
    };

    const removeQualificationCourse = (index: number) => {
        setQualificationCourses(prevCourses => prevCourses.filter((_, i) => i !== index));
    };

    const addPostGraduateEducation = () => {
        if (postGraduateFormData.name.trim() !== '' && postGraduateFormData.education_type.trim() !== '' && postGraduateFormData.number.trim() !== '' && postGraduateFormData.speciality.trim() !== '') {
            setPostGraduateEducation(prevPostGraduateEducation => [...prevPostGraduateEducation, postGraduateFormData]);
            setPostGraduateFormData({
                id: 0, user_id: 0,
                name: '',
                education_type: '',
                number: '',
                speciality: ''
            });
        }
    };

    const removeEducation = (index: number) => {
        setEducation(prevEducation => prevEducation.filter((_, i) => i !== index));
    };

    const removePostGraduateEducation = (index: number) => {
        setPostGraduateEducation(prevPostGraduateEducation => prevPostGraduateEducation.filter((_, i) => i !== index));
    };
    const check = () =>{
        console.log(EducationResult)
    }
    useEffect(() => {
        setEducationResult({
            academic_degree: academicDegree,
            diplom: diploma,
            academic_tile: academicTitle,
            languages: languages,
            educations: education,
            post_educations: postGraduateEducation,
            skill_upgrades: qualificationCourses,
        });
    }, [academicDegree, diploma, academicTitle, languages, education, postGraduateEducation,qualificationCourses])
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Образование*:</Text>
                    <View style={styles.form}>
                        <TextInput
                            placeholder="Тип образования"
                            value={educationFormData.education_type}
                            onChangeText={text => setEducationFormData(prev => ({ ...prev, education_type: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Наименование"
                            value={educationFormData.name}
                            onChangeText={text => setEducationFormData(prev => ({ ...prev, name: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Диплом (серия, номер)"
                            value={educationFormData.number}
                            onChangeText={text => setEducationFormData(prev => ({ ...prev, number: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Дата окончания"
                            value={educationFormData.date_of_end}
                            onChangeText={text => setEducationFormData(prev => ({ ...prev, date_of_end: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Квалификация"
                            value={educationFormData.degree}
                            onChangeText={text => setEducationFormData(prev => ({ ...prev, degree: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Направление или специальность"
                            value={educationFormData.speciality}
                            onChangeText={text => setEducationFormData(prev => ({ ...prev, speciality: text }))}
                            style={styles.input}
                        />
                        <Button title="Добавить" onPress={addEducation} />
                    </View>
                    <View style={styles.educationList}>
                        <Text style={styles.subSectionTitle}>Список образований:</Text>
                        {education.map((edu, index) => (
                            <View key={index} style={styles.educationItem}>
                                <Text>{edu.name}</Text>
                                <Text>{edu.education_type}</Text>
                                <Text>{edu.speciality}</Text>
                                <Button title="Удалить" onPress={() => removeEducation(index)} />
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Послевузовское образование:</Text>
                    <View style={styles.form}>
                        <TextInput
                            placeholder="Наименование"
                            value={postGraduateFormData.name}
                            onChangeText={text => setPostGraduateFormData(prev => ({ ...prev, name: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Удостоверение, номер, дата выдачи"
                            value={postGraduateFormData.education_type}
                            onChangeText={text => setPostGraduateFormData(prev => ({ ...prev,   education_type: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Год окончания"
                            value={postGraduateFormData.number}
                            onChangeText={text => setPostGraduateFormData(prev => ({ ...prev, number: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Специальность"
                            value={postGraduateFormData.speciality}
                            onChangeText={text => setPostGraduateFormData(prev => ({ ...prev, speciality: text }))}
                            style={styles.input}
                        />
                        <Button title="Добавить" onPress={addPostGraduateEducation} />
                    </View>
                    <View style={styles.educationList}>
                        <Text style={styles.subSectionTitle}>Список послевузовских образований:</Text>
                        {postGraduateEducation.map((edu, index) => (
                            <View key={index} style={styles.educationItem}>
                                <Text>{edu.name}</Text>
                                <Button title="Удалить" onPress={() => removePostGraduateEducation(index)} />
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Дополнительная информация:</Text>
                    <View style={styles.form}>
                        <Text style={styles.label}>Ученая степень</Text>
                        <TextInput
                            placeholder="Ученая степень"
                            value={academicDegree}
                            onChangeText={text => setAcademicDegree(text)}
                            style={styles.input}
                        />
                        <Text style={styles.label}>Диплом</Text>
                        <TextInput
                            placeholder="Диплом"
                            value={diploma}
                            onChangeText={text => setDiploma(text)}
                            style={styles.input}
                        />
                        <Text style={styles.label}>Ученое звание</Text>
                        <TextInput
                            placeholder="Ученое звание"
                            value={academicTitle}
                            onChangeText={text => setAcademicTitle(text)}
                            style={styles.input}
                        />
                        <Text style={styles.label}>Знание языков</Text>
                        <TextInput
                            placeholder="Знание языков"
                            value={languages}
                            onChangeText={text => setLanguages(text)}
                            style={styles.input}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Повышение квалификации и переподготовка:</Text>
                    <View style={styles.form}>
                        <TextInput
                            placeholder="Наименование"
                            value={qualificationFormData.name}
                            onChangeText={text => setQualificationFormData(prev => ({ ...prev, name: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            //placeholder="Диплом (номер, дата выдачи)"
                            //value={qualificationFormData.name}
                            //onChangeText={text => setQualificationFormData(prev => ({ ...prev, diploma: text }))}
                            //style={styles.input}
                        />
                        <TextInput
                            placeholder="Год окончания"
                            value={qualificationFormData.date_of_end}
                            onChangeText={text => setQualificationFormData(prev => ({ ...prev, date_of_end: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Специальность и направление"
                            value={qualificationFormData.speciality}
                            onChangeText={text => setQualificationFormData(prev => ({ ...prev, speciality: text }))}
                            style={styles.input}
                        />
                        <Button title="Добавить" onPress={addQualificationCourse} />
                    </View>
                    <View style={styles.educationList}>
                        <Text style={styles.subSectionTitle}>Список курсов:</Text>
                        {qualificationCourses.map((course, index) => (
                            <View key={index} style={styles.educationItem}>
                                <Text>{course.name}</Text>
                                <Text>{course.speciality}</Text>
                                <Button title="Удалить" onPress={() => removeQualificationCourse(index)} />
                            </View>
                        ))}
                    </View>
                
                <Button title="asd" onPress={() => check()} />
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
    section: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    form: {
        marginBottom: 20,
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
    subSectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    educationList: {
        marginTop: 10,
        width: '100%',
    },
    educationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        width: '100%',
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    label: {
        marginBottom: 5,
    },
    additionalInfo: {
        width: '100%',
        marginBottom: 20,
    },
    additionalInfoInput: {
        borderBottomWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%',
    },
});

export default Education;