import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import About from '../screens/About';
import Basic from '../screens/Basic';
import Education from '../screens/Education';
import Family from '../screens/Family';
import Work from '../screens/Work';
import { AppProvider } from '../context/AppContext';

const Tab = createMaterialTopTabNavigator();

const Navigation: React.FC = () => {
    
    const [isBasicFilled, setIsBasicFilled] = useState(true);
    const [isEducationFilled, setIsEducationFilled] = useState(true);
    const [isFamilyFilled, setIsFamilyFilled] = useState(true);
    const [isWorkFilled, setIsWorkFilled] = useState(true);
    const [isAboutFilled, setIsAboutFilled] = useState(true);
    Education
    return (
        <AppProvider>
            <View style={{paddingTop: 30, flex: 1}}>
                <View style={{ flex: 1 }}>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIndicatorStyle: {
                            backgroundColor: 
                                (route.name === 'Basic*' && !isBasicFilled) || 
                                (route.name === 'Education' && !isEducationFilled) ||
                                (route.name === 'Work' && !isWorkFilled) ||
                                (route.name === 'Family' && !isFamilyFilled) ||
                                (route.name === 'About' && !isAboutFilled)
                                ? 'red' 
                                : 'blue',
                        },
                        tabBarActiveTintColor: 'black',

                    })}
                >
                        <Tab.Screen 
                            name="Basic*" 
                            children={() => <Basic setIsBasicFilled={setIsBasicFilled} />}
                            options={{tabBarLabelStyle: {color: isBasicFilled ? 'grey' : 'red'}}}                      
                        />
                        <Tab.Screen 
                            name="Education" 
                            children={() => <Education setIsEducationFilled={setIsEducationFilled} />}
                            options={{tabBarLabelStyle: {color: isEducationFilled ? 'grey' : 'red'}}}  
                        />
                        <Tab.Screen 
                            name="Work" 
                            children={() => <Work setIsWorkFilled={setIsWorkFilled} />}
                            options={{tabBarLabelStyle: {color: isWorkFilled ? 'grey' : 'red'}}} />
                        <Tab.Screen 
                            name="Family" 
                            children={() => <Family setIsFamilyFilled={setIsFamilyFilled} />}
                            options={{tabBarLabelStyle: {color: isFamilyFilled ? 'grey' : 'red'}}}
                        />
                        <Tab.Screen 
                            name="About" 
                            children={() => <About setIsAboutFilled={setIsAboutFilled} />}
                            options={{tabBarLabelStyle: {color: isAboutFilled ? 'grey' : 'red'}}} 
                        />   
                    </Tab.Navigator>
                </View>
            </View>
        </AppProvider>
    );
  };

export default Navigation;