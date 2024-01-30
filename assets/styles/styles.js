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
    fontFamily: "verdana",
    color: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
  },
  text2: {
    fontSize: 17,
    fontFamily: "verdananormal",
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
    fontFamily: "verdana",
    color: "#8b0000",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
  },
  logintext2: {
    fontSize: 19,
    fontFamily: "verdananormal",
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
    fontFamily: "verdananormal",
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
    height: 40, // Set the desired height for the buttons
    //width: 200, // Set the desired width for the buttons
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
    elevation: 5, // For Android elevation (shadow)
    shadowColor: "#8b0000", // For iOS shadow color (same as button background color)
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
    elevation: 5, // For Android elevation (shadow)
    shadowColor: "#ffcc33", // For iOS shadow color (same as button background color)
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
    resizeMode: "cover", // or 'stretch' or 'contain'
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
    overflow: 'hidden', // Ensure that the gradient is clipped within the border radius
  },

  mainscontainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 55,
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
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  bottomNavigator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    justifyContent: "space-evenly",
    alignContent: "space-evenly",
    alignItems: "center",
  },
  bottomNavBtn: {
    marginHorizontal: 10,
  }
});

export default styles;
