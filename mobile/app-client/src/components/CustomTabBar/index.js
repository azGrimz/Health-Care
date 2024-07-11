
import { View,Text,StyleSheet ,TouchableOpacity,Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';




export default function CustomTabBar({state,descriptors,navigation}){
    return(
        <View style={styles.container}> 
            <View style={styles.content}> 
                {state.routes.map((route,index) => {
                    const {options} = descriptors[route.key];

                    const isFocused = state.index ===index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type:'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if(!isFocused && !event.defaultPrevented){
                            navigation.navigate({name: route.name,merge:true});
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tablePress',
                            target: route.key,
                        });
                    };
                    
                    return(
                        <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.buttonTab}
                        >
                            <View style={{alignItems: 'center', padding:4,}}> 
                                <View style={[styles.innerButton, {backgroundColor: isFocused ? "rgba(200, 222, 247, 0.8)" : "transparent"} ]}>
                                <Ionicons
                                 name={options.tabBarIcon}
                                 size={34} 
                                 color={isFocused ? "rgba(0, 112, 239, 0.8)" : "#535353"}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems:'center',
    },
    content:{
        borderRadius: 99,
        flexDirection: 'row',
        marginBottom: Platform.OS === 'ios' ? 38 : 24,
        alignItems:'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: "rgba(255,255,255, 0.9)",
        gap:25,
        elevation:10,
        shadowColor: '#000',
        shawdowOffset: {
            width: 0,
            heigth: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.80
    },
    buttonTab:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerButton: {
        padding: 8,
        borderRadius: 99}

})