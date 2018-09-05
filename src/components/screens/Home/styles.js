import { StyleSheet, Image } from 'react-native';


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
    hello:{
        color:'#353535',
        marginBottom:50,
        fontSize:26,
        textAlign:'center',
        marginTop:-85,
        fontWeight:'bold',
    },
    textContent:{
        color:'#353535',
        marginBottom:10,
        fontSize:16,
    },
    infoContainer:{
        marginTop:-25
    },
    buttonContainer:{
        alignItems:'center',
        marginTop:20,
        marginBottom:0,
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
    birds:{
        width: '100%',
        height: '120%',
        marginBottom:15,
        resizeMode: Image.resizeMode.cover,
        alignSelf:'center',
    },
    imgContainer:{
        width:'100%',
        maxHeight:150,
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:0,
        marginTop:-95,
        opacity:0.06
    },
    mapContainer: {
        height: 220,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 3,
        borderColor:'#027691',
        borderRadius:5,
        marginTop:-20
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    captureText: {
        position:'relative',
        width:200,
        top:28,
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