import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, Text, ScrollView} from 'react-native';

const Education: React.FC<{ setIsEducationFilled: (isFilled: boolean) => void }> = ({ setIsEducationFilled }) => {
    const [education, setEducation] = useState<{ name: string, diploma: string, graduationDate: string, qualification: string, specialization: string }[]>([]);
    const [postGraduateEducation, setPostGraduateEducation] = useState<{ name: string, certificate: string, graduationYear: string, specialization: string }[]>([]);
    const [educationFormData, setEducationFormData] = useState<{ name: string, diploma: string, graduationDate: string, qualification: string, specialization: string }>({
        name: '',
        diploma: '',
        graduationDate: '',
        qualification: '',
        specialization: ''
    });
    const [postGraduateFormData, setPostGraduateFormData] = useState<{ name: string, certificate: string, graduationYear: string, specialization: string }>({
        name: '',
        certificate: '',
        graduationYear: '',
        specialization: ''
    });
    const [diploma, setDiploma] = useState("");
    const [academicTitle, setAcademicTitle] = useState("");
    const [languages, setLanguages] = useState("");
    const [academicDegree, setAcademicDegree] = useState("")

    useEffect(() => {
        setIsEducationFilled(education.length > 0 || postGraduateEducation.length > 0);
    }, [education, postGraduateEducation, setIsEducationFilled]);

    const addEducation = () => {
        if (educationFormData.name.trim() !== '' && educationFormData.diploma.trim() !== '' && educationFormData.graduationDate.trim() !== '' && educationFormData.qualification.trim() !== '' && educationFormData.specialization.trim() !== '') {
            setEducation(prevEducation => [...prevEducation, educationFormData]);
            setEducationFormData({
                name: '',
                diploma: '',
                graduationDate: '',
                qualification: '',
                specialization: ''
            });
        }
    };
    const [qualificationCourses, setQualificationCourses] = useState<{ name: string, diploma: string, graduationDate: string, specialization: string }[]>([]);
    const [qualificationFormData, setQualificationFormData] = useState<{ name: string, diploma: string, graduationDate: string, specialization: string }>({
        name: '',
        diploma: '',
        graduationDate: '',
        specialization: ''
    });

    const addQualificationCourse = () => {
        if (qualificationFormData.name.trim() !== '' && qualificationFormData.diploma.trim() !== '' && qualificationFormData.graduationDate.trim() !== '' && qualificationFormData.specialization.trim() !== '') {
            setQualificationCourses(prevCourses => [...prevCourses, qualificationFormData]);
            setQualificationFormData({
                name: '',
                diploma: '',
                graduationDate: '',
                specialization: ''
            });
        }
    };

    const removeQualificationCourse = (index: number) => {
        setQualificationCourses(prevCourses => prevCourses.filter((_, i) => i !== index));
    };

    const addPostGraduateEducation = () => {
        if (postGraduateFormData.name.trim() !== '' && postGraduateFormData.certificate.trim() !== '' && postGraduateFormData.graduationYear.trim() !== '' && postGraduateFormData.specialization.trim() !== '') {
            setPostGraduateEducation(prevPostGraduateEducation => [...prevPostGraduateEducation, postGraduateFormData]);
            setPostGraduateFormData({
                name: '',
                certificate: '',
                graduationYear: '',
                specialization: ''
            });
        }
    };

    const removeEducation = (index: number) => {
        setEducation(prevEducation => prevEducation.filter((_, i) => i !== index));
    };

    const removePostGraduateEducation = (index: number) => {
        setPostGraduateEducation(prevPostGraduateEducation => prevPostGraduateEducation.filter((_, i) => i !== index));
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Образование:</Text>
                    <View style={styles.form}>
                        <TextInput
                            placeholder="Наименование"
                            value={educationFormData.name}
                            onChangeText={text => setEducationFormData(prev => ({ ...prev, name: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Диплом (серия, номер)"
                            value={educationFormData.diploma}
                            onChangeText={text => setEducationFormData(prev => ({ ...prev, diploma: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Дата окончания"
                            value={educationFormData.graduationDate}
                            onChangeText={text => setEducationFormData(prev => ({ ...prev, graduationDate: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Квалификация"
                            value={educationFormData.qualification}
                            onChangeText={text => setEducationFormData(prev => ({ ...prev, qualification: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Направление или специальность"
                            value={educationFormData.specialization}
                            onChangeText={text => setEducationFormData(prev => ({ ...prev, specialization: text }))}
                            style={styles.input}
                        />
                        <Button title="Добавить" onPress={addEducation} />
                    </View>
                    <View style={styles.educationList}>
                    <Text style={styles.subSectionTitle}>Список образований:</Text>
                    {education.map((edu, index) => (
                        <View key={index} style={styles.educationItem}>
                            <Text>{edu.name}</Text>
                            <Text>{edu.specialization}</Text>
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
                            value={postGraduateFormData.certificate}
                            onChangeText={text => setPostGraduateFormData(prev => ({ ...prev, certificate: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Год окончания"
                            value={postGraduateFormData.graduationYear}
                            onChangeText={text => setPostGraduateFormData(prev => ({ ...prev, graduationYear: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Специальность"
                            value={postGraduateFormData.specialization}
                            onChangeText={text => setPostGraduateFormData(prev => ({ ...prev, specialization: text }))}
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
                            placeholder="Диплом (номер, дата выдачи)"
                            value={qualificationFormData.diploma}
                            onChangeText={text => setQualificationFormData(prev => ({ ...prev, diploma: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Год окончания"
                            value={qualificationFormData.graduationDate}
                            onChangeText={text => setQualificationFormData(prev => ({ ...prev, graduationDate: text }))}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Специальность и направление"
                            value={qualificationFormData.specialization}
                            onChangeText={text => setQualificationFormData(prev => ({ ...prev, specialization: text }))}
                            style={styles.input}
                        />
                        <Button title="Добавить" onPress={addQualificationCourse} />
                    </View>
                    <View style={styles.educationList}>
                        <Text style={styles.subSectionTitle}>Список курсов:</Text>
                        {qualificationCourses.map((course, index) => (
                            <View key={index} style={styles.educationItem}>
                                <Text>{course.name}</Text>
                                <Text>{course.specialization}</Text>
                                <Button title="Удалить" onPress={() => removeQualificationCourse(index)} />
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        borderBottomWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%', 
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