import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Home } from "../../screens/bottomTabs/home";
import { Search } from "../../screens/bottomTabs/search";
import { Profile } from "../../screens/bottomTabs/profile";
import { Courses } from "../../screens/bottomTabs/courses";
import { Image } from "react-native";
import { icon } from "../../assets/icons";


const Tabs=createBottomTabNavigator();
export function BottomTab(){
    return(
        <Tabs.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconI;
                if (route.name === 'Home') {
                    iconI = icon.home
                }
                if (route.name === 'Search') {
                    iconI = icon.search
                }
                if (route.name === 'Courses') {
                    iconI = icon.courses
                }
                if (route.name === 'Profile') {
                    iconI = icon.profile
                }
                return <Image
                    source={iconI}
                    style={{ width: 20, height: 20,tintColor:focused ? color:'black'}}
                />
            }

        }
        )}
        >
            <Tabs.Screen
                component={Home}
                name="Home"
                options={{ headerShown: false }}
            />
            <Tabs.Screen
                component={Search}
                name="Search"
                options={{ headerShown: false }}
            />
            <Tabs.Screen
                component={Courses}
                name="Courses"
                options={{ headerShown: false }}
            />
            <Tabs.Screen
                component={Profile}
                name="Profile"
                options={{ headerShown: false }}
            />
        </Tabs.Navigator>
    )
}