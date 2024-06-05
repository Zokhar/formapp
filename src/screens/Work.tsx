import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const Work: React.FC = () => {
    
    return (
        <View style={styles.container}>
            <Text>Work</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Work;