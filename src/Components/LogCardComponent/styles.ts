import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  logItem: {
    height: 200,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDFDFD',
    radius: 50,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    borderRadius: 15,
  },
  km: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '600',
    letterSpacing: 2,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  kmView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
    width: '100%',
  },
  mapView: {
    height: '80%',
    width: '100%',
  },
});

export default styles;
