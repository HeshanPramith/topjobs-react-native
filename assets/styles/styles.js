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
    justifyContent: "center",
    backgroundColor: "#ffffff",
    textAlign: "center",   
    padding: 5,
    borderRadius: 15,
    overflow: "hidden",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  spconWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderCurve: "circular",
    borderRadius: 15,
    backgroundColor: '#000000'
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
    fontSize: 40,
    color: "#c00000",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    textAlign: "left",
    letterSpacing: -2,
    paddingLeft: 10,
    marginTop: 20
  },
  logintextSub: {
    fontSize: 14,
    color: "#7c7c7c",
    paddingLeft: 10,
    marginVertical: 20,
    lineHeight: 20
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
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  buttonText2: {
    color: "#030303",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  buttonText2Deac: {
    color: "#000000",
    fontSize: 14,
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
  lgiconButtonbgLog: {
    textAlign: "center",
    backgroundColor: "#009b2e",
    borderRadius: 5,
    color: "#ffffff",
    padding: 10,
    paddingHorizontal: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  jciconButtonbg: {
    textAlign: "center",
    backgroundColor: "#cf0000",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#000000",
    padding: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  jcbuttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
  backgroundImage: {
    //flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    backgroundColor: "#FFF",
    alignSelf: "flex-end",
  },
  ortext: {
    height: 30,
    verticalAlign: "middle",
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
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
  mainsContainerDetail: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
    paddingBottom: 80,
    paddingHorizontal: 15,
    height: '100%'
  },
  buttonContainer: {
    width: '100%',
    marginTop: 5,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commContainer: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scrollView: {
    paddingHorizontal: 15,
    flex: 1,
    width: "100%",
  },
  scrollViewMain: {
    paddingHorizontal: 15,
    //flex: 1,
    width: "100%",
    height: 'auto',
    marginBottom: 70,
    paddingBottom: 120,
  },
  scrollViewMainRef: {
    paddingHorizontal: 15,
    flex: 1,
    width: "100%",
    marginBottom: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  rssLinkButton: {
    marginTop: 10,
    padding: 15,
    paddingLeft: 10,
    backgroundColor: "#ececec6c",
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: "center",
    justifyContent: 'flex-start',
  },
  rssLinkButtonCount: {
    position: "absolute",
    right: 10,
    top: 14,
    fontWeight: "bold",
    color: '#000000'
  },
  buttonContainerBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 0,
    zIndex: 100
  },
  bottomNavigator: {
    backgroundColor: "#8b0000",    
    width: '100%',
    justifyContent: "space-around",
    alignContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 0,
    marginHorizontal: 0,
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
    fontWeight: "normal",
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
    padding: 10,
    paddingRight: 0,
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
    padding: 0,
    borderColor: "#e2e2e2",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF'
  },
  favico: {
    //marginTop: 6
  },
  searchContainer: {
    width: '80%',
    height: 45,
    backgroundColor: '#F6F7F9',
    flex: 1,
    flexDirection: "row"
  },
  searchInput: {
    width: '100%',
    height: 45,
    backgroundColor: '#f0be28',
    borderColor: "#f0be28",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 16,
    color: '#000',
    position: "relative",
    zIndex: 1,
  },
  searchIconContainer: {
    width: '12%',
    height: 45,
    backgroundColor: '#ffcc3300',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    color: '#FFF',
    position: "absolute",
    right: 5,
    zIndex: 2,
    pointerEvents: "none"
  },
  rssLeftConImg: {
    width: '20%',
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: '#f0f0f03d',
    borderColor: "#e2e2e2",
    borderWidth: 1,
    borderRadius: 5,
  },
  rssLeftConImgPopup: {
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  rssLeftCon: {
    width: '65%',
    paddingRight: 15
  },
  rssRightCon: {
    width: '15%',
    height: 'auto',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: 'center',
  },
  rssRightConIconButton: {
    justifyContent: 'center',
    alignItems: 'center',
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
  jobTotalFil: {
    fontSize: 14,
    color: '#9e9e9e',
  },
  topbar: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  topBarSearch: {
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 5,
    height: 30,
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
    color: '#d30909',
    fontWeight: '500',
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
    borderRadius: 5,
    height: 89,
    marginTop: 6,
    paddingHorizontal: 15,
    marginLeft: 15
  },
  saveButton: {
    backgroundColor: '#03a333',
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    borderRadius: 5,
    height: 89,
    marginTop: 6,
    paddingHorizontal: 15,
    marginLeft: 15
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
    width: 23,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  indica: {
    width: 200,
    height: 200
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "80%",
    height: "auto",
    maxHeight: "80%",
    overflow: "hidden",
    elevation: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 50,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "500",
    padding: 15,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f185",
    width: "100%",
    alignItems: "flex-start",
  },
  modalOptionText: {
    fontSize: 14,
  },
  modalContentData: {
    padding: 15
  },
  modalContentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    marginBottom: 0,
    paddingTop: 15,
    zIndex: 100,
    backgroundColor: '#FFFFFF',
    elevation: 55,
  },
  closeQuickViewButton: {
    backgroundColor: '#e9e9e92c',
    padding: 10,
    paddingVertical: 10,
    borderRadius: 30,
    width: '18%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#e2e2e2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  closeQuickViewButtonText: {
    color: '#292929',
  },
  closeQuickViewButtonIcon: {
    color: '#292929',
    fontSize: 16,
  },
  openVacancyButton: {
    backgroundColor: '#00cf00',
    padding: 10,
    borderRadius: 30,
    width: '40%',
    alignItems: 'center',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5
  },
  openVacancyButtonText: {
    color: 'white',
    fontWeight: "500",
  },
  openVacancyButtonIcon: {
    color: 'white',
    fontSize: 16,
    marginRight: 10
  },
  shareVacancyButton: {
    backgroundColor: '#ffffffff',
    borderWidth: 1,
    borderColor: "#e2e2e2",
    padding: 10,
    borderRadius: 30,
    width: '18%',
    alignItems: 'center',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5
  },
  shareVacancyButtonIcon: {
    color: '#000000',
    fontSize: 20,
  },
  togVacancyButtonIn: {
    backgroundColor: '#ffffffff',
    borderWidth: 1,
    borderColor: "#e2e2e2",
    padding: 10,
    borderRadius: 30,
    width: '18%',
    alignItems: 'center',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5
  },
  togVacancyButton: {
    backgroundColor: '#25c92527',
    borderWidth: 1,
    borderColor: "#25c925",
    padding: 10,
    borderRadius: 30,
    width: '18%',
    alignItems: 'center',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5
  },
  togVacancyButtonIconIn: {
    color: '#000000',
    fontSize: 20,
  },
  togVacancyButtonIcon: {
    color: '#25c925',
    fontSize: 20,
  },
  selectedLocationOption: {
    //backgroundColor: '#ECECEC',
  },
  modalOptionItm: {
    flex: 1,
    textAlign: "left",
    color: "#8d8d8d",
    fontSize: 14,
  },
  modalOptionItmCheck: {
    fontWeight: "500",
    color: "#25c925",
    fontSize: 18,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  jobTotalResult: {
    fontSize: 10,
    color: "#575757",
    fontWeight: '500'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 15,
  },
  filterButton: {
    width: 50,
    backgroundColor: '#f0be28',
    height: 45,
    borderColor: "#f0be28",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },
  locatioIcon: {
    fontSize: 18,
    color: "#000000"
  },
  modalTitleSub: {
    color: '#a70000',
    fontWeight: '500'
  },
  map: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    overflow: "hidden",
  },
  mapContainer: {
    width: '100%',
    height: 250,
    //flex: 1,
    marginTop: 15,
    borderRadius: 10, // Adjust the border radius as needed
    backgroundColor: "#f8f8f894", // Adjust the background color as needed
    overflow: "hidden", // This ensures the border radius is applied correctly
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  jobDetailVIewWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  jobDetailVIew: {
    flex: 1,
    backgroundColor: '#8b0000', //F8FAFD
    padding: 0,
    paddingHorizontal: 0
  },
  jobDataTopBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingTop: 0
  },
  jobDataBottomBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  jobDetailViewLogoCom: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5, // Adjust the opacity for your desired glow effect
    shadowRadius: 5, // Adjust the radius for your desired spread
    elevation: 5, // This is required for Android to display the shadow
  },
  jobDetailViewTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: '#ffffff',
    textAlign: "center",
    marginTop: 5
  },
  jobDetailViewLoc: {
    fontSize: 14,
    fontWeight: "400",
    color: '#ffffffcc',
    textAlign: "center",
  },
  jobDetailViewTag: {
    fontSize: 10,
    fontWeight: "500",
    color: '#ffffffff',
    textAlign: "center",
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: '#ffffff27',
    borderRadius: 5,
    padding: 8,
    paddingVertical: 5,
    marginHorizontal: 5
  },
  jobDetailViewTagCal: {
    fontSize: 10,
    fontWeight: "500",
    color: '#ffffffff',
    textAlign: "center",
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: '#ffffff27',
    borderRadius: 5,
    padding: 8,
    paddingVertical: 5,
    marginHorizontal: 5
  },
  jobDetailViewTagIco: {
    color: '#ffffffff',
    fontSize: 10,
  },
  mapNote: {
    marginTop: 10
  },
  showGoogleMapsButton: {
    alignItems: 'center',
    //backgroundColor: '#d1d1d1',
    padding: 10,
    paddingLeft: 0,
    borderRadius: 5,
    width: 'auto',
    alignItems: 'center',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    color: '#000000',
    paddingBottom: 0,
  },
  scrollViewContent: {
    paddingTop: 0
  },
  openGoogleMapsButtonText: {
    color: '#000000',
  },
  mapIconView: {
    color: '#000000',
    fontSize: 16,
    marginRight: 5
  },
  mapIconViewLoc: {
    color: '#028dff',
    fontSize: 16,
    marginRight: -5,
    marginTop: -10
  },
  mapComLocate: {
    color: '#000000',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
  },
  mapComLocateWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgArtWork: {
    flex: 1,
    flexBasis: '',
    flexWrap: "wrap",
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: "flex-start",
    alignContent: "flex-start",
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5, // Adjust the opacity for your desired glow effect
    shadowRadius: 5, // Adjust the radius for your desired spread
    elevation: 5, // This is required for Android to display the shadow
  },
  closeButtonTown: {
    position: 'absolute',
    top: 14,
    right: 10,
  },
  townWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f185",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  gradWrapper: {
    zIndex: 1000,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    bottom: 72,
    position: "absolute",
    width: '100%',
    pointerEvents: "none",
  },
  rssLinkButtonCountIncre: {
    position: "absolute",
    right: 20,
    top: -5,
    fontWeight: "400",
    color: '#ffffff',
    backgroundColor: '#08b32d',
    borderRadius: 3,
    padding: 5,
    paddingVertical: 3,
    fontSize: 10,
    lineHeight: 12,
    zIndex: 100
  },
  hotJobsWraper: {
    width: '100%',
    //paddingHorizontal: 15,
    position: "relative",
    top: 10,
    height: 197,
    borderRadius: 10,
  },
  borderRadiusMedium: {
    borderRadius: 10
  },
  hotJobs: {
    width: '100%',
    height: 190,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  hotJobsHider: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 80,
    height: 183,
    pointerEvents: "none",
  },
  eachJob: {
    width: 260,
    backgroundColor: '#d4d4d4',
    marginLeft: 15,
    padding: 15,
    borderRadius: 10,
    borderCurve: "circular",
  },
  mainsContainerHotjob: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  comTitles: {
    fontWeight: "500",
    fontSize: 16
  },
  imgEach: {
    width: '60%',
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    padding: 10,
    backgroundColor: '#ffffffff',
    borderRadius: 5,
    marginBottom: 10
  },
  eachTgTitle: {
    color: '#FFFFFF',
    fontWeight: "500",
    fontSize: 18
  },
  eachTgSub: {
    color: '#ffffff98',
    fontWeight: "400",
    fontSize: 12
  },
  dateTags: {
    width: 'auto',
    textAlign: "center",
    backgroundColor: '#ffffffff',
    height: 56,
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bigDateText: {
    width: '100%',
    textAlign: "center",
    //color: '#FFFFFF',
    fontWeight: "500",
    fontSize: 16
  },
  smallDateText: {
    width: '100%',
    textAlign: "center",
    //color: '#FFFFFF',
    fontSize: 12
  },
  jobDetailViewTagHot: {
    alignSelf: 'flex-start',
    textAlign: "center",
    marginTop: 5,
    backgroundColor: '#ffffff27',
    borderRadius: 5,
    padding: 8,
    paddingVertical: 5,
    marginRight: 5,
  },
  jobDetailViewTagHotText: {
    width: 'auto',
    fontSize: 10,
    fontWeight: "500",
    color: '#FFFFFF',
  },
  spashTxtWrapper: {
    position: "relative",
    width: '100%',
    backgroundColor: '#00000000',
    borderRadius: 0,
    bottom: 0
  },
  sliderText: {
    fontSize: 30,
    fontWeight: "800",
    color: '#ffffff',
    position: "absolute",
    bottom: 100,
    zIndex: 100,
    width: '100%',
    textAlign: "center",
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // or use 'space-around' based on your design preference
  },
  refIcon: {
    marginRight: 8,
    color: '#020202',
    fontSize: 14
  },
  refIconDeac: {
    marginRight: 8,
    color: '#000000',
    fontSize: 14
  },
  lgiconButtonbg: {
    textAlign: "center",
    backgroundColor: "#f0be28",
    borderRadius: 30,
    color: "#ffffff",
    padding: 10,
    paddingVertical: 8,
    margin: 5,
    borderRadius: 5,
    marginRight: 0,
  },
  lgiconButtonbgDeact: {
    textAlign: "center",
    backgroundColor: "#cacaca",
    borderRadius: 30,
    color: "#ffffff",
    padding: 10,
    paddingVertical: 8,
    margin: 5,
    borderRadius: 5,
    marginRight: 0,
  },
  rssLinkButtonTxt: {
    fontSize: 14
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 'auto',
    paddingBottom: 120,
  },
  gridItem: {
    width: '48%',
    minWidth: 150,
    marginTop: 15,
    borderRadius: 5,
    padding: 10,
    paddingVertical: 15,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ffffff',
    borderColor: "#e2e2e2",
    borderWidth: 1,
  },
  selectedCategory: {
    backgroundColor: '#00b144',
    borderColor: "#00b144",
    borderWidth: 1,
  },
  gridBlockiconStyle: {
    marginBottom: 5
  },
  gridBlockTxt: {
    width: '100%',
    textAlign: "center",
    fontSize: 14,
    verticalAlign: "middle",
    color: '#000000',
    fontWeight: "400",
  },
  gridBlockCount: {
    fontSize: 14,
    color: '#383838',
    opacity: 0.7,
    fontWeight: "400",
  },
  rssLinkButtonCountIncreGrid: {
    position: "absolute",
    right: 20,
    top: -7,
    fontWeight: "400",
    color: '#ffffff',
    backgroundColor: '#08b32d',
    borderRadius: 3,
    padding: 5,
    paddingVertical: 3,
    height: 18,
    fontSize: 10,
    lineHeight: 12,
    zIndex: 100,
    borderWidth: 1,
    borderColor: '#FFFFFF'
  },
  gridBlockTxtAct: {
    color: '#FFFFFF',
    fontWeight: "500",
    opacity: 1
  },
  searchContainerJobc: {
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: '#F6F7F9',
    //flex: 1,
    flexDirection: "row",
    marginTop: 5,
    paddingBottom: 10
  },
  searchInputJobc: {
    width: '100%',
    height: 45,
    backgroundColor: '#ffffff',
    borderColor: "#e2e2e2",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 16,
    color: '#000',
    position: "relative",
    zIndex: 1,
  },
  searchIconContainerJobc: {
    width: '12%',
    height: 45,
    backgroundColor: '#ffcc3300',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    color: '#FFF',
    position: "absolute",
    right: 5,
    zIndex: 2,
    pointerEvents: "none"
  },
  gradWrapperInner: {
    zIndex: 1000,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 100,
    bottom: 57,
    position: "absolute",
    width: '100%',
    pointerEvents: "none",
  },
});

export default styles;
