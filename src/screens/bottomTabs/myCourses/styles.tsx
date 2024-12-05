import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{ flex: 1, marginHorizontal: 16 },
    card: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    imgRemove: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    removeBtn: {
      backgroundColor: "#9dcf82",
      justifyContent: 'center',
      marginVertical: 30,
      paddingHorizontal: 10,
      borderRadius: 10,
    },
    txt: {
      fontSize: 14,
      fontWeight: '700',
      color: '#FFFFFF'
    },
    image: {
      height: 100,
      width: width / 2,
      borderRadius: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
    name: {
      fontSize: 14,
      color: 'gray',
      marginVertical: 5,
    },
    colorTxt1: {
      fontWeight: '700',
    }
  });

  export default styles;
  