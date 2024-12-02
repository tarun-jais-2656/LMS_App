import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/splash";
import GetStarted from "../screens/getStarted";
import Tutorial from "../screens/tutorial";
import Login from "../screens/login";
import SignUp from "../screens/signUp";
import Otp from "../screens/otp";
import Forgot from "../screens/forgot";
import { BottomTab } from "./bottomTab";
import CourseDetail from "../screens/courseDetail";
import Player from "../screens/videoPlayer";
import MyCart from "../screens/MyCart/myCart";
import EditProfile from "../screens/editProfile";
import { CoursePlaylist } from "../screens/coursePlaylist";

type RootStackParamList = {
    Splash: undefined;
    GetStarted: undefined;
    Tutorial: undefined;
    Login:undefined
    SignUp:undefined
    Otp:undefined
    Forgot:undefined
    BottomTab:undefined
    CourseDetail:undefined
    Player:undefined
    MyCart:undefined
    EditProfile:undefined
    CoursePlaylist:undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation: React.FC = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GetStarted"
            component={GetStarted}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tutorial"
            component={Tutorial}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Otp"
            component={Otp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Forgot"
            component={Forgot}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourseDetail"
            component={CourseDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Player"
            component={Player}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MyCart"
            component={MyCart}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CoursePlaylist"
            component={CoursePlaylist}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  export default StackNavigation;