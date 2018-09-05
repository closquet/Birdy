import {StyleSheet, Image} from 'react-native';


export default StyleSheet.create({
    container:{
        flexGrow:1,
        maxHeight:'100%'
    },
    content:{
        paddingHorizontal:10,
        paddingVertical:40
    },
    footerContainer:{
        flexGrow:1,
        maxHeight:'100%',
        alignContent:'flex-end',
        justifyContent:'flex-end',
    },
    item:{
        color:'#353535',
        marginBottom:10,
        fontSize:18
    },
    buttonContainer:{
        alignItems:'center',
        marginTop:40,
        marginBottom:20,
    },
    button:{
        width:200,
        borderColor:'#027691',
        borderWidth:2,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25,
    },
    buttonText:{
        fontWeight:'bold',
        fontSize:18,
        color:'#027691',
    },
    spinnerContainer:{
        alignItems:'center',
        marginTop:140,
    },
    avatar:{
        width: '100%',
        height: '100%',
        marginBottom:15,
        resizeMode: Image.resizeMode.contain,
        marginLeft:'auto',
        marginRight:'auto',
    },
    imgContainer:{
        width:'80%',
        maxHeight:200,
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:15
    },
    mapContainer: {
        height: 220,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 3,
        borderColor:'#027691',
        borderRadius:5,
        marginBottom:20,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    captureText: {
        position:'absolute',
        width:200,
        top:7,
        left:8,
        zIndex:1,
        fontSize:18,
        fontWeight:'bold',
        backgroundColor:'rgba(204,255,250,0.7)',
        paddingHorizontal:5,
        paddingVertical:3,
        borderRadius:8
    },
});