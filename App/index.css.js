import { StyleSheet, Platform, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07121b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 45,
    color: '#39ff14',
  },
  textReset: {
    fontSize: 45,
    color: 'tomato',
  },
  timer: {
    marginBottom: 20,
    color: 'white',
    fontSize: 80,
    fontWeight: '500',
  },
  textContainer: {
    backgroundColor: '#07121b',
    borderRadius: dimensions.width / 2,
    width: dimensions.width / 2,
    height: dimensions.width / 2,
    borderWidth: 10,
    borderColor: '#39ff14',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainerReset: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'tomato',
    backgroundColor: '#07121b',
    borderRadius: dimensions.width / 2,
    width: dimensions.width / 2,
    height: dimensions.width / 2,
    borderWidth: 10,
  },
  picker: {
    width: 50,
    ...Platform.select({
      android: {
        color: '#fff',
        backgroundColor: '#07121B',
        marginLeft: 10,
      },
    }),
  },
  pickerItem: {
    color: 'white',
    fontSize: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
