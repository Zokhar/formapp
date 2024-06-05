import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import About from '../screens/About';
import Basic from '../screens/Basic';
import Education from '../screens/Education';
import Family from '../screens/Family';
import Work from '../screens/Work';

const Tab = createMaterialTopTabNavigator();

const Navigation: React.FC = () => {
    
    const [isBasicFilled, setIsBasicFilled] = useState(true);
    const [isEducationFilled, setIsEducationFilled] = useState(true);
    Education
    return (
        <View style={{paddingTop: 30, flex: 1}}>
            <View style={{ flex: 1 }}>
            <Tab.Navigator>
                    <Tab.Screen 
                        name="Basic" 
                        children={() => <Basic setIsBasicFilled={setIsBasicFilled} />}
                        options={{
                            tabBarStyle: { backgroundColor: isBasicFilled ? 'white' : 'red' }
                        }}
                    />
                    <Tab.Screen 
                        name="Education" 
                        children={() => <Education setIsEducationFilled={setIsEducationFilled} />}
                        options={{
                            tabBarStyle: { backgroundColor: isEducationFilled ? 'white' : 'red' }
                        }}
                    />
                    <Tab.Screen name="Work" component={Work} />
                    <Tab.Screen name="Family" component={Family} />
                    <Tab.Screen name="About" component={About} />   
                </Tab.Navigator>
            </View>
        </View>
    );
  };

export default Navigation;