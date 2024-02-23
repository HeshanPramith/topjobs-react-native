import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';
import HTML from 'react-native-render-html2'; // deprecated-react-native-prop-types imported
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const removeHtmlTags = (str) => {
  const decodedStr = decodeURIComponent(str);
  const regex = /\/([^\/]+\.(jpg|jpeg|png|gif))/i; // Match filename with supported image extensions
  const match = decodedStr.match(regex);
  return match ? match[1] : 'Filename not found';
};

const DetailTab = ({ jobData }) => {

  useEffect(() => {
  }, [jobData]); // Dependency array ensures the effect runs when jobData changes


  if (!jobData || !jobData.authors || jobData.authors.length === 0) {
    return null; // If jobData is null or authors array is empty, return null
  }

  const [zoomedImageUri, setZoomedImageUri] = useState(null);

  const handleImagePress = (uri) => {
    setZoomedImageUri(uri);
  };

  const handleCloseZoomedImage = () => {
    setZoomedImageUri(null);
  };

  return (
    <View>
      <ScrollView>
        {jobData.authors.map((authorObject, index) => (
          index === 1 && (
            <HTML
              key={index}
              html={decodeURIComponent(authorObject.name)
                .replace(/\+/g, "&nbsp;")
              }
              tagsStyles={{
                p: { lineHeight: 20, marginBottom: 10, color: '#686868', fontSize: 12, textAlign: 'left' },
                h1: { color: '#000000', fontSize: 16, marginBottom: 5, fontWeight: "500" },
                h2: { color: '#000000', fontSize: 16, marginBottom: 5, fontWeight: "500" },
                h3: { color: '#000000', fontSize: 16, marginBottom: 5, fontWeight: "500" },
                h4: { color: '#000000', fontSize: 16, marginBottom: 5, fontWeight: "500" },
                h5: { color: '#000000', fontSize: 16, marginBottom: 5, fontWeight: "500" },
                h6: { color: '#000000', fontSize: 16, marginBottom: 5, fontWeight: "500" },
                ul: { color: '#999999', fontSize: 12 },
                ol: { color: '#999999', fontSize: 12 },
                li: { color: '#999999', fontSize: 14, },
                strong: { color: '#000000' },
              }}
              classesStyles={{
                'li::before': { color: 'teal' }
              }}
            />
          )
        ))}
        {jobData.authors.map((authorObject, index) => (
          index === 1 && removeHtmlTags(authorObject.name) !== 'Filename not found' && (
            <TouchableOpacity onPress={() => handleImagePress(`http://192.168.8.101/logo/${jobData.id}/${removeHtmlTags(authorObject.name)}`)}>
              <View style={{ borderRadius: 10, overflow: 'hidden' }}>
                <Image
                  source={{ uri: `http://192.168.8.101/logo/${jobData.id}/${removeHtmlTags(authorObject.name)}` }}
                  style={{ width: '100%', height: 500, margin: 0 }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          )
        ))}
      </ScrollView>
      <Modal visible={!!zoomedImageUri} transparent={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(139, 0, 0, 1)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 }}>
          <TouchableOpacity style={{ position: 'absolute', top: 15, right: 20, zIndex: 999 }} onPress={handleCloseZoomedImage}>
            <Text style={{ color: 'white', fontSize: 20 }}><FontAwesome6 name="circle-xmark" size={24}/></Text>
          </TouchableOpacity>
          <Image
            source={{ uri: zoomedImageUri }}
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
};

export default DetailTab;
