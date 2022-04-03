import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  freeDriveBt: {
    borderRadius: 32,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BFDFFF',
  },
  freeDriveView: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    opacity: 0.8,
  },
  freeDriveText: {
    fontSize: 18,
    letterSpacing: 1.5,
    color: '#00628f',
    fontWeight: '600',
  },
  kmText: {
    borderRadius: 25,
    opacity: 0.8,
    fontSize: 18,
    letterSpacing: 1.5,
    color: '#00628f',
    fontWeight: '600',
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#EBF6F3',
  },
  locateMeButton: {
    backgroundColor: 'blue',
    borderRadius: 12,
    padding: 4,
    flexGrow: 1,
    alignSelf: 'center',
  },
  driveTypeView: {
    opacity: 0.8,
    alignSelf: 'center',
  },
  topElementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    width: '100%',
    top: '5%',
    zIndex: 1,
    height: '6%',
  },
});
export default styles;
