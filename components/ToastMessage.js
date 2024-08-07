import Toast from 'react-native-root-toast';

export const showToastMessage = (message) => {
    Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        opacity: 0.5
    });
};