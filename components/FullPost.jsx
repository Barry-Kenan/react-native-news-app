import React from "react";
import axios from "axios";
import { View } from "react-native";
import styled from "styled-components/native";
import { Loading } from "./Loading";

const PostImage = styled.Image`
    border-radius: 10px;
    width: 100%;
    height: 250px;
    margin-bottom: 20px;
`;

const PostText = styled.Text`
    font-size: 18px;
    line-height: 24px;
    font-style: italic;
`;

const PostTitle = styled.Text`
    font-size: 22px;
    line-height: 30px;
    padding-bottom: 15px;
    text-align: center;

`;

export const FullPost = ({ route, navigation }) => {
    const [data, setData] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);
    const {id, title} = route.params;

    React.useEffect(() => {
        navigation.setOptions({
            title,
        })

        axios
        .get('https://632974b2d2c97d8c5267b07d.mockapi.io/articles/' + id)
        .then(({data}) => {
            setData(data);
        })
        .catch((err) => {
          console.log(err);
          Alert.alert('Ошибка', 'При получении статьи')
        }).finally(() => {
          setIsLoading(false);
        });
    }, [])

    if(isLoading) {
        return <Loading />
      }    

    return (
        <View style={{padding: 20, alignItems:'center'}}>
        <PostTitle>{data.title}</PostTitle>
        <PostImage source={{uri: data.imageUrl}} />
        <PostText >{data.text}</PostText>
        </View>
    )
}
