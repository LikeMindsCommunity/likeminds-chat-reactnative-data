import DeviceInfo from 'react-native-device-info';
import { Dimensions } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const getDeviceDetails = async () => {
    const os = DeviceInfo.getSystemName();
    const versionOS = DeviceInfo.getSystemVersion();
    const deviceName = await DeviceInfo.getDeviceName(); // Async function
    const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
    const netInfo = await NetInfo.fetch();
    const wifi = netInfo.type === 'wifi';

    console.log("returning", {
        os,
        versionOS,
        deviceName,
        screenHeight,
        screenWidth,
        wifi,
    })

    return {
        os,
        versionOS,
        deviceName,
        screenHeight,
        screenWidth,
        wifi,
    };
};

export default getDeviceDetails;