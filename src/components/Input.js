import {TextInput, useWindowDimensions} from 'react-native';

export default function Input(props) {
  const {width, height} = useWindowDimensions();
  return (
    <TextInput
      style={{
        width: width * 0.8,
        margin: 10,
        paddingLeft: 15,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: 'white',
      }}
      {...props}
    />
  );
}
