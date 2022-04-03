import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  lineStyle: {
    width: '40%',
    backgroundColor: '#E0E0E0',
    height: '10%',
  },
  mainContainer: {
    width: '100%',
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: '20%',
    height: '33%',
    marginVertical: 10,
    lineHeight: 30,
    backgroundColor: '#E0E0E0',
    position: 'relative',
  },
});

export default styles;
