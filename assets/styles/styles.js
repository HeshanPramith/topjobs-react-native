import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#580000",
    alignItems: "center",
    justifyContent: "center",
  },
  spcon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 50,
    color: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
  },
  text2: {
    fontSize: 17,
    color: "#FFFFFF",
    justifyContent: "center",
    marginBottom: 50,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
    textAlign: "center",
  },
  logintext: {
    fontSize: 70,
    color: "#8b0000",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
  },
  logintext2: {
    fontSize: 19,
    color: "#8b0000",
    justifyContent: "center",
    marginBottom: 50,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
  },
  logintext3: {
    fontFamily: "Roboto",
    fontSize: 26,
    color: "#8b0000",
    justifyContent: "center",
    marginBottom: 50,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    fontWeight: "200",
  },
  text3: {
    fontSize: 17,
    color: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  jcbutton: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    marginBottom: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },

  iconcolorred: {
    color: "#8b0000",
  },
  iconButton: {
    height: 40,
    textAlign: "center",
    backgroundColor: "#8b0000",
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  lgiconButtonbg: {
    textAlign: "center",
    backgroundColor: "#8b0000",
    borderRadius: 30,
    paddingHorizontal: 20,
    color: "#000000",
    elevation: 5,
    shadowColor: "#8b0000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  jciconButtonbg: {
    textAlign: "center",
    backgroundColor: "#ffcc33",
    borderRadius: 30,
    paddingHorizontal: 20,
    color: "#000000",
    elevation: 5,
    shadowColor: "#ffcc33",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  jcbuttonText: {
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    backgroundColor: "#FFF",
  },
  ortext: {
    width: "100%",
    height: 30,
    verticalAlign: "middle",
    color: "black",
    fontWeight: "bold",
  },
  rssItemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containeritemscreen: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  skeletonItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  mainscontainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  mainscontainerfav: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
    paddingTop: 5
  },
  buttonContainer: {
    marginVertical: 10,
  },
  scrollView: {
    paddingHorizontal: 15,
    flex: 1,
    width: "100%",
  },
  rssLinkButton: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#ececec6c",
    borderRadius: 5,

    flexDirection: 'row',
    alignItems: 'center',
    alignContent: "center",
    justifyContent: 'flex-start',
    overflow: "hidden"
  },
  rssLinkButtonCount:{
    position: "absolute",
    right: 20,
    top: 14,
    fontWeight: "bold",
    color: '#000000'
  },
  bottomNavigator: {
    backgroundColor: "#8b0000",
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '95%',
    justifyContent: "space-around",
    alignContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 30,
    marginHorizontal: 10
  },
  bottomNavBtn: {
    marginHorizontal: 0,
    width: 120
  },
  bottomButtonText: {
    fontSize: 12
  },
  bottomButtonTextAct: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: "bold"
  },
  bottomButtonTextInAct: {
    fontSize: 12,
    color: '#ffffffc4',
  },
  bottomButtonTextSpla: {
    fontSize: 12,
    color: '#ffffffc4',
    fontWeight: "bold",
  },
  rssItemContainerDetail: {
    padding: 0,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#ececec6c",
    justifyContent: 'center',
    alignContent: 'center',
    overflow: 'hidden',
  },
  rssItemTextContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  rssLinkButtonDetail: {
    padding: 10,
    backgroundColor: "#580000",
    borderRadius: 5,
    color: '#FFFFFF',
  },
  white: {
    color: '#FFFFFF',
  },
  favoriteItem: {
    // Remove backgroundColor from here
  },
  gradientContainer: {
    flex: 1,
    padding: 0
  },
  favico: {
    //marginTop: 6
  },
  searchContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    marginBottom: 10,
    paddingHorizontal: 15,
    //flex: 1,
    flexDirection: "row"
  },
  searchInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffcc33',
    borderColor: "#ccc",
    borderWidth: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 16,
    color: '#000',
    position: "relative",
    zIndex: 1,
  },
  searchIconContainer: {
    width: '10%',
    height: 50,
    backgroundColor: '#ffcc3300',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    color: '#FFF',
    position: "absolute",
    right: 15,
    zIndex: 2,
    pointerEvents: "none"
  },
  rssLeftConImg: {
    width: '20%',
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: '#FFF',
    borderRadius: 5
  },
  rssLeftCon: {
    width: '67%'
  },
  rssRightCon: {
    width: '13%',
    height: 'auto',
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  placeholderContainer: {
    flex: 1,
    height: 500,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  placeholderText: {
    fontSize: 16,
    color: '#000',
    marginTop: 30
  },
  jobtotal: {
    padding: 15,
    fontSize: 14
  },  
  topbar: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  }, 
  rstxtttl: {
    color: '#000000',
    fontWeight: "500"
  }, 
  rstxt: {
    fontSize: 12,
    color: '#717171'
  },
  rstxtloca: {
    fontSize: 12,
    color: '#0164c2'
  },
  rstxtexp: {
    fontSize: 12,
    color: '#d30909'
  },
  favoriteItemContainer: {
    width: '100%',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#e40f0f',
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    borderRadius: 10,
    height: 80,
    marginTop: 22,
    paddingHorizontal: 15
  },
  saveButton: {
    backgroundColor: '#03a333',
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    borderRadius: 10,
    height: 80,
    marginTop: 22,
    paddingHorizontal: 15
  },
  favTexter: {
    color: '#FFFFFF',
  },
  redCircleIndicator: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#ffb700',
    marginRight: 10, // Adjust the spacing as needed
  },
  greenCircleIndicator: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#02c402',
    marginRight: 10, // Adjust the spacing as needed
  },
  cirIndi: {
    position: "absolute",
    top: 15,
    right: -25,
    zIndex: -1
  },
  rssLinkButtonICon: {
    width: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginRight: 10
  },
});

export default styles;
