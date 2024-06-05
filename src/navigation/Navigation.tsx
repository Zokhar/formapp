import 'react-native-gesture-handler';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet } from 'react-native';
import About from '../screens/About';
import Basic from '../screens/Basic';
import Education from '../screens/Education';
import Family from '../screens/Family';
import Work from '../screens/Work';

const Tab = createMaterialTopTabNavigator();

const Navigation: React.FC = () => {
    return (
        <View style={{paddingTop: 30, flex: 1}}>
            <View style={{ flex: 1 }}>
                <Tab.Navigator>
                    <Tab.Screen name="Basic" component={Basic} />
                    <Tab.Screen name="Education" component={Education} />
                    <Tab.Screen name="Work" component={Work} />
                    <Tab.Screen name="Family" component={Family} />
                    <Tab.Screen name="About" component={About} />   
                </Tab.Navigator>
            </View>
        </View>
    );
  };

export default Navigation;